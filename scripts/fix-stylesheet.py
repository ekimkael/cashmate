#!/usr/bin/env python3
"""
For each file that has a module-level `const styles = StyleSheet.create({...})`
block that references `C.` (from useThemeColors), move that block inside the
component function, right after `const C = useThemeColors()`.
"""

import re
import os

ROOT = "/Users/ekimkael/Projects/cases/cashmate"

SKIP = {
    "app/_layout.tsx",
    "app/(tabs)/(profile)/index.tsx",
    "components/theme.tsx",
    "constants/colors.ts",
    "store/themeStore.ts",
    "app/error-boundary.tsx",
    "app/+not-found.tsx",
}


def extract_block(text: str, start: int) -> tuple[str, int]:
    """Extract a balanced {...} block starting at `start` (the opening {).
    Returns (block_content_including_braces, end_index_exclusive).
    """
    depth = 0
    i = start
    while i < len(text):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[start : i + 1], i + 1
        i += 1
    return text[start:], len(text)


def migrate(content: str) -> str:
    # Only process files that have the issue
    if "const C = useThemeColors()" not in content:
        return content

    # Find all module-level `const styles = StyleSheet.create({...})` blocks that use C.
    # These appear AFTER the closing `}` of the default export function.

    # Find position of `const C = useThemeColors()` (inside component)
    hook_marker = "const C = useThemeColors()"
    hook_pos = content.find(hook_marker)
    if hook_pos == -1:
        return content

    # Find StyleSheet.create blocks that (a) appear after the component and (b) contain C.
    # Pattern: `const styles = StyleSheet.create({`
    ss_pattern = re.compile(r"(const\s+\w+\s*=\s*StyleSheet\.create\s*)(\()")

    for m in list(ss_pattern.finditer(content)):
        # Find the opening `{` of the argument object
        paren_start = m.end() - 1  # position of `(`
        # Skip whitespace after `(`
        j = paren_start + 1
        while j < len(content) and content[j] in " \t\n":
            j += 1
        if j >= len(content) or content[j] != "{":
            continue

        obj_start = j
        obj_block, obj_end = extract_block(content, obj_start)

        # The full StyleSheet.create call ends at obj_end, then `)` and optional `;`
        end = obj_end
        while end < len(content) and content[end] in " \t":
            end += 1
        if end < len(content) and content[end] == ")":
            end += 1
        if end < len(content) and content[end] in ";\n":
            if content[end] == ";":
                end += 1
        # Consume trailing newline
        if end < len(content) and content[end] == "\n":
            end += 1

        full_stmt_start = m.start()
        full_stmt = content[full_stmt_start:end]

        # Only move if the block references C. (dynamic colors)
        if "C." not in full_stmt:
            continue

        # Only move if it's defined AFTER the component (after hook_pos)
        if full_stmt_start <= hook_pos:
            # Already inside the component, no action needed
            continue

        # Remove it from module level
        content = content[:full_stmt_start] + content[end:]

        # Insert it after `const C = useThemeColors()`
        insert_after = hook_pos + len(hook_marker)
        # Find end of that line
        newline_pos = content.find("\n", insert_after)
        if newline_pos == -1:
            newline_pos = len(content)

        # Determine indentation from surrounding code
        line_start = content.rfind("\n", 0, hook_pos) + 1
        indent = ""
        for ch in content[line_start:]:
            if ch in (" ", "\t"):
                indent += ch
            else:
                break

        # Re-indent the full_stmt to match component indentation
        stmt_indented = "\n".join(
            indent + line if line.strip() else line
            for line in full_stmt.rstrip().splitlines()
        )

        insertion = "\n" + stmt_indented
        content = content[:newline_pos] + insertion + content[newline_pos:]

        # Update hook_pos in case content shifted (only need one pass per file)
        # Re-search after modification
        hook_pos = content.find(hook_marker)
        if hook_pos == -1:
            break

    return content


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
            if "node_modules" in rel or "scripts" in rel:
                continue
            with open(full, encoding="utf-8") as f:
                content = f.read()
            if "StyleSheet.create" not in content:
                continue
            if "C." not in content:
                continue
            result.append((full, rel, content))
    return result


def main():
    targets = find_target_files()
    print(f"Found {len(targets)} files to fix")
    for full, rel, content in targets:
        new_content = migrate(content)
        if new_content != content:
            with open(full, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"  ✓ {rel}")
        else:
            print(f"  - {rel} (no changes needed)")


if __name__ == "__main__":
    main()
