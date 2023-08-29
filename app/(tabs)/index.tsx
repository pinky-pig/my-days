import { View } from 'react-native'
import { useRouter } from 'expo-router'
import PicMap from '~/components/PicMap/PicMap'
import MapSheet from '~/components/PicMap/MapSheet'

export default function TabOneScreen() {
  const router = useRouter()

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>

     <PicMap />
     <MapSheet />

    </View>
  )
}
