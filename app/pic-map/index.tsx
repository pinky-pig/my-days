import 'expo-dev-client'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Button, H3, H6, View, XStack, YStack } from 'tamagui'
import tw from 'twrnc'

// import Mapbox from '@rnmapbox/maps'

// Mapbox.setAccessToken('pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJuMTQxazAwMmUzb256dW9teG8wa2kifQ.H_xJVll_ljzZ8JgWrqQpZA')

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

      </YStack>

      <H6>Some Tamagui components in action.</H6>

      {/* <Mapbox.MapView style={{ flex: 1 }} /> */}

    </View>

  )
}
