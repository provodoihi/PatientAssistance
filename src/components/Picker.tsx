import React from 'react';
import {StyleSheet, Text, TextStyle, StyleProp, ColorValue} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {Picker, PickerItemProps} from '@react-native-picker/picker';

export interface PickerProps extends PickerItemProps {
  controller?: Control<any>;
  style?: StyleProp<TextStyle>;
  dropdownIconColor?: number | ColorValue;
  onValueChange?: (itemValue: string | number, itemIndex: number) => void;
  selectedValue?: string | number;
  name: string;
  label?: string;
  placeholder?: string;
  data?: Array<any>;
  isErrorField?: boolean;
}

export const PickerControlled = (props: PickerProps) => {
  const {
    controller,
    dropdownIconColor,
    label,
    isErrorField,
    name,
    data,
    ...restProps
  } = props;
  return (
    <Controller
      control={controller}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <>
            {label && <Text style={styles.textLabel}>{label}</Text>}
            <Picker
              style={styles.picker}
              dropdownIconColor={dropdownIconColor}
              selectedValue={value}
              onValueChange={val => onChange(val)}
              {...restProps}>
              <Picker.Item label={props.placeholder} value="" />
              {data?.map(element => (
                <Picker.Item label={element} value={element} key={element} />
              ))}
            </Picker>
            {isErrorField && error && (
              <Text style={styles.textError}>{error?.message}</Text>
            )}
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    color: '#9FA5AA',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    marginVertical: '1%',
    paddingLeft: '4%',
  },
  textError: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    fontSize: rf(1.5),
    color: '#ff6666',
    paddingVertical: '0.5%',
    marginRight: '12%',
  },
  textLabel: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: rf(1.8),
    color: '#666666',
    paddingVertical: '0.5%',
    marginLeft: '14%',
  },
});
