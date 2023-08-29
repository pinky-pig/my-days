import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useTheme } from 'tamagui'
import Colors from '../../constants/Colors'
import type { IReducer } from '~/store'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} {...props} />
}

export default function TabLayout() {
  // 全局的样式管理
  // 1. 状态通过 redux 管理
  // 2. RN 组件通过自定义 Colors 管理
  // 3. Tamagui 组件通过其 Theme 管理

  const themeName = useSelector((state: IReducer) => state.balance.themeName)
  const tamaguiTheme = useTheme() as any

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tamaguiTheme.color.val,
        tabBarStyle: {
          backgroundColor: tamaguiTheme.background.val,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          // headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <Ionicons name="ios-heart-circle" size={28} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[themeName ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
