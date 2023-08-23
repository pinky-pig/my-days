import { useColorScheme } from 'react-native'
import { Sheet } from 'tamagui'
import Colors from '~/constants/Colors'

export function MySheet(
  {
    children,
    open,
    setOpen,
    position,
    setPosition,
  }:
  {
    children: React.ReactNode
    open: boolean
    position: number
    setOpen: (open: boolean) => void
    setPosition: (open: number) => void
  },
) {
  const colorScheme = useColorScheme()
  // const [position, setPosition] = useState(0)

  return (
    <>
      {/* My sheet */}
      <Sheet
        native
        forceRemoveScrollEnabled={open}
        modal={true} // false 就是页面内的 sheet
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 50, 25]} // 这里可以设置高度
        dismissOnSnapToBottom
        position={position} // snapPoints 上面高度改变的时候
        onPositionChange={setPosition} // snapPoints 上面高度改变的时候
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
          padding="$4"
          justifyContent="center"
          alignItems="center"
          space="$5"
          borderRadius={30}
        >
          {children}
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
