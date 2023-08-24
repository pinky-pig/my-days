import { X } from '@tamagui/lucide-icons'
import { Adapt, Button, Dialog, Sheet, Text, Unspaced, XStack } from 'tamagui'

export function ContactUsDialog(
  {
    open,
    setOpen,
  }:
  {
    open: boolean
    setOpen: (open: boolean) => void
  },
) {
  return (

    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >

      {/* 当屏幕比较小的时候，使用 sheet 代替 dialog */}
      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" >
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        >
          {/* 标题 */}
          <Dialog.Title>Edit profile</Dialog.Title>

          {/* 副标题 - 描述 */}
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>

          {/* 内容 */}
          <Text>Test</Text>

          {/* 关闭按钮 */}

          <XStack alignSelf="flex-end">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="alt1" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
