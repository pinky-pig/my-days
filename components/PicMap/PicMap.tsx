import 'expo-dev-client'
import React from 'react'
import { Dimensions, View } from 'react-native'
import Mapbox from '@rnmapbox/maps'

Mapbox.setWellKnownTileServer('Mapbox')
Mapbox.setAccessToken('pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJuMTQxazAwMmUzb256dW9teG8wa2kifQ.H_xJVll_ljzZ8JgWrqQpZA')

function PicMap() {
  const screenWidth = Dimensions.get('window').width

  return (
    <View style={{
      flex: 1,
      width: screenWidth,
      backgroundColor: '#fff',
    }}>
      <Mapbox.MapView style={{
        height: '100%',
        width: '100%',
      }} />
    </View>
  )
}

export default PicMap
