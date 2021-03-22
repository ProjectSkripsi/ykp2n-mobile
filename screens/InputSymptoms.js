import React from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { Block, theme, Text, Input } from 'galio-framework'

import { Button, CustomCheckBox } from '../components'

const { width } = Dimensions.get('screen')

class Symptoms extends React.Component {
  state = {
    gejala: [],
  }
  onChange = (value, e) => {
    const { gejala } = this.state
    const temp = gejala
    if (value) {
      temp.push(e)
      this.setState({
        gejala: temp,
      })
    } else {
      this.setState({
        gejala: temp.filter((item) => item !== e),
      })
    }
  }
  render() {
    const { nik, address, name, contact } = this.props.route.params
    console.log(nik, address, name, contact)
    const { gejala } = this.state
    const { onChange } = this

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <CustomCheckBox
            onChange={onChange}
            item={{ _id: 1, name: 'tes11t' }}
          />
          <CustomCheckBox
            onChange={onChange}
            item={{ _id: 12, name: 'te22st' }}
          />

          <Block
            row
            style={{
              marginTop: 25,
            }}
          >
            <Button
              shadowless
              style={styles.button}
              // color={!isValid ? "#9FA5AA" : nowTheme.COLORS.PRIMARY}
              onPress={this.doNext}
              // loading={isLoading}
              // disabled={!isValid}
            >
              <Text
                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                LANJUTKAN Symptoms
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 18,
    fontFamily: 'montserrat-regular',
  },
  label: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
})

export default Symptoms
