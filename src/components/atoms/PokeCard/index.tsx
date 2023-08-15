import {Pressable, PressableProps, StyleSheet} from 'react-native';
import React from 'react';
import {MainText, MainView} from '../MainComponent';
import {generalStyles} from '@constants/styles';
import Colors from '@constants/colors';
import FastImage from 'react-native-fast-image';

interface Iprops {
  avatar?: string;
  name?: string;
  order?: number;
  onPress: PressableProps['onPress'];
  isSelected?: boolean;
}
const PokeCard = (props: Iprops) => {
  return (
    <Pressable
      style={[
        styles.card,
        props?.isSelected ? styles.cardSelected : styles.card,
      ]}
      onPress={props?.onPress}>
      <MainText
        alignSelf={'flex-end'}
        color={props?.isSelected ? Colors.white : Colors.dark.neutral100}>
        {'#' + props?.order?.toString().padStart(3, '0') ?? ''}
      </MainText>
      <MainView
        style={styles.container}
        backgroundColor={
          props?.isSelected ? Colors.dark.neutral100 : Colors.white
        }>
        <FastImage source={{uri: props?.avatar ?? ''}} style={styles.image} />
        <MainText
          type={'Regular'}
          paddingTop={16}
          fontSize={16}
          color={props?.isSelected ? Colors.white : Colors.dark.neutral100}>
          {props?.name ?? ''}
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
  cardSelected: {
    backgroundColor: Colors.dark.neutral100,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});
