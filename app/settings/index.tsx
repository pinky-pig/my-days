import { ArrowLeft } from '@tamagui/lucide-icons'
import { useRouter, useSearchParams } from 'expo-router'
import { Button, H3, H6, XStack } from 'tamagui'
import { MyStack } from '~/components/MyStack'

export default function Settings() {
  const router = useRouter()
  const params = useSearchParams()

  return (

    <MyStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
        />
        <H3>{params.user}&apos;s user page</H3>
      </XStack>

      <H6>Some Tamagui components in action.</H6>

    </MyStack>
  )
}
