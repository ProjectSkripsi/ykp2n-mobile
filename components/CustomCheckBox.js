import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, Checkbox } from 'galio-framework'

export default class CustomCheckBox extends React.Component {
  render() {
    const { onChange, item } = this.props

    return (
      <View style={{ marginBottom: 10 }}>
        <Checkbox
          color="warning"
          label={item.name}
          onChange={(val) => onChange(val, item._id)}
          value={item._id}
        />
      </View>
    )
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  iconColor: PropTypes.string,
  checked: PropTypes.bool,
  onChecked: PropTypes.func,
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
