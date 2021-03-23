import React from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { Block, theme, Text, Input } from 'galio-framework'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseUrl, getItem } from '../constants/utils'
import { Button, CustomCheckBox } from '../components'

const { width } = Dimensions.get('screen')

class Symptoms extends React.Component {
  state = {
    symptomsId: [],
    isLoading: false,
  }
  onChange = (value, e) => {
    const { symptomsId } = this.state
    const temp = symptomsId
    if (value) {
      temp.push(e)
      this.setState({
        symptomsId: temp,
      })
    } else {
      this.setState({
        symptomsId: temp.filter((item) => item !== e),
      })
    }
  }

  onSubmit = async () => {
    const { navigation } = this.props
    const {
      nik,
      address,
      name,
      contact,
      placeBirth,
      dateBirth,
    } = this.props.route.params

    const { symptomsId } = this.state
    const token = await getItem('token')
    try {
      const response = await axios.post(
        `${baseUrl}/patient`,
        {
          nik,
          address,
          name,
          contact,
          placeBirth,
          dateBirth,
          symptomsId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.status === 201) {
        navigation.navigate('Response', {
          data: response.data,
        })
      }
    } catch (error) {
      const err = error.response ? error.response : error
      return Promise.reject(err)
    }
  }

  render() {
    const { onChange } = this
    const { symptoms } = this.props
    const { symptomsId, isLoading } = this.state
    const isValid = symptomsId.length > 0
    console.log('input', this.state)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {symptoms &&
            symptoms.map((item) => (
              <CustomCheckBox
                key={item._id}
                onChange={onChange}
                item={{ _id: item._id, name: item.name }}
              />
            ))}

          <Block
            row
            style={{
              marginTop: 25,
            }}
          >
            <Button
              shadowless
              style={styles.button}
              color={!isValid ? 'default' : 'primary'}
              onPress={this.doNext}
              loading={isLoading}
              disabled={!isValid}
              onPress={this.onSubmit}
            >
              <Text
                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                ANALISA
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

const mapStateToProps = ({ symptoms }) => ({
  symptoms: symptoms.data,
})

export default connect(mapStateToProps)(Symptoms)
