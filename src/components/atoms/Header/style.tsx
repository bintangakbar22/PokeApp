import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontWeight: '600',
    width: '100%',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
    color: Colors.white,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  subLabel: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  icon: {
    height: 15,
    width: 15,
  },
});
