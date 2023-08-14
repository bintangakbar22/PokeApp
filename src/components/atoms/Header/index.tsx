import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './style';
import ArrowLeft from '@assets/svg/arrow_left.svg';
import {NavigationContext} from '@react-navigation/native';
import Colors from '@constants/colors';
import Pokoicon from '@assets/svg/pokeball.svg';
import {MainView} from '../MainComponent';

type Props = {
  label?: string;
  labelContent?: React.ReactNode;
  subLabel?: string | boolean | any;
  styleLabel?: StyleProp<TextStyle>;
  styleSubLabel?: StyleProp<TextStyle>;
  iconLeft?: any;
  styleIconLeft?: any;
  onPressIconLeft?: () => void;
  iconRight?: any;
  styleIconRight?: any;
  styleContainer?: StyleProp<ViewStyle>;
  onPressIconRight?: () => void;
  paddingHorizontal?: number;
  colorLabel?: any;
  subLabelContent?: React.ReactNode;
  backgroundColor?: string;
  withoutBackButton?: boolean;
};

const Header = ({
  label,
  subLabel,
  styleLabel,
  styleSubLabel,
  iconLeft,
  styleIconLeft,
  onPressIconLeft,
  iconRight,
  styleIconRight,
  styleContainer,
  onPressIconRight,
  paddingHorizontal = 16,
  subLabelContent,
  labelContent,
  colorLabel = Colors.white,
  backgroundColor = Colors.white,
  withoutBackButton = false,
}: Props) => {
  const navigation: any = React.useContext(NavigationContext);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: paddingHorizontal,
        backgroundColor: backgroundColor,
      }}>
      <View style={[styles.container, styleContainer]}>
        <TouchableOpacity
          onPress={
            onPressIconLeft
              ? onPressIconLeft
              : () => {
                  navigation.pop();
                }
          }>
          {!withoutBackButton ? (
            iconLeft ? (
              iconLeft
            ) : (
              <ArrowLeft width={18} height={18} style={styleIconLeft} />
            )
          ) : null}
        </TouchableOpacity>

        <View style={styles.labelContainer}>
          {label ? (
            <>
              {label && (
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={[styleLabel, styles.label, {color: colorLabel}]}>
                  {label}
                </Text>
              )}
              {subLabel ? (
                <Text
                  allowFontScaling={false}
                  style={[styleSubLabel, styles.subLabel, {color: colorLabel}]}>
                  {subLabel}
                </Text>
              ) : null}
              {subLabelContent}
            </>
          ) : null}
        </View>
        <Pokoicon width={24} height={24} />
      </View>
    </SafeAreaView>
  );
};

export {Header};
