import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, MainText, MainView, PokeCard} from '@components/atoms';
import Colors from '@constants/colors';
import {useHomeScreen} from './useHomeScreen';
import {generalStyles} from '@constants/styles';

const HomeScreen = () => {
  const {navigation, listStore, __onEndReached, data} = useHomeScreen();

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
      <MainView borderTopRightRadius={10} borderTopLeftRadius={20} padding={16}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          contentContainerStyle={generalStyles.contentCenter}
          keyExtractor={(_, _id): any => _id}
          onEndReached={__onEndReached}
          renderItem={({item, index}) => (
            <PokeCard
              avatar={item?.avatar}
              name={item?.name}
              order={index + 1}
              onPress={() => {
                navigation.navigate('DetailScreen', {id: item?.id});
              }}
            />
          )}
        />
      </MainView>
    </MainView>
  );
};

export {HomeScreen};

const styles = StyleSheet.create({});
