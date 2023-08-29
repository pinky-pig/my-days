import Mapbox from '@rnmapbox/maps'
import { View } from 'react-native'

export function MapboxMap({
  width = 300,
  height = 300,
}) {
  return (
    <View
      style={{ height, width }}
    >
      <Mapbox.MapView
        style={{ height: '100%', width: '100%' }}
      />
    </View>
  )
}
