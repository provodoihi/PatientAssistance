import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, Image, BackHandler, Alert} from 'react-native';
import {AppNavigationProps} from '../../../navigation/routes';
import {Button, ListItem, HeaderBar} from '../../../components';
import {styles} from './styles';
import {useBackHandler} from '../../../utils';
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
      const getData = () => {
        setToken(authStore.token);
        if (userStore.fullname) {
          authStore.updateFullname(userStore.fullname);
        }
        setFullname(authStore.fullname);
        setRole(authStore.role);
        setUid(authStore.userID);
      };
      getData();
    }, [
      authStore,
      authStore.role,
      authStore.token,
      authStore.userID,
      userStore.fullname,
    ]);

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

    const backAction = useCallback(() => {
      Alert.alert('Notification', 'Are you sure to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            authStore.signOut();
            BackHandler.exitApp();
          },
        },
      ]);
    }, [authStore]);

    useBackHandler(backAction);

    return (
      <View style={styles.container}>
        <HeaderBar text="Dashboard" isBack={false} />
        <View style={styles.container2}>
          <View style={styles.topScreen}>
            <Text style={[styles.textAlignLeft, styles.textBigBoldWhite]}>
              Welcome {authStore.fullname}
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text
                  style={[styles.textAlignCenter, styles.txtNormalBoldWhite]}>
                  Have a nice day
                </Text>
                <Button
                  style={styles.buttonSmall}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Profile')}
                  text="View my profile"
                  textStyle={[styles.textAlignCenter, styles.textSmallWhite]}
                />
              </View>
              <Image style={styles.image} source={pic_healthCare256} />
            </View>
          </View>

          <View style={styles.midScreen}>
            <Text style={[styles.textAlignLeft, styles.textBigBoldBlack]}>
              What will you do?
            </Text>
            <ListItem
              style={[styles.buttonNoColor, styles.shadowGray]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Location')}
              isMultipleAtrribute={false}
              imageSource={pic_locationIcon}>
              <Text
                style={[styles.textAlignCenter, styles.textNormalPlusBlack]}>
                Find Hospital Clinic
              </Text>
            </ListItem>
            <ListItem
              style={[styles.buttonNoColor, styles.shadowGray]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Appointment')}
              isMultipleAtrribute={false}
              imageSource={pic_timesheet}>
              <Text
                style={[styles.textAlignCenter, styles.textNormalPlusBlack]}>
                Appointment
              </Text>
            </ListItem>
            <ListItem
              style={[styles.buttonNoColor, styles.shadowGray]}
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
              <Text
                style={[styles.textAlignCenter, styles.textNormalPlusBlack]}>
                Health Advice
              </Text>
            </ListItem>
            <ListItem
              style={[styles.buttonNoColor, styles.shadowGray]}
              activeOpacity={0.8}
              isMultipleAtrribute={false}
              imageSource={pic_edit}>
              <Text
                style={[styles.textAlignCenter, styles.textNormalPlusBlack]}>
                Update Soon
              </Text>
            </ListItem>
          </View>
        </View>
      </View>
    );
  },
);
