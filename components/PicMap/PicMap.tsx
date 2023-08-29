import 'expo-dev-client'
import React from 'react'
import { Dimensions, View } from 'react-native'
import Mapbox from '@rnmapbox/maps'

Mapbox.setWellKnownTileServer('Mapbox')
Mapbox.setAccessToken('pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJuMTQxazAwMmUzb256dW9teG8wa2kifQ.H_xJVll_ljzZ8JgWrqQpZA')

function PicMap() {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  return (
    <View style={{
      flex: 1,
      width: screenWidth,
      height: screenHeight,
      position: 'absolute',
      top: 0,
      left: 0,
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
