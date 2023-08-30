import { Button, Frame, Handle, Input, XStack, YStack } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'

import { Stack, styled } from '@tamagui/core'
import { createSheet } from '@tamagui/sheet'
import React from 'react'
import { useWindowDimensions } from 'react-native'

const Overlay = styled(Stack, {
  variants: {
    open: {
      true: {
        opacity: 0,
        pointerEvents: 'none',
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  } as const,
})

export const Sheet = createSheet({
  Frame,
  Handle,
  Overlay,
})

export default function MapSheet(
  { children }:
  { children?: React.ReactNode },
) {
  // 保存 colorMode 主题，这里暂时设置为 light 和 dark
  // 如果是跟随设备，那么就设备优先
  // 如果不跟随设备，那么就是 colorMode 主题
  const { width: dimensionsWidth, height: dimensionsHeight } = useWindowDimensions()

  const [position, setPosition] = React.useState(1)

  function handleClickInput() {
    setPosition(0)
  }

  return (
    <>
      {/* My sheet */}
      <Sheet
        native
        // forceRemoveScrollEnabled={open}
        modal={false} // false 就是页面内的 sheet
        open={true}
        // onOpenChange={setOpen}
        snapPoints={[100, 50, 25]} // 这里可以设置高度
        defaultPosition={1}
        // disableDrag // 禁止拖拽
        dismissOnSnapToBottom={false} // 如果为 true ，那么滑到最底部就关掉了
        position={position} // snapPoints 上面高度改变的时候
        onPositionChange={setPosition} // snapPoints 上面高度改变的时候
        zIndex={100_000}
        // dismissOnOverlayPress
        // moveOnKeyboardChange={false}
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
          backgroundColor='$color1'
          transform={[
            { translateY: 10 },
          ]}
        />

        {/* 里面的内容 */}
        <Sheet.Frame
          flex={1}
          paddingTop="$8"
          justifyContent="flex-start"
          alignItems="center"
          space="$5"
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          position="absolute" // 这个和下面的 disableHideBottomOverflow 配合处理键盘弹起的闪烁bug
          disableHideBottomOverflow
          height={dimensionsHeight}
        >

          <YStack
            width={'100%'}
            paddingLeft="$4"
            paddingRight="$4"
          >

            <XStack alignItems="center" space="$2">

              <Input
                flex={1}
                size="$4"
                placeholder={'搜索地点'}
              />

              <Button size="$4" icon={Search} />

            </XStack>

          </YStack>

          {children}
        </Sheet.Frame>
      </Sheet>

    </>
  )
}
