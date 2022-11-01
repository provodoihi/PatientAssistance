import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TextStyle,
  StyleProp,
  ColorValue,
  View,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {Controller, Control} from 'react-hook-form';
import {palette, scale} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

export interface CustomPickerProps extends TextInputProps {
  controller?: Control<any>;
  style?: StyleProp<TextStyle>;
  styleModal?: StyleProp<TextStyle>;
  dropdownIconColor?: number | ColorValue;
  defaultValue?: string;
  placeholderTextColor?: string;
  onValueChange?: (item: string) => void;
  selectedValue?: string;
  name: string;
  label?: string;
  placeholder?: string;
  data: Array<any>;
  isErrorField?: boolean;
}

export const CustomPickerControlled = (props: CustomPickerProps) => {
  const {
    controller,
    dropdownIconColor,
    placeholderTextColor,
    defaultValue,
    label,
    isErrorField,
    name,
    data,
    style,
    styleModal,
    placeholder,
    ...restProps
  } = props;
  const [isVisible, setVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setVisible(!isVisible);
  };
  return (
    <Controller
      control={controller}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <>
            {label && <Text style={styles.textLabel}>{label}</Text>}
            <View style={styles.picker}>
              <TextInput
                style={StyleSheet.flatten([styles.txtInput, style])}
                placeholder={placeholder}
                editable={false}
                value={value}
                placeholderTextColor={placeholderTextColor}
                defaultValue={defaultValue}
                {...restProps}
              />
              <AntDesign
                name="caretdown"
                size={16}
                style={styles.dropdownIcon}
                color={dropdownIconColor}
                onPress={toggleModal}
              />
            </View>
            {isErrorField && error && (
              <Text style={styles.textError}>{error?.message}</Text>
            )}
            <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
              <View style={StyleSheet.flatten([styles.modal, styleModal])}>
                {data.map((element, index) => (
                  <TouchableOpacity
                    key={`${element}-${index}`}
                    style={styles.itemContainer}
                    onPress={() => {
                      onChange(element);
                      toggleModal();
                    }}>
                    <Text style={styles.textItem}>{element}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
};

export const PickerWithTicker = (props: CustomPickerProps) => {
  const {
    controller,
    dropdownIconColor,
    placeholderTextColor,
    defaultValue,
    label,
    isErrorField,
    name,
    data,
    style,
    styleModal,
    placeholder,
    onValueChange,
    selectedValue,
    ...restProps
  } = props;
  const [isVisible, setVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setVisible(!isVisible);
  };
  return (
    <Controller
      control={controller}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <>
            {label && <Text style={styles.textLabel}>{label}</Text>}
            <View style={styles.picker}>
              <TextInput
                style={StyleSheet.flatten([styles.txtInput, style])}
                placeholder={placeholder}
                editable={false}
                value={value}
                placeholderTextColor={placeholderTextColor}
                defaultValue={defaultValue}
                {...restProps}
              />
              <AntDesign
                name="caretdown"
                size={16}
                style={styles.dropdownIcon}
                color={dropdownIconColor}
                onPress={toggleModal}
              />
            </View>
            {isErrorField && error && (
              <Text style={styles.textError}>{error?.message}</Text>
            )}
            <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
              <View style={StyleSheet.flatten([styles.modal, styleModal])}>
                {data.map((element, index) => (
                  <View style={styles.tickerWrapper}>
                    <TouchableOpacity
                      key={`${element}-${index}`}
                      style={styles.itemContainer}
                      onPress={() => {
                        onChange(element);
                        onValueChange(element);
                        toggleModal();
                      }}>
                      <Text style={styles.textItem}>{element}</Text>
                    </TouchableOpacity>
                    {selectedValue === element ? (
                      <AntDesign
                        key={`${element}+${index}`}
                        name="check"
                        size={16}
                        color={palette.black}
                      />
                    ) : null}
                  </View>
                ))}
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    margin: '2%',
    marginVertical: '2%',
    paddingLeft: '4%',
  },
  tickerWrapper: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  txtInput: {
    fontSize: scale(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
    textAlign: 'left',
    paddingVertical: '2.5%',
    width: '65%',
  },
  textError: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    fontSize: scale(1.5),
    color: '#ff6666',
    paddingVertical: '0.5%',
    marginRight: '12%',
  },
  textLabel: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: scale(1.8),
    color: '#666666',
    paddingVertical: '0.5%',
    marginLeft: '14%',
  },
  textItem: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: scale(1.8),
    color: '#4c4c4c',
    paddingVertical: '1.5%',
  },
  dropdownIcon: {
    marginRight: '4%',
  },
  modal: {
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginHorizontal: '3%',
    marginVertical: '2.5%',
    borderBottomColor: '#666666',
    width: '80%',
  },
});
