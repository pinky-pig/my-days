import { ArrowLeft } from '@tamagui/lucide-icons'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Button, H3, H6, View, YStack } from 'tamagui'
import tw from 'twrnc'

export default function Settings() {
  const router = useRouter()
  const params = useSearchParams()

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          headerStyle: { },
          headerLeft: () => null,
          headerTitle: props => <H6>基础设置</H6>,
        }}
      />

        <YStack
          alignItems="center"
          space="$2"
          style={tw`w-full h-full `}
          backgroundColor='$backgroundStrong'
        >
          <Button
            icon={ArrowLeft}
            onPress={router.back}
          />
          <H3>{params.user}&apos;s user page</H3>
        </YStack>

        <H6>Some Tamagui components in action.</H6>

    </View>

  )
}
