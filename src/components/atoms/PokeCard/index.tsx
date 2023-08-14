import {Image, Pressable, PressableProps, StyleSheet} from 'react-native';
import React from 'react';
import {MainText, MainView} from '../MainComponent';
import {generalStyles} from '@constants/styles';
import Colors from '@constants/colors';

interface Iprops {
  avatar?: string;
  name?: string;
  order?: number;
  onPress: PressableProps['onPress'];
}
const PokeCard = (props: Iprops) => {
  return (
    <Pressable style={styles.card} onPress={props?.onPress}>
      <MainText alignSelf={'flex-end'}>
        {'#' + props?.order?.toString().padStart(3, '0') ?? ''}
      </MainText>
      <MainView style={styles.container}>
        <Image source={{uri: props?.avatar ?? ''}} width={100} height={100} />
        <MainText type={'Regular'} paddingTop={16} fontSize={16}>
          {props?.name}
        </MainText>
      </MainView>
    </Pressable>
  );
};

export {PokeCard};

const styles = StyleSheet.create({
  card: {
    ...generalStyles?.shadowProp,
    borderRadius: 20,
    backgroundColor: Colors.white,
    margin: 8,
    padding: 12,
    width: '46%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
  },
});
