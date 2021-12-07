import React, {useEffect, useState} from 'react';
import {Text, View, Image, BackHandler, Alert} from 'react-native';
import {AppNavigationProps} from '../../../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, ListItem, HeaderBar} from '../../../components';
import {styleHomeScreen as style} from './style';
import {observer} from 'mobx-react-lite';
import {
  pic_locationIcon,
  pic_timesheet,
  pic_healthBook,
  pic_edit,
  pic_healthCare256,
} from '../../../../assets';
import {useStores} from '../../../models';

export const HomeScreen = observer(
  ({navigation}: AppNavigationProps<'Home'>) => {
    const [fullname, setFullname] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [uid, setUid] = useState<string | number>('');

    const {authStore, userStore} = useStores();
    useEffect(() => {
      const getData = async () => {
        try {
          setToken(authStore.token);
          setFullname(userStore.fullname);
          setRole(authStore.role);
          setUid(authStore.userID);
        } catch (error) {}
      };
      getData();
    }, [authStore.role, authStore.token, authStore.userID, userStore.fullname]);

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
          <View style={style.topScreen}>
            <Text style={[style.textAlignLeft, style.textBigBoldWhite]}>
              Welcome{' '}
              {userStore.fullname ? authStore.fullname : userStore.fullname}
            </Text>
            <View style={style.row}>
              <View style={style.column}>
                <Text style={[style.textAlignCenter, style.txtNormalBoldWhite]}>
                  Have a nice day
                </Text>
                <Button
                  style={style.buttonSmall}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Profile')}
                  text="View my profile"
                  textStyle={[style.textAlignCenter, style.textSmallWhite]}
                />
              </View>
              <Image style={style.image} source={pic_healthCare256} />
            </View>
          </View>

          <View style={style.midScreen}>
            <Text style={[style.textAlignLeft, style.textBigBoldBlack]}>
              What will you do?
            </Text>
            <ListItem
              style={[style.buttonNoColor, style.shadowGray]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Location')}
              isMultipleAtrribute={false}
              imageSource={pic_locationIcon}>
              <Text style={[style.textAlignCenter, style.textNormalPlusBlack]}>
                Find Hospital Clinic
              </Text>
            </ListItem>
            <ListItem
              style={[style.buttonNoColor, style.shadowGray]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Appointment')}
              isMultipleAtrribute={false}
              imageSource={pic_timesheet}>
              <Text style={[style.textAlignCenter, style.textNormalPlusBlack]}>
                Appointment
              </Text>
            </ListItem>
            <ListItem
              style={[style.buttonNoColor, style.shadowGray]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('HealthAdvisor', {
                  token: token,
                  name: fullname,
                  role: role,
                })
              }
              isMultipleAtrribute={false}
              imageSource={pic_healthBook}>
              <Text style={[style.textAlignCenter, style.textNormalPlusBlack]}>
                Health Advice
              </Text>
            </ListItem>
            <ListItem
              style={[style.buttonNoColor, style.shadowGray]}
              activeOpacity={0.8}
              isMultipleAtrribute={false}
              imageSource={pic_edit}>
              <Text style={[style.textAlignCenter, style.textNormalPlusBlack]}>
                Update Soon
              </Text>
            </ListItem>
          </View>
        </View>
      </View>
    );
  },
);
