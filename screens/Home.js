import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Block, theme, Text, Input } from 'galio-framework'
import DateTimePicker from '@react-native-community/datetimepicker'
import { connect } from 'react-redux'
import { Card, Button } from '../components'
import moment from 'moment'
import { getSymptomsRequest } from '../store/gejala/action'
const { width } = Dimensions.get('screen')

class Home extends React.Component {
  state = {
    isLoading: false,
    nik: '',
    name: '',
    placeBirth: '',
    dateBirth: new Date(),
    contact: '',
    address: '',
    errors: {
      nik: null,
      name: null,
      placeBirth: null,
      dateBirth: null,
      contact: null,
      address: null,
    },
    isValid: false,
    show: false,
    defaultValue: new Date(),
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getSymptomsRequest((callBack) => {}))
  }

  isValidForm = (type) => {
    const {
      nik,
      name,
      contact,
      address,
      errors,
      placeBirth,
      dateBirth,
    } = this.state
    let isValidForm = false
    if (type === 'name') {
      errors.name = name.length <= 3
    }
    if (type === 'address') {
      errors.address = address.length < 9
    }
    if (type === 'nik') {
      errors.nik = nik.length < 7
    }
    if (type === 'contact') {
      errors.contact = contact.length < 9
    }
    if (type === 'placeBirth') {
      errors.placeBirth = placeBirth.length < 2
    }
    if (type === 'dateBirth') {
      console.log(dateBirth)
      errors.dateBirth = dateBirth.length < 4
    }

    isValidForm =
      !errors.name &&
      !errors.address &&
      !errors.nik &&
      !errors.placeBirth &&
      !errors.dateBirth &&
      !errors.contact &&
      errors.name !== null &&
      errors.address !== null &&
      errors.contact !== null &&
      errors.placeBirth !== null &&
      errors.dateBirth !== null &&
      errors.nik !== null
    this.setState({ errors, isValid: isValidForm })
  }

  doNext = () => {
    const {
      nik,
      name,
      contact,
      address,
      errors,
      placeBirth,
      dateBirth,
    } = this.state
    const { navigation } = this.props
    const date = dateBirth.toISOString()
    this.setState(
      {
        isLoading: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            isLoading: false,
          })
        }, 1000)
        navigation.navigate('Symptoms', {
          nik,
          name,
          contact,
          address,
          placeBirth,
          dateBirth: date,
        })
      },
    )
  }

  onChange = (value, name) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.isValidForm(name)
      },
    )
  }

  changeDate = (e, val) => {
    const { type } = e
    this.setState(
      {
        dateBirth: type === 'set' ? val : new Date(),
        show: false,
      },
      () => {
        this.isValidForm('dateBirth')
      },
    )
  }

  render() {
    const {
      nik,
      name,
      errors,
      placeBirth,
      dateBirth,
      contact,
      address,
      isLoading,
      isValid,
      show,
      defaultValue,
    } = this.state

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateBirth || new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={this.changeDate}
              locale="id-ID"
              onCancel={() => {
                this.setState({
                  show: false,
                  dateBirth: defaultValue,
                })
              }}
            />
          )}
          <Input
            placeholder="No. KTP"
            color="black"
            type="numeric"
            label="NIK"
            placeholderTextColor="#D8D8D8"
            value={nik}
            onChangeText={(text) => this.onChange(text, 'nik')}
            style={{ borderColor: errors.nik ? 'red' : '#9FA5AA' }}
          />
          <Input
            placeholder="Nama Lengkap"
            color="black"
            label="Nama Lengkap"
            placeholderTextColor="#D8D8D8"
            value={name}
            onChangeText={(text) => this.onChange(text, 'name')}
            style={{ borderColor: errors.name ? 'red' : '#9FA5AA' }}
          />
          <Input
            placeholder="ex. Makassar"
            color="black"
            label="Tempat Lahir"
            placeholderTextColor="#D8D8D8"
            value={placeBirth}
            onChangeText={(text) => this.onChange(text, 'placeBirth')}
            style={{ borderColor: errors.placeBirth ? 'red' : '#9FA5AA' }}
          />

          <Input
            disabled
            placeholder="21-04-2000"
            color="black"
            label="Tanggal Lahir"
            onFocus={() => {
              this.setState({ show: true })
            }}
            placeholderTextColor="#D8D8D8"
            showSoftInputOnFocus={false}
            value={moment(dateBirth).format('LL')}
            style={{ borderColor: errors.dateBirth ? 'red' : '#9FA5AA' }}
          />

          <Input
            placeholder="08123456789"
            color="black"
            type="numeric"
            label="No. Handphone"
            placeholderTextColor="#D8D8D8"
            value={contact}
            onChangeText={(text) => this.onChange(text, 'contact')}
            style={{ borderColor: errors.contact ? 'red' : '#9FA5AA' }}
          />
          <Text style={[styles.label, { marginTop: 5 }]}>Alamat lengkap</Text>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(text) => this.onChange(text, 'address')}
            value={address}
            placeholder="Alamat lengkap"
            style={{
              borderColor: errors.address ? 'red' : '#9FA5AA',
              borderColor: '#9FA5AA',
              borderRadius: 9,
              borderWidth: 0.8,
              paddingHorizontal: 18,
              textAlignVertical: 'top',
              lineHeight: 20,
              letterSpacing: 0,
              paddingVertical: 20,
            }}
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
              color={!isValid ? 'default' : 'primary'}
              onPress={this.doNext}
              loading={isLoading}
              disabled={!isValid}
            >
              <Text
                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                LANJUTKAN
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
  // button: {
  //   flex: 1,
  //   shadowRadius: 0,
  //   shadowOpacity: 0,
  // },
  button: {
    flex: 1,
    // width: width - theme.SIZES.BASE * 4,
    // height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
})

export default connect((state) => state)(Home)
