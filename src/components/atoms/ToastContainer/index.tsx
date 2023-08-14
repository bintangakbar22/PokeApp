import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {STATUSBAR_HEIGHT} from '@constants/functional';
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ToastConfigParams} from 'react-native-toast-message';
// import IconCloseWhite from '@assets/svg/ic_close_white.svg';
// import IconCloseBlack from '@assets/svg/ic_close_black.svg';

const ToastContainer: FC<ToastConfigParams<any>> = props => {
  if (props?.isVisible) {
    return (
      <View
        style={[
          styles.toastContainer,
          {
            backgroundColor:
              props.type === 'error'
                ? Colors.danger.base
                : props.type === 'warning'
                ? Colors.orange.base
                : Colors.success.light1,
          },
        ]}>
        <Text
          style={[
            styles.toastTitle,
            {
              color:
                props.type === 'warning'
                  ? Colors.dark.neutral100
                  : Colors.white,
            },
          ]}>
          {props.text1}
        </Text>
        {/* <TouchableOpacity
            onPress={() => {
              props?.onPress?.();
              props.hide?.();
            }}>
            {props?.type === 'warning' ? (
              <IconCloseBlack width={24} height={24} />
            ) : (
              <IconCloseWhite width={24} height={24} />
            )}
          </TouchableOpacity> */}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: STATUSBAR_HEIGHT,
  },
  gestureHandlerStyle: {
    flex: 1,
  },
  toastContainer: {
    position: 'absolute',
    zIndex: 999,
    bottom: -24,
    right: 16,
    left: 16,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.success.light1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toastTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black,
  },
});

export {ToastContainer};
