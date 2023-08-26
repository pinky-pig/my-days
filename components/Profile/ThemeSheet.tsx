import { View, useColorScheme } from 'react-native'
import { Label, Sheet, Switch, View as TView, XGroup, XStack, YStack } from 'tamagui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '~/constants/Colors'
import { setFellowDeviceColorScheme, setThemeName } from '~/store/reducers'
import type { IReducer } from '~/store'
import { Superellipse } from '~/components/Superellipse'

export function ThemeSheet(
  {
    open,
    setOpen,
    position,
    setPosition,
    children,
  }:
  {
    open: boolean
    position: number
    setOpen: (open: boolean) => void
    setPosition: (open: number) => void
    children?: React.ReactNode
  },
) {
  // 保存 colorMode 主题，这里暂时设置为 light 和 dark
  // 如果是跟随设备，那么就设备优先
  // 如果不跟随设备，那么就是 colorMode 主题

  type CustomThemeType = 'light' | 'dark' | 'purple' | 'blue' | 'pink' | 'paper'
  const customThemes: { name: CustomThemeType; coverColor: string }[] = [
    {
      name: 'light',
      coverColor: '#d9d9d9',
    },
    {
      name: 'dark',
      coverColor: '#222222',
    },
    {
      name: 'purple',
      coverColor: '#6262CC',
    },
    {
      name: 'blue',
      coverColor: '#101B2D',
    },
    {
      name: 'pink',
      coverColor: '#D33F9D',
    },
    {
      name: 'paper',
      coverColor: '#F0D60A',
    },

  ]
  const colorScheme = useColorScheme()

  const dispatch = useDispatch()
  const themeName = useSelector((state: IReducer) => state.balance.themeName)
  const isFellowDeviceColorScheme = useSelector((state: IReducer) => state.balance.isFellowDeviceColorScheme)

  useEffect(() => {
    // 1. 如果是跟随设备的话
    if (isFellowDeviceColorScheme)
      dispatch(setThemeName(colorScheme))
  }, [colorScheme, isFellowDeviceColorScheme, themeName])

  function onFellowDeviceCheckedChange(value: boolean) {
    // 2. 设置是否跟随设备，然后再 useEffect 中设置
    dispatch(setFellowDeviceColorScheme(value))
  }

  function handleSetThemeName(item: typeof customThemes[0]) {
    onFellowDeviceCheckedChange(false)
    dispatch(setThemeName(item.name))
  }

  return (
    <>
      {/* My sheet */}
      <Sheet
        native
        forceRemoveScrollEnabled={open}
        modal={true} // false 就是页面内的 sheet
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 50]} // 这里可以设置高度
        defaultPosition={1}
        disableDrag // 配合 defaultPosition 的 index，让其高度在 25 ，且不能拖拽
        dismissOnSnapToBottom
        // position={position} // snapPoints 上面高度改变的时候
        // onPositionChange={setPosition} // snapPoints 上面高度改变的时候
        zIndex={100_000}
        animation="bouncy"
      >
        {/* 背景 overlay */}
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        {/* 中间的小棍 */}
        <Sheet.Handle
          height={6}
          backgroundColor={
            colorScheme === 'dark' ? Colors.dark.thirdColor : Colors.light.thirdColor
          }
          transform={[
            { translateY: 24 },
          ]}
        />

        {/* 里面的内容 */}
        <Sheet.Frame
          flex={1}
          paddingTop="$8"
          justifyContent="flex-start"
          alignItems="center"
          space="$5"
          borderRadius={30}
        >

          <XStack
            width={'100%'}
            alignContent="space-between"
            alignItems="center"
            paddingLeft="$4"
            paddingRight="$4"
          >
            <Label
              paddingRight="$0"
              minWidth={90}
              justifyContent="flex-end"
              size="$4"
              htmlFor={`switch-${'$4'.toString().slice(0)}`}
            >
              使用设备设置
            </Label>
            <Switch
              marginLeft="auto"
              id={`switch-${'$4'.toString().slice(0)}`}
              size="$4"
              checked={isFellowDeviceColorScheme}
              onCheckedChange={onFellowDeviceCheckedChange}
            >
              <Switch.Thumb animation="quick" />
            </Switch>
          </XStack>

          <YStack
            width={'100%'}
            paddingLeft="$4"
            paddingRight="$4"
          >

            <Label
              paddingRight="$0"
              minWidth={90}
              justifyContent="flex-end"
              marginBottom='$4'
            >
              主题模式
            </Label>

            <XGroup
              alignSelf="center"
              bordered
              flexDirection='row'
              justifyContent='space-between'
              flexWrap="wrap"
              width={'100%'}
              size="$8"
              paddingLeft="$4"
              paddingRight="$4"
              paddingTop="$5"
              paddingBottom="$5"
              gap={20}
            >

              {
                customThemes.map((item) => {
                  return (
                    <XGroup.Item
                      key={item.name}
                    >
                      <TView
                        style={{
                          width: 60,
                          height: 60,
                          marginLeft: 10,
                          marginRight: 10,
                          position: 'relative',
                        }}
                        onPress={() => handleSetThemeName(item)}
                      >
                        <Superellipse fill={item.coverColor} stroke={item.coverColor} />

                        {/* 选中显示 check-circle  */}
                        {/* 未选中显示 checkbox-blank-circle-outline  */}
                        {
                          themeName === item.name
                            ? (
                              <View
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: 'white',
                                  borderRadius: 10,
                                }}
                              >
                                <MaterialCommunityIcons
                                  name="check-circle"
                                  size={16}
                                  color="black"
                                />
                              </View>
                              )
                            : (
                              <View
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: 'white',
                                  borderRadius: 10,
                                }}
                              >
                                <MaterialCommunityIcons
                                  name="checkbox-blank-circle-outline"
                                  size={16}
                                  color="black"
                                />
                              </View>
                              )
                        }

                      </TView>
                    </XGroup.Item >
                  )
                })
              }

            </XGroup>
          </YStack>

          {children}
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
