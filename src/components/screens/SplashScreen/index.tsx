import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header, MainView} from '@components/atoms';
import Pokoicon from '@assets/svg/pokeball.svg';
const SplashScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SplashScreen'>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('BottomTabNavigator');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <MainView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary.base}
        barStyle={'dark-content'}
      />
      <Header backgroundColor={Colors.primary.base} withoutBackButton />
      <Pokoicon width={160} height={160} />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Pokemon App</Text>
        <Text style={styles.copyright}>
          © 2023 Pokemon App. All Rights Reserved.
        </Text>
      </View>
    </MainView>
  );
};

export {SplashScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.base,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    color: Colors.white,
    textTransform: 'uppercase',
    lineHeight: 16.2,
    textAlign: 'center',
    paddingBottom: 16,
  },
  copyright: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    color: Colors.white,
    textTransform: 'uppercase',
    lineHeight: 16.2,
    textAlign: 'center',
    letterSpacing: -0.12,
    opacity: 0.5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 16,
  },
});
