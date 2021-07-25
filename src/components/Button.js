import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      {props.icon && <Icon name={props.icon} style={styles.icon} />}
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3ba294',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
});
