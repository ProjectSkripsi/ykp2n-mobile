import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native'
import { Block, Text, Button as GaButton, theme } from 'galio-framework'
import { connect } from 'react-redux'

import { Button, Icon, Input } from '../components'
import { Images, nowTheme } from '../constants'
import { getItem } from '../constants/utils'
import { loginRequest } from '../store/auth/auth-action'

const { width, height } = Dimensions.get('screen')

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

class Register extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: null,
      password: null,
    },
    isValid: false,
    isLoading: false,
    errorLogin: false,
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

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(email)
  }

  isValidForm = (type) => {
    const { email, password, errors } = this.state
    let isValidForm = false
    if (type === 'email') {
      errors.email = this.validateEmail(email)
    }
    if (type === 'password') {
      errors.password = password.length === 0
    }

    isValidForm =
      !errors.email &&
      !errors.password &&
      errors.email !== null &&
      errors.password !== null
    this.setState({ errors, isValid: isValidForm })
  }
  doLogin = () => {
    const { navigation, dispatch } = this.props
    const { email, password } = this.state

    dispatch(
      loginRequest(email, password, (callBack) => {
        const { status } = callBack
        if (status === 200) {
          // goto success login
          this.setState({
            errorLogin: false,
            email: '',
            password: '',
          })
          navigation.navigate('App')
        } else {
          this.setState(
            {
              errorLogin: true,
            },
            () => {
              setTimeout(() => {
                this.setState({
                  errorLogin: false,
                })
              }, 3000)
            },
          )
        }
      }),
    )
  }

  render() {
    const { navigation } = this.props
    const { isValid, isLoading, errorLogin, email, password } = this.state

    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block
                      flex={0.5}
                      row
                      middle
                      space="between"
                      style={{ marginBottom: 18, marginTop: 30 }}
                    >
                      <Image
                        source={require('../assets/ypk2n.jpeg')}
                        style={{
                          width: 100,
                        }}
                        resizeMode="contain"
                      />
                    </Block>
                  </Block>
                  <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                      }}
                      muted
                      size={16}
                    >
                      Silahkan login menggunakan email & password
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              keyboardType="email-address"
                              autoCompleteType="email"
                              style={styles.inputs}
                              autoCapitalize="none"
                              onChangeText={(text) =>
                                this.onChange(text, 'email')
                              }
                              value={email}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Password"
                              style={styles.inputs}
                              autoCompleteType="password"
                              secureTextEntry={true}
                              autoCapitalize="none"
                              value={password}
                              onChangeText={(text) =>
                                this.onChange(text, 'password')
                              }
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="key"
                                  family="Entypo"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          {errorLogin && (
                            <Text
                              style={{
                                fontFamily: 'montserrat-regular',
                                textAlign: 'center',
                                color: 'red',
                              }}
                              muted
                              size={14}
                            >
                              Email/Password salah!
                            </Text>
                          )}
                        </Block>
                        <Block center>
                          <Button
                            // color="primary"
                            color={!isValid ? 'default' : 'primary'}
                            round
                            disabled={!isValid}
                            loading={isLoading}
                            style={styles.createButton}
                            onPress={this.doLogin}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Login
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: 500,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop: 50,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
})

export default connect((state) => state)(Register)
