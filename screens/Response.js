import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { nowTheme } from '../constants/'

import { get } from 'lodash'
import { Button } from 'galio-framework'

const Response = ({ navigation, route }) => {
  const { data } = route.params
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom: 5 }}>
        Hasil Pengecekan Pasien
      </Text>

      <View
        style={{
          flexDirection: 'column',
          marginBottom: 50,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 25 }}>Nama: {data.name}</Text>
        <Text style={{ fontSize: 25 }}>
          Umur: {get(data, 'age', '') || 0} Tahun
        </Text>

        <Text style={{ fontSize: 25, paddingTop: 30 }}>Hasil Analisa</Text>
        <Text style={{ fontSize: 25, color: 'green', textAlign: 'center' }}>
          {get(data, 'result', '')}
        </Text>
        <Text style={{ fontSize: 25, color: 'green', textAlign: 'center' }}>
          {get(data, 'criteriaStatus', '')}
        </Text>
      </View>

      <Button
        shadowless
        style={styles.button}
        color={nowTheme.COLORS.PRIMARY}
        onPress={() => {
          navigation.replace('App')
        }}
      >
        <Text
          style={{
            fontFamily: 'montserrat-bold',
            fontSize: 14,
            color: 'white',
          }}
        >
          SELESAI
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {},
})

export default Response
