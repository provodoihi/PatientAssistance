import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Image, BackHandler, Alert} from 'react-native';
import {AppNavigationProps} from '../../../navigation/routes';
import {Button, ListItem, HeaderBar} from '../../../components';
import {styles} from './styles';
import {useBackHandler} from '../../../utils';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
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
    const {t} = useTranslation();
    const {authStore, userStore} = useStores();

    // get user basic data
    const getData = useCallback(() => {
      setToken(authStore.token);
      if (userStore.fullname) {
        authStore.updateFullname(userStore.fullname);
      }
      setFullname(authStore.fullname);
      setRole(authStore.role);
      setUid(authStore.userID);
    }, [authStore, userStore.fullname]);
    useEffect(() => {
      getData();
    }, [getData]);

    // change the screen route for corresponding user role
    useEffect(() => {
      switch (role) {
        case 'ROLE_PATIENT':
          navigation.navigate('Clinic', {
            token: token,
            name: fullname,
            role: role,
            userID: uid,
          });
          break;
        case 'ROLE_ADMIN':
          navigation.navigate('Admin', {
            token: token,
            name: fullname,
            role: role,
            userID: uid,
          });
          break;
        case 'ROLE_ADVISOR':
          navigation.navigate('Advisor', {
            token: token,
            name: fullname,
            role: role,
            userID: uid,
          });
          break;
        default:
          break;
      }
    }, [fullname, navigation, role, token, uid]);

    const backAction = () => {
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
    };

    useBackHandler(backAction);

    return (
      <View style={styles.container}>
        <HeaderBar text={t('common.dashboard')} isBack={false} />
        <View style={styles.container2}>
          <View style={styles.topScreen}>
            <Text style={[styles.textAlignLeft, styles.textBigBoldWhite]}>
              {`${t('common.welcome')} ${authStore.fullname}`}
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text
                  style={[styles.textAlignCenter, styles.txtNormalBoldWhite]}>
                  {t('homeScreen.haveNiceDay')}
                </Text>
                <Button
                  style={styles.buttonSmall}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Profile')}
                  text={t('homeScreen.viewMyProfile')}
                  textStyle={[styles.textAlignCenter, styles.textSmallWhite]}
                />
              </View>
              <Image style={styles.image} source={pic_healthCare256} />
            </View>
          </View>

          <View style={styles.midScreen}>
            <Text style={[styles.textAlignLeft, styles.textBigBoldBlack]}>
              {t('homeScreen.whatWillYouDo')}
            </Text>
            <ListItem
              style={[styles.buttonNoColor, styles.shadowGray]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Location')}
              isMultipleAtrribute={false}
              imageSource={pic_locationIcon}>
              <Text
                style={[styles.textAlignCenter, styles.textNormalPlusBlack]}>
                {t('homeScreen.findHealthFacilities')}
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
                {t('common.appointment')}
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
                {t('common.healthAdvice')}
              </Text>
            </ListItem>
            <ListItem
              style={[styles.buttonNoColor, styles.shadowGray]}
              activeOpacity={0.8}
              isMultipleAtrribute={false}
              imageSource={pic_edit}>
              <Text
                style={[styles.textAlignCenter, styles.textNormalPlusBlack]}>
                {t('common.updateSoon')}
              </Text>
            </ListItem>
          </View>
        </View>
      </View>
    );
  },
);
