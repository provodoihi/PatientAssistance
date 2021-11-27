import React, {useEffect, useState} from 'react';
import {Text, View, Image, BackHandler, Alert} from 'react-native';
import {AppNavigationProps} from '../../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, ListItem, HeaderBar} from '../../components';
import {commonScreenStyle as style} from './style';
import {
  pic_locationIcon,
  pic_timesheet,
  pic_healthBook,
  pic_edit,
  pic_healthCare256,
} from '../../../assets';

export const HomeScreen = ({navigation}: AppNavigationProps<'Home'>) => {
  const [fullname, setFullname] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [uid, setUid] = useState<string | number>('');
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        const value2 = await AsyncStorage.getItem('name');
        const value3 = await AsyncStorage.getItem('role');
        const value4 = await AsyncStorage.getItem('userID');
        if (value !== null) {
          setToken(value);
        }
        if (value2 !== null) {
          setFullname(value2);
        }
        if (value3 !== null) {
          setRole(value3);
        }
        if (value4 !== null) {
          setUid(value4);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  // change the screen route for corresponding user role
  useEffect(() => {
    if (role === 'ROLE_PATIENT') {
    } else if (role === 'ROLE_CLINIC') {
      navigation.navigate('Clinic', {
        token: token,
        name: fullname,
        role: role,
        userID: uid,
      });
    } else if (role === 'ROLE_ADMIN') {
      navigation.navigate('Admin', {
        token: token,
        name: fullname,
        role: role,
        userID: uid,
      });
    } else if (role === 'ROLE_ADVISOR') {
      navigation.navigate('Advisor', {
        token: token,
        name: fullname,
        role: role,
        userID: uid,
      });
    }
  }, [fullname, navigation, role, token, uid]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Notification', 'Are you sure to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => {
            await AsyncStorage.clear();
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={style.container}>
      <HeaderBar text="Dashboard" isBack={false} />
      <View style={style.container2}>
        <View style={style.topHomeScreen}>
          <Text style={[style.txt, style.txtWelcomeHomeScreen]}>
            Welcome {fullname}
          </Text>
          <View style={style.row}>
            <View style={style.div1}>
              <Text style={[style.txt, style.txtBoldWhite]}>
                Have a nice day
              </Text>
              <Button
                style={style.buttonSmall}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Profile', {
                    token: token,
                    name: fullname,
                    role: role,
                  })
                }
                text="View my profile"
                textStyle={[style.txt, style.txtNormalSmallWhite]}
              />
            </View>
            <Image style={style.img} source={pic_healthCare256} />
          </View>
        </View>

        <View style={style.midHomeScreen}>
          <Text style={style.txtMidHomeScreen}>What will you do?</Text>
          <ListItem
            style={[style.buttonNoColor, style.shadowGray]}
            activeOpacity={0.8}
            isMultipleAtrribute={false}
            onPress={() => navigation.navigate('Location')}
            imageSource={pic_locationIcon}>
            <Text style={[style.txt, style.txtNormalBlack]}>
              Find Hospital Clinic
            </Text>
          </ListItem>
          <ListItem
            style={[style.buttonNoColor, style.shadowGray]}
            activeOpacity={0.8}
            isMultipleAtrribute={false}
            onPress={() =>
              navigation.navigate('Appointment', {
                token: token,
                name: fullname,
                role: role,
              })
            }
            imageSource={pic_timesheet}>
            <Text style={[style.txt, style.txtNormalBlack]}>Appointment</Text>
          </ListItem>
          <ListItem
            style={[style.buttonNoColor, style.shadowGray]}
            activeOpacity={0.8}
            isMultipleAtrribute={false}
            onPress={() =>
              navigation.navigate('HealthAdvisor', {
                token: token,
                name: fullname,
                role: role,
              })
            }
            imageSource={pic_healthBook}>
            <Text style={[style.txt, style.txtNormalBlack]}>Health Advice</Text>
          </ListItem>
          <ListItem
            style={[style.buttonNoColor, style.shadowGray]}
            activeOpacity={0.8}
            imageSource={pic_edit}>
            <Text style={[style.txt, style.txtNormalBlack]}>Update Soon</Text>
          </ListItem>
        </View>
      </View>
    </View>
  );
};
