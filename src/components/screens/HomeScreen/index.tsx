import {FlatList} from 'react-native';
import React from 'react';
import {Header, LoadingIndicator, MainView, PokeCard} from '@components/atoms';
import Colors from '@constants/colors';
import {useHomeScreen} from './useHomeScreen';
import {generalStyles} from '@constants/styles';

const HomeScreen = () => {
  const {navigation, __onEndReached, data, isLoading} = useHomeScreen();

  return (
    <MainView flex={1} backgroundColor={Colors.primary.base}>
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
          keyExtractor={item => `${item.id} ${Math.random()}`}
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
      {isLoading ? <LoadingIndicator /> : null}
    </MainView>
  );
};

export {HomeScreen};
