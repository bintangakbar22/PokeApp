/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastContainer} from '../ToastContainer';
import Colors from '@constants/colors';
import {DetailScreen, SplashScreen} from '@components/screens';
import BottomTabNavigatior from './BottomTab';
const Stack = createStackNavigator<ParamList>();
type NavigatorProps = {
  showAPILog?: boolean;
};

export const Navigator: React.FC<NavigatorProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
      <Stack.Screen name={'DetailScreen'} component={DetailScreen} />
      <Stack.Screen
        name={'BottomTabNavigator'}
        component={BottomTabNavigatior}
      />
    </Stack.Navigator>
  );
};

export const RouteApp = () => {
  const toastConfig = {
    success: (props: any) => <ToastContainer {...props} />,
    error: (props: any) => <ToastContainer {...props} type="error" />,
    warning: (props: any) => <ToastContainer {...props} type="warning" />,
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={Colors.primary.base}
      />
      <GestureHandlerRootView style={styles.gestureHandlerStyle}>
        <NavigationContainer>
          <Navigator />
          <Toast
            config={toastConfig}
            position={'bottom'}
            visibilityTime={3000}
          />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  gestureHandlerStyle: {
    flex: 1,
  },
});
