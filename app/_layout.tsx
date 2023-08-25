import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Suspense, useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { TamaguiProvider, Text, Theme } from 'tamagui'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { persistStore } from 'redux-persist'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import config from '../tamagui.config'
import { MySafeAreaView } from '~/components/MySafeAreaView'

import type { IReducer } from '~/store'
import { store } from '~/store'

const persistor = persistStore(store)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error)
      throw error
  }, [error])

  useEffect(() => {
    if (loaded)
      SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded)
    return null

  return (
    <ReduxProvider store={store}>
      <RootLayoutNav />
    </ReduxProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  const themeName = useSelector((state: IReducer) => state.balance.themeName)
  return (
    <TamaguiProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <PersistGate loading={null} persistor={persistor}>

          <Theme name={themeName}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <MySafeAreaView>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                </Stack>
              </MySafeAreaView>
            </ThemeProvider>
          </Theme>

        </PersistGate>
      </Suspense>
    </TamaguiProvider>
  )
}
