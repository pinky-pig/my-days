import 'expo-dev-client'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Button, H3, H6, XStack, YStack } from 'tamagui'
import tw from 'twrnc'
import Mapbox from '@rnmapbox/maps'
import { View } from 'react-native'

Mapbox.setWellKnownTileServer('Mapbox')
Mapbox.setAccessToken('pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJuMTQxazAwMmUzb256dW9teG8wa2kifQ.H_xJVll_ljzZ8JgWrqQpZA')

export default function Settings() {
  const router = useRouter()
  const params = useSearchParams()

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {},
          headerLeft: () => null,
          headerTitle: props => <H6>图片地图</H6>,
        }}
      />

      <YStack
        alignItems="center"
        space="$2"
        style={tw`w-full h-full `}
        backgroundColor='$backgroundStrong'
      >
        {/* header */}
        <XStack
          alignSelf="center"
          flexDirection='row'
          justifyContent='space-between'
          flexWrap="wrap"
          width={'100%'}
          padding="$4"
          backgroundColor="transparent"
        >

          <Button
            icon={ArrowLeft}
            onPress={router.back}
          />

          <View>
            <H3>{params.user}&apos;s user page</H3>
          </View>

        </XStack>

        {/* map */}
        <View style={{
          height: 300,
          width: 300,
        }}>
          <Mapbox.MapView style={{
            height: 300,
            width: 300,
          }} />
        </View>

      </YStack>
    </View>

  )
}
