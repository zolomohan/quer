import React from 'react';
import { StyleSheet, TextInput as Input } from 'react-native';

// configs
import colors from '../configs/colors';

export default function TextInput(props) {
  return (
    <Input
      {...props}
      value={props.value}
      onChangeText={props.onChangeText}
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor={colors.placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.primary,
  },
});
