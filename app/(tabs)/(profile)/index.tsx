import React from "react"
import { ScrollView, View, Text, Image, Switch, Pressable } from "react-native"
import { useRouter, Stack } from "expo-router"
import * as Haptics from "expo-haptics"
import {
  Globe, Moon, Bell, Shield, LogOut, QrCode,
  Smartphone, DollarSign, ArrowRight, UserRound,
} from "lucide-react-native"

import { useThemeColors } from "@/constants/colors"
import { useThemeStore } from "@/store/themeStore"
import { useUserStore } from "@/store/userStore"
import HStack from "@/components/ui/hstack"

export default function ProfileScreen() {
  const router = useRouter()
  const { user, logout } = useUserStore()
  const C = useThemeColors()
  const { isDark, toggle: toggleTheme } = useThemeStore()

  const [settings, setSettings] = React.useState({
    notifications: true,
    soundEffects: true,
    hapticFeedback: true,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    if (process.env.EXPO_OS === "ios") Haptics.selectionAsync()
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: C.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: C.text, fontSize: 16 }}>User not found</Text>
      </View>
    )
  }

  const handlePress = (path: string) => {
    if (process.env.EXPO_OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push(path as any)
  }

  const menuItemStyle = {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: C.card,
    borderRadius: 12,
    borderCurve: "continuous" as any,
    padding: 16,
  }

  const iconWrapStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.inputBackground,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginRight: 12,
  }

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="qrcode"
          onPress={() => handlePress("/qrcode")}
        />
      </Stack.Toolbar>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 16, gap: 24 }}
      >
        {/* Profile card */}
        <HStack
          style={{
            padding: 16,
            borderRadius: 16,
            borderCurve: "continuous",
            backgroundColor: C.card,
          }}
          justify="space-between"
        >
          <HStack gap={12}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            ) : (
              <View style={{ width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", backgroundColor: C.inputBackground }}>
                <UserRound size={32} color={C.text} />
              </View>
            )}
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: C.text }}>{user.name}</Text>
              <Text style={{ fontSize: 14, color: C.secondaryText }}>@{user.username}</Text>
            </View>
          </HStack>
          <Pressable
            onPress={() => handlePress("/qrcode")}
            style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: C.inputBackground }}
          >
            <QrCode size={20} color={C.text} />
          </Pressable>
        </HStack>

        {/* Account section */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: C.text }}>Account</Text>
          <View style={{ gap: 8 }}>
            {[
              { icon: UserRound, title: "Profile Information", desc: "Update your personal details", path: "/profile-settings" },
              { icon: DollarSign, title: "Payment Methods", desc: "Manage your linked accounts", path: "/payment-methods" },
              { icon: Bell, title: "Notifications", desc: "Manage notification preferences", path: "/notifications" },
              { icon: Shield, title: "Privacy & Security", desc: "Manage security settings", path: "/privacy" },
            ].map(({ icon: Icon, title, desc, path }) => (
              <Pressable key={path} style={menuItemStyle} onPress={() => handlePress(path)}>
                <View style={iconWrapStyle}><Icon size={20} color={C.text} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500", color: C.text, marginBottom: 2 }}>{title}</Text>
                  <Text style={{ fontSize: 14, color: C.secondaryText }}>{desc}</Text>
                </View>
                <ArrowRight size={20} color={C.secondaryText} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Preferences section */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: C.text }}>Preferences</Text>
          <View style={{ gap: 8 }}>
            {/* Dark Mode toggle — connected to theme store */}
            <View style={menuItemStyle}>
              <View style={iconWrapStyle}><Moon size={20} color={C.text} /></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "500", color: C.text, marginBottom: 2 }}>Dark Mode</Text>
                <Text style={{ fontSize: 14, color: C.secondaryText }}>Use dark theme</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={() => {
                  if (process.env.EXPO_OS === "ios") Haptics.selectionAsync()
                  toggleTheme()
                }}
                trackColor={{ false: C.border, true: C.primary }}
                thumbColor={C.text}
              />
            </View>

            {[
              { icon: Bell, key: "soundEffects" as const, title: "Sound Effects", desc: "Play sounds for actions" },
              { icon: Smartphone, key: "hapticFeedback" as const, title: "Haptic Feedback", desc: "Enable vibration feedback" },
            ].map(({ icon: Icon, key, title, desc }) => (
              <View key={key} style={menuItemStyle}>
                <View style={iconWrapStyle}><Icon size={20} color={C.text} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500", color: C.text, marginBottom: 2 }}>{title}</Text>
                  <Text style={{ fontSize: 14, color: C.secondaryText }}>{desc}</Text>
                </View>
                <Switch
                  value={settings[key]}
                  onValueChange={() => toggleSetting(key)}
                  trackColor={{ false: C.border, true: C.primary }}
                  thumbColor={C.text}
                />
              </View>
            ))}
            {[
              { icon: DollarSign, title: "Currency", desc: "USD – United States Dollar", path: "/currency" },
              { icon: Globe, title: "Language", desc: "English (US)", path: "/language" },
            ].map(({ icon: Icon, title, desc, path }) => (
              <Pressable key={path} style={menuItemStyle} onPress={() => handlePress(path)}>
                <View style={iconWrapStyle}><Icon size={20} color={C.text} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500", color: C.text, marginBottom: 2 }}>{title}</Text>
                  <Text style={{ fontSize: 14, color: C.secondaryText }}>{desc}</Text>
                </View>
                <ArrowRight size={20} color={C.secondaryText} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* About section */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: C.text }}>About</Text>
          <View style={{ gap: 8 }}>
            {[
              { title: "Help & Support", path: "/help" },
              { title: "Terms of Service", path: "/terms" },
              { title: "Privacy Policy", path: "/privacy-policy" },
            ].map(({ title, path }) => (
              <Pressable key={path} style={menuItemStyle} onPress={() => handlePress(path)}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500", color: C.text }}>{title}</Text>
                </View>
                <ArrowRight size={20} color={C.secondaryText} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Logout */}
        <Pressable
          onPress={() => {
            if (process.env.EXPO_OS === "ios") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
            logout()
            router.replace("/auth/login")
          }}
          style={{
            flexDirection: "row",
            gap: 8,
            padding: 16,
            borderRadius: 12,
            borderCurve: "continuous",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 67, 42, 0.1)",
          }}
        >
          <LogOut size={20} color={C.error} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: C.error }}>Log Out</Text>
        </Pressable>

        <Text style={{ fontSize: 14, textAlign: "center", color: C.secondaryText, paddingBottom: 8 }}>
          Version 0.1.0-beta.1
        </Text>
      </ScrollView>
    </>
  )
}
