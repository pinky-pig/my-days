import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'
import type { ThemeName, Themes } from 'tamagui'

// 创建一个主题上下文
export const ThemeContext = createContext<{
  themeName: ThemeName
  updateTheme: (newTheme: string) => Promise<void>
} | null>(null)

// 自定义钩子以获取主题上下文的值
export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState('light' as ThemeName)

  useEffect(() => {
    // 从 AsyncStorage 中获取保存的主题名字
    AsyncStorage.getItem('themeName').then((savedTheme: any) => {
      if (savedTheme)
        setThemeName(savedTheme)
    })
  }, [])

  async function updateTheme(newTheme: string) {
    setThemeName(newTheme as keyof Themes)
    // 保存主题名字到 AsyncStorage
    await AsyncStorage.setItem('themeName', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ themeName, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
