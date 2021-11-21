import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  KeyboardTypeOptions,
  TextStyle,
} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

interface TextInputFieldProps extends TextInputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  maxLength?: number;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  controller?: Control<any>;
  defaultValue?: string;
  style?: TextStyle | TextStyle[];
  name: string;
}

const TextInputField = (props: TextInputFieldProps) => {
  const {
    placeholder,
    secureTextEntry,
    maxLength,
    multiline,
    placeholderTextColor,
    keyboardType,
    controller,
    defaultValue,
    style,
    name,
    ...restProps
  } = props;
  return (
    <Controller
      control={controller}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <>
            <TextInput
              style={StyleSheet.flatten([style, styles.txtInput])}
              onChangeText={onChange}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              keyboardType={keyboardType}
              maxLength={maxLength}
              multiline={multiline}
              secureTextEntry={secureTextEntry}
              {...restProps}
            />
            {error && (
              <Text style={styles.txtError}>This field is required</Text>
            )}
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  txtInput: {
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
    paddingVertical: '1.5%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 24,
  },
  txtError: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    fontSize: rf(1.5),
    color: '#ff6666',
    paddingVertical: '1.5%',
    marginRight: '12%',
  },
});

export default TextInputField;
