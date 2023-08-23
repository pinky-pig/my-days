import { useColorScheme } from 'react-native'
import { Label, Separator, Sheet, Switch, XStack, YGroup } from 'tamagui'
import Colors from '~/constants/Colors'

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
  const colorScheme = useColorScheme()

  return (
    <>
      {/* My sheet */}
      <Sheet
        native
        forceRemoveScrollEnabled={open}
        modal={true} // false 就是页面内的 sheet
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 25]} // 这里可以设置高度
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

          <YGroup alignSelf="center" bordered width={'90%'} size="$4">

            <YGroup.Item >
              <XStack
                width={'100%'}
                alignItems="center"
                paddingLeft="$4"
                paddingRight="$4"
              >
                <Label
                  paddingRight="$0"
                  minWidth={90}
                  justifyContent="flex-end"
                  size="$4"
                  htmlFor={`switch-${'$4'.toString().slice(1)}`}
                >
                  夜间模式
                </Label>

                <Switch
                  marginLeft="auto"
                  id={`switch-${'$4'.toString().slice(1)}`}
                  size="$4"
                >
                  <Switch.Thumb animation="quick" />
                </Switch>
              </XStack>

              <XStack
                width={'100%'}
                alignContent="space-between"
                alignItems="center"
                space="$4"
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
                <Separator minHeight={20} vertical />
                <Switch
                  marginLeft="auto"
                  id={`switch-${'$4'.toString().slice(0)}`}
                  size="$4"
                >
                  <Switch.Thumb animation="quick" />
                </Switch>
              </XStack>
            </YGroup.Item>
          </YGroup>
          {children}
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
