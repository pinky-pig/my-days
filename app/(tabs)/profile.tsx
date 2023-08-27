import { Feather } from '@expo/vector-icons'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Avatar, ListItem, ScrollView, Separator, Text, YGroup, YStack, useTheme, useWindowDimensions } from 'tamagui'
import tw from 'twrnc'
import { ContactUsDialog } from '~/components/Profile/ContactUsDialog'
import { ThemeSheet } from '~/components/Profile/ThemeSheet'

export default function Profile() {
  const { width, height } = useWindowDimensions()
  const colorScheme = useColorScheme()
  const router = useRouter()
  const tamaguiTheme = useTheme() as any

  const [position, setPosition] = useState(0)
  const [openThemeSheet, setOpenThemeSheet] = useState(false)
  const [openContactUsDialog, setOpenContactUsDialog] = useState(false)

  const profileItem = [
    [
      {
        title: '基础设置',
        icon: <Feather name="settings" size={18} color={tamaguiTheme.color?.val} />,
        subTitle: '',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
      {
        title: '使用方法',
        icon: <Feather name="book-open" size={18} color={tamaguiTheme.color?.val} />,
        subTitle: '',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
    ],
    [
      {
        title: '分享给好友',
        icon: <Feather name="airplay" size={18} color={tamaguiTheme.color?.val} />,
        subTitle: '截图分享',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
      {
        title: '联系开发者',
        icon: <Feather name="message-circle" size={18} color={tamaguiTheme.color?.val} />,
        subTitle: '',
        iconAfter: ChevronRight,
        onPress: () => setOpenContactUsDialog(true),
      },
    ],
    [
      {
        title: '主题颜色',
        icon: <Feather name="moon" size={18} color={tamaguiTheme.color?.val} />,
        subTitle: '',
        iconAfter: <></>,
        onPress: () => setOpenThemeSheet(true),
      },
    ],
  ]

  return (
    <>
      <YStack
        alignContent='center'
        height={height}
      >

        <YStack
          alignContent='center'
          alignItems='center'
          backgroundColor="$background"
          style={tw`pt-4 pb-4`}
        >
          <Avatar
            circular
            width={width}
            size="$8"
          >
            <Avatar.Image
              accessibilityLabel="Cam"
              resizeMode='cover'
              src={require('~/assets/images/logo.png')}
              style={tw`w-full h-full`}
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>

          <Text style={tw`mt-2`}>
            Arvin
          </Text>
        </YStack>

        <ScrollView
          scrollEventThrottle={16}
          backgroundColor="$background"
          flex={1}
          contentContainerStyle={tw`flex flex-col gap-4 pt-4`} // 这里还有个子盒子
        >

          {
            profileItem.map((group, index) => {
              return (
                <YGroup
                  key={index}
                  alignSelf="center"
                  bordered
                  width={width - 40}
                  size="$8" // border-radius
                  separator={<Separator width={0} />}
                >

                  {
                    group.map((item) => {
                      return (
                        <YGroup.Item
                          key={item.title}
                        >
                          <ListItem
                            hoverTheme
                            pressTheme
                            size="$5"
                            icon={item.icon}
                            title={item.title}
                            subTitle={item.subTitle}
                            iconAfter={item.iconAfter}
                            onPress={item.onPress}
                          />
                        </YGroup.Item>
                      )
                    })
                  }

                </YGroup>
              )
            })
          }

        </ScrollView>
      </YStack >

      <ThemeSheet
        open={openThemeSheet}
        setOpen={setOpenThemeSheet}
        position={position}
        setPosition={setPosition}
      />

      <ContactUsDialog
        open={openContactUsDialog}
        setOpen={setOpenContactUsDialog}
      />

    </>

  )
}
