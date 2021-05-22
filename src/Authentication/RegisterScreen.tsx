import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {API_List} from '../API/apiList';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {AuthNavigationProps} from '../navigation/Routes';
import {Picker} from '@react-native-picker/picker';

const LoginScreen = ({navigation}: AuthNavigationProps<'Register'>) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const role = 'patient';

  const signupData = {
    username: username,
    email: email,
    password: pass,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    address: address,
    sex: sex,
    age: age,
    role: [role],
  };

  const signUp = () => {
    if (
      email === '' ||
      pass === '' ||
      username === '' ||
      firstname === '' ||
      lastname === '' ||
      phone === '' ||
      address === '' ||
      age === ''
    ) {
      Alert.alert('Notification', 'Please fill sign up details', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      axios
        .post(API_List.signup, signupData)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .then(() => navigation.navigate('SignupSuccess'))
        .catch(() => {
          Alert.alert(
            'Notification',
            'There is some problem in your sign up details',
            [
              {
                text: 'OK',
                onPress: () => null,
                style: 'cancel',
              },
            ],
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.roll}>
        <Text style={styles.txtHead}>Sign Up</Text>
        <Text style={[styles.txt, styles.txtDescribe]}>
          Enter your sign up details to register your new account
        </Text>

        <TextInput
          style={styles.txtInput}
          onChangeText={username => {
            setUsername(username);
          }}
          value={username}
          placeholder="Username"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={email => {
            setEmail(email);
          }}
          value={email}
          placeholder="Email"
          placeholderTextColor="#9FA5AA"
          keyboardType="email-address"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={pass => {
            setPass(pass);
          }}
          value={pass}
          placeholder="Password"
          placeholderTextColor="#9FA5AA"
          secureTextEntry={true}
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={firstname => {
            setFirstname(firstname);
          }}
          value={firstname}
          placeholder="Firstname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={lastname => {
            setLastname(lastname);
          }}
          value={lastname}
          placeholder="Lastname"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />

        <TextInput
          style={styles.txtInput}
          onChangeText={phone => {
            setPhone(phone);
          }}
          value={phone}
          placeholder="Phone"
          placeholderTextColor="#9FA5AA"
          keyboardType="phone-pad"
          multiline={false}
        />

        <TextInput
          style={styles.txtInput}
          onChangeText={address => {
            setAddress(address);
          }}
          value={address}
          placeholder="Address"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />

        <TextInput
          style={styles.txtInput}
          onChangeText={age => {
            setAge(age);
          }}
          value={age}
          placeholder="Age"
          placeholderTextColor="#9FA5AA"
          multiline={false}
          maxLength={3}
          keyboardType="number-pad"
        />
        <Picker
          onValueChange={value => setSex(value)}
          selectedValue={sex}
          style={styles.pick}
          dropdownIconColor="#9FA5AA">
          <Picker.Item label="Choose gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={signUp}>
          <Text style={[styles.txt, styles.txtButton]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.txt, styles.txtNavigate]}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  roll: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  img: {
    margin: 15,
  },

  txt: {
    margin: '1.5%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHead: {
    padding: '2%',
    fontSize: rf(2.8),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtNavigate: {
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
  },

  txtDescribe: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  txtButton: {
    fontSize: rf(2.6),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

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
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 25,
  },

  pick: {
    color: '#9FA5AA',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});

export default LoginScreen;
