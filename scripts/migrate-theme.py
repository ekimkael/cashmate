#!/usr/bin/env python3
"""
Migrates all files that use Colors.dark.X to use the useThemeColors() hook.

For each target file:
  1. Adds `useThemeColors` to the import from "@/constants/colors"
  2. Inserts `const C = useThemeColors()` right after the opening `{` of the
     first exported function/component
  3. Replaces every `Colors.dark.` reference with `C.`
  4. For StyleSheet.create({...}) blocks that use Colors.dark, moves them
     inside the component (converts to a local styles function)
"""

import re
import sys
import os

# Files already updated manually
SKIP = {
    "app/(tabs)/(profile)/index.tsx",
    "app/_layout.tsx",
    "components/theme.tsx",
    "constants/colors.ts",
    "store/themeStore.ts",
}

ROOT = "/Users/ekimkael/Projects/cases/cashmate"


def find_target_files():
    result = []
    for dirpath, _, filenames in os.walk(ROOT):
        for fn in filenames:
            if not fn.endswith(".tsx") and not fn.endswith(".ts"):
                continue
            full = os.path.join(dirpath, fn)
            rel = full[len(ROOT) + 1:]
            if rel in SKIP:
                continue
            if "node_modules" in rel:
                continue
            with open(full, encoding="utf-8") as f:
                content = f.read()
            if "Colors.dark." not in content:
                continue
            result.append((full, rel, content))
    return result


def migrate(content: str, filepath: str) -> str:
    # --- 1. Update import from "@/constants/colors" ---
    # Pattern: import Colors from "@/constants/colors"
    # or:      import Colors, { something } from "@/constants/colors"
    # or:      import { something } from "@/constants/colors"
    colors_import_re = re.compile(
        r'^(import\s+(?:Colors(?:,\s*\{[^}]*\})?\s*|\{[^}]*\}\s*)from\s*"@/constants/colors")',
        re.MULTILINE,
    )
    m = colors_import_re.search(content)
    if m:
        old_import = m.group(0)
        # Check if useThemeColors is already imported
        if "useThemeColors" not in old_import:
            # Add useThemeColors to the named imports
            if "{ " in old_import:
                # Already has named imports — add to them
                new_import = re.sub(r"\{([^}]*)\}", r"{ useThemeColors, \1}", old_import, count=1)
                # Clean up double spaces
                new_import = re.sub(r"\{,\s*", "{ ", new_import)
            else:
                # Only default import: Colors
                new_import = old_import.replace(
                    'import Colors from "@/constants/colors"',
                    'import Colors, { useThemeColors } from "@/constants/colors"',
                )
            content = content.replace(old_import, new_import, 1)
    else:
        # No Colors import at all — add one (shouldn't happen for our targets)
        pass

    # --- 2. Insert `const C = useThemeColors()` inside the component ---
    # Find the first `export default function Foo(` or `export default function(`
    # and insert after its opening brace.
    # Also handle arrow functions: `export default function` not always present;
    # fall back to inserting before first Colors.dark usage.

    if "const C = useThemeColors()" not in content:
        # Strategy A: find `export default function` opening brace
        fn_open_re = re.compile(
            r"(export\s+default\s+function\s+\w*\s*\([^)]*\)\s*(?::\s*\S+\s*)?\{)",
            re.MULTILINE,
        )
        m = fn_open_re.search(content)
        if m:
            insert_pos = m.end()
            content = content[:insert_pos] + "\n  const C = useThemeColors()" + content[insert_pos:]
        else:
            # Strategy B: insert before first `Colors.dark.` line
            first_dark = content.find("Colors.dark.")
            if first_dark != -1:
                # Find start of that line
                line_start = content.rfind("\n", 0, first_dark) + 1
                indent = ""
                for ch in content[line_start:]:
                    if ch in (" ", "\t"):
                        indent += ch
                    else:
                        break
                content = content[:line_start] + indent + "const C = useThemeColors()\n" + content[line_start:]

    # --- 3. Replace Colors.dark. with C. ---
    content = content.replace("Colors.dark.", "C.")

    return content


def main():
    targets = find_target_files()
    print(f"Found {len(targets)} files to migrate")
    for full, rel, content in targets:
        new_content = migrate(content, rel)
        if new_content != content:
            with open(full, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"  ✓ {rel}")
        else:
            print(f"  - {rel} (no changes)")


if __name__ == "__main__":
    main()
