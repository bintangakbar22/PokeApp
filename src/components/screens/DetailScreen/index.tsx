import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {Header, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import {useDetailScreen} from './useDetailScreen';

const DetailScreen = () => {
  const {navigation} = useDetailScreen();
  return (
    <MainView flex={1} backgroundColor={Colors.primary.base}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={Colors.primary.base}
      />
      <Header
        label="Pokemon App"
        backgroundColor={Colors.primary.base}
        subLabel={'M Bintang Al Akbar'}
        withoutBackButton
      />
    </MainView>
  );
};

export {DetailScreen};

const styles = StyleSheet.create({});
