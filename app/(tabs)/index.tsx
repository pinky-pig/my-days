import { StyleSheet } from 'react-native'

import { Button } from 'tamagui'
import { useRouter } from 'expo-router'
import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '../../components/Themed'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})

export default function TabOneScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Button onPress={() => router.push('/profile')}>
        Go to user page
      </Button>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  )
}
