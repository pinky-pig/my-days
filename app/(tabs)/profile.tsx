import { Feather } from '@expo/vector-icons'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, View, useColorScheme, useWindowDimensions } from 'react-native'
import { Avatar, ListItem, ScrollView, Separator, YGroup, YStack } from 'tamagui'
import tw from 'twrnc'
import { ThemeSheet } from '~/components/Profile/ThemeSheet'

import Colors from '~/constants/Colors'

export default function Profile() {
  const { width, height } = useWindowDimensions()
  const colorScheme = useColorScheme()
  const router = useRouter()

  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)

  const profileItem = [
    [
      {
        title: '基础设置',
        icon: <Feather name="settings" size={18} color="black" />,
        subTitle: '',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
      {
        title: '使用方法',
        icon: <Feather name="book-open" size={18} color="black" />,
        subTitle: '',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
    ],
    [
      {
        title: '分享给好友',
        icon: <Feather name="airplay" size={18} color="black" />,
        subTitle: '截图分享',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
      {
        title: '联系开发者',
        icon: <Feather name="message-circle" size={18} color="black" />,
        subTitle: '',
        iconAfter: ChevronRight,
        onPress: () => router.push('/settings'),
      },
    ],
    [
      {
        title: '主题颜色',
        icon: (
          colorScheme === 'dark'
            ? <Feather name="sun" size={18} color="black" />
            : <Feather name="moon" size={18} color="black" />
        ),
        subTitle: '',
        iconAfter: <></>,
        onPress: () => setOpen(true),
      },
    ],
  ]

  return (
    <>
      <YStack
        justifyContent='center'
        alignContent='center'
        height={height}
      >

        <View
          style={[
            { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background },
            tw`flex flex-col justify-center items-center pt-4 pb-4`,
          ]}
        >
          <Avatar
            circular
            width={width}
            size="$8"
          >
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>

          <Text style={tw`mt-2`}>
            Arvin
          </Text>
        </View>

        <ScrollView
          // onScroll={handleScroll}
          scrollEventThrottle={16}
          style={[
            {
              backgroundColor: colorScheme === 'dark' ? Colors.dark.secondColor : Colors.light.secondColor,
            },
            tw`flex-1 `, // 这里设置的是盒子
          ]}
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
                  size="$6" // border-radius
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
        open={open}
        setOpen={setOpen}
        position={position}
        setPosition={setPosition}
      />

    </>

  )
}
