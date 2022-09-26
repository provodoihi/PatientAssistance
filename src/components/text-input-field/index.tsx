import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  KeyboardTypeOptions,
  TextStyle,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

export interface TextInputFieldProps extends TextInputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  maxLength?: number;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  controller?: Control<any>;
  defaultValue?: string;
  style?: TextStyle | TextStyle[];
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  name: string;
  label?: string;
  isErrorField?: boolean;
}

export const TextInputField = (props: TextInputFieldProps) => {
  const {
    placeholder,
    secureTextEntry,
    maxLength,
    multiline,
    placeholderTextColor,
    keyboardType,
    controller,
    defaultValue,
    onSubmitEditing,
    style,
    label,
    isErrorField,
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
            {label && <Text style={styles.txtLabel}>{label}</Text>}
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
              onSubmitEditing={onSubmitEditing}
              {...restProps}
            />
            {isErrorField && error && (
              <Text style={styles.txtError}>{error?.message}</Text>
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
    paddingVertical: '2%',
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
    paddingVertical: '0.5%',
    marginRight: '12%',
  },
  txtLabel: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: rf(1.8),
    color: '#666666',
    paddingVertical: '0.5%',
    marginLeft: '14%',
  },
});
