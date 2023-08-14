import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import moment, {duration} from 'moment';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import Toast, {ToastShowParams} from 'react-native-toast-message';

export const kelasPintarWhatsappLink =
  'https://api.whatsapp.com/send/?phone=6281513003999&text=Hi+Kelas+Pintar%21+Saya+butuh+penjelasan+mengenai...&type=phone_number&app_absent=0';
const shortDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];
const months = [
  'Januari',
  'Febuari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Okttober',
  'November',
  'Desember',
];

export const listFileImageExtension = [
  'jpg',
  'JPG',
  'jpeg',
  'JPEG',
  'png',
  'PNG',
  'bmp',
  'BMP',
  'gif',
  'GIF',
];

export const lisFileSvgExtension = ['svg', 'SVG'];

export const size1Kb = 1024 * 1024;
export const limitFileInMb = 200; // max size upload for file
export const limitImageInMb = 20; // max size upload for image
export const maximalLimitFile = size1Kb * limitFileInMb;
export const maximalLimitImage = size1Kb * limitImageInMb;

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const fmcToken =
  'eO_2s1AyHLf-PjqqnKxR5p:APA91bH5jRxJv9vGXzLjo0FU9_7M1WhG5ezeK_JG-JsQNQO-oUl-on2_xd4rwo5qqtThlg8Ou_azmShqEx21kAk3wRoO71HZ2PNRm3eao_xgNPX5azahGMqEhGEQiPaVxWo-yIECbtFw';
export const regexOnlyNumber = /[^0-9]/g;
export const regexPhoneNumber = /[+][^0-9]/g;
export const regexFullName = /^(?=.*[^a-zA-Z ]).*$/;
export const regexContainLowerUpperCase = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
export const regexContainNumber = /^(?=.*[0-9]).*$/;
export const regexPrefixPhoneNumber = /^(08|02|62)\d{10,14}$/;
export const regexPhoneStart62 = /^(?=.*(62)\d)(?=.*[0-9]).*$/;
export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const regexPhoneIndonesia = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

export const useMergeState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: any) =>
    setState((prevState: any) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
};

export const _handlerGetItem = (params: any) => {
  try {
    return AsyncStorage?.getItem(params);
  } catch (error) {}
};

export const _handlerSetItem = async (key: any, value: any, callback?: any) => {
  try {
    await AsyncStorage.setItem(key, value, callback);
  } catch (error) {}
};

export const _handlerRemoveItem = async (params: any) => {
  try {
    await AsyncStorage.removeItem(params);
  } catch (error) {}
};

export const _handlerClearItem = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};

export const EncryptMD5 = (text: string) => {
  try {
    const CryptoJS = require('crypto-js');
    const cipher = CryptoJS.MD5(text);

    return cipher.toString();
  } catch (error) {
    return false;
  }
};

export const _handlerCapitalizeFirstLetter = (text: string) => {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1);
};

export const capitalizeEachWord = (text: string): string => {
  const words = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }

  return words.join(' ');
};

export const _handlerSubstringText = (text: string, maxLength = 80) => {
  const result =
    text && text?.length >= maxLength
      ? `${text?.substring(0, maxLength)}...`
      : text;

  return result;
};

export const _handlerGetCurrentDate = () => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const day = days[currentDate.getDay()];
  const month = shortMonths[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const result = `${day}, ${date} ${month} ${year}`;

  return result;
};

export const _handleUserTypeId = (user_type_id: number) => {
  switch (user_type_id) {
    case 1:
      return {
        id: user_type_id,
        name: 'Murid',
      };
    case 2:
      return {
        id: user_type_id,
        name: 'Orang tua',
      };
    case 3:
      return {
        id: user_type_id,
        name: 'Mentor',
      };
    case 4:
      return {
        id: user_type_id,
        name: 'Kepala Sekolah',
      };
    case 5:
      return {
        id: user_type_id,
        name: 'Guru Sekolah',
      };
    case 6:
      return {
        id: user_type_id,
        name: 'Admin Sekolah',
      };
    case 7:
      return {
        id: user_type_id,
        name: 'Admin Internal',
      };
    default:
      break;
  }
};

export const _handlerFormatBytes = (bytes: any, decimals = 2) => {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getDayInMonth = (year: any, month: any, date: any) => {
  const day = dayjs(`${year}-${month}-${date}`).day();
  return day;
};

export const _handlerConvertDatePicker = (
  dateValue: any,
  formatDate: any = 1,
) => {
  const hours =
    `${dateValue?.hour}`.length < 2 ? `0${dateValue?.hour}` : dateValue?.hour;
  const minutes =
    `${dateValue?.minute}`.length < 2
      ? `0${dateValue?.minute}`
      : dateValue?.minute;

  if (dateValue) {
    /* FormatDate */
    // 8.  "date/month/year" >>> "12/07/2022"
    // 9.  "year-month-date" >>> "2022-12-31"
    // 10. "day, date/month/year • hour:minute">>> Sen, 03/06/2023 • 22:10
    // 11. "year-month-date hour:minute:seconds">>> 2023-06-02 22:10:00
    // 12. "day, date month year • hour:minute" >>> "Sen, 19 Jun 2023 • 23:43"
    // 13. "year-month-date hour:minute:seconds" >>> "2023-06-01 15:50:00"

    switch (formatDate) {
      case 1:
        return `${dateValue?.date} ${shortMonths[dateValue?.month - 1]} ${
          dateValue?.year
        }`;
      case 2:
        return `${shortDays[dateValue?.day]}, ${dateValue?.date}/${
          dateValue?.month
        }/${dateValue?.year} • ${hours}:${minutes}`;
      case 3:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)} ${hours}:${minutes}:00`;
      case 4:
        return `${dateValue?.date} ${months[dateValue?.month - 1]} ${
          dateValue?.year
        }`;
      case 5:
        return `${dateValue?.year}-${dateValue?.month - 1}-${dateValue?.date}`;
      case 6:
        return `${dateValue?.date} ${shortMonths[dateValue?.month]} ${
          dateValue?.year
        }`;
      case 7:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)}`;
      case 8:
        return `${_handlerComplete2Digit(
          dateValue?.date,
        )}/${_handlerComplete2Digit(dateValue?.month)}/${dateValue?.year}`;
      case 9:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.date)}`;
      case 10:
        return `${shortDays[dateValue?.day]}, ${_handlerComplete2Digit(
          dateValue?.date,
        )}/${_handlerComplete2Digit(dateValue?.month + 1)}/${
          dateValue?.year
        } • ${hours}:${minutes}`;
      case 11:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month + 1,
        )}-${_handlerComplete2Digit(dateValue?.date)} ${hours}:${minutes}:00`;
      case 12:
        return `${shortDays[dateValue?.day]}, ${_handlerComplete2Digit(
          dateValue?.date,
        )} ${shortMonths[dateValue?.month - 1]} ${
          dateValue?.year
        } • ${hours}:${minutes}`;
      case 13:
        return `${dateValue?.year}-${_handlerComplete2Digit(
          dateValue?.month,
        )}-${_handlerComplete2Digit(dateValue?.day)} ${_handlerComplete2Digit(
          dateValue?.hour,
        )}:${_handlerComplete2Digit(
          dateValue?.minute,
        )}:${_handlerComplete2Digit(dateValue?.seconds || '00')}`;
    }
  }
  return '-';
};

export const _handlerConvertAllDate = (
  dateValue: any, // 2022-02-20T00:00:00.000Z || 20 2 2022 || 20-2-2022 || etc
  formatDate: any = 1, // default
  monthType: any = 2, // default
  dayType: any = 1, // default
) => {
  if (dateValue) {
    const currentTime = new Date(dateValue);
    const day =
      dayType == 1
        ? days[currentTime.getDay()]
        : dayType == 2
        ? shortDays[currentTime.getDay()]
        : _handlerComplete2Digit(currentTime.getDay());
    const date = _handlerComplete2Digit(currentTime.getDate());
    const month =
      monthType == 1
        ? months[currentTime.getMonth()]
        : monthType == 2
        ? shortMonths[currentTime.getMonth()]
        : _handlerComplete2Digit(currentTime.getMonth());
    const year = currentTime.getFullYear();
    const hours = _handlerComplete2Digit(currentTime.getHours());
    const minutes = _handlerComplete2Digit(currentTime.getMinutes());
    const seconds = _handlerComplete2Digit(currentTime.getSeconds());

    /* FormatDate */
    // 1. "date month year" >>> "30 Jan 2022"
    // 2. "day date month year" >>> "Senin 30 Jan 2022"
    // 3. "day, date month year" >>> "Senin, 30 Jan 2022"
    // 4. "date month year hours:minutes" >>> "30 Jan 2022 17:17"
    // 5. "month year" >>> "Jan 2022"
    // 6. "{date month year}" >>> "{date: 31, month: 4, year: 2022}"
    // 7. "day, date/month/year • hour:minute" >>> "Sel, 12/07/2022 • 09:30"
    // 8. "hour:minute" >>> "09:30"
    // 9. "day, date month year hours:minutes" >>> "Kamis, 30 Jan 2022 17:17"
    // 10. "date month year hours:minutes" >>> "30 Jan 2022 • 17:17"
    // 11. "day, date/month/year" >>> "Sel, 12/07/2022"
    // 12. "date-month-year hour:minute:second" >>> "31-07-2022 08:05:10"
    // 13. "date-month-year" >>> "12-07-2022"

    /* MonthType */
    // 1. monthType >>> Desember
    // 2. monthType >>> Dec
    // 3. monthType >>> 12

    /* DayType */
    // 1. dayType >>> Rabu
    // 2. dayType >>> Rab
    // 3. dayType >>> 4

    switch (formatDate) {
      case 1:
        return `${date} ${month} ${year}`;
      case 2:
        return `${day} ${date} ${month} ${year}`;
      case 3:
        return `${day}, ${date} ${month} ${year}`;
      case 4:
        return `${date} ${month} ${year} ${hours}:${minutes}`;
      case 5:
        return `${month} ${year}`;
      case 6:
        return {
          date: date,
          month: month,
          year: year,
        };
      case 7:
        return `${day}, ${date}/${month}/${year} • ${hours}:${minutes}`;
      case 8:
        return `${hours}:${minutes}`;
      case 9:
        return `${day}, ${date} ${month} ${year} ${hours}:${minutes}`;
      case 10:
        return `${date} ${month} ${year} • ${hours}:${minutes}`;
      case 11:
        return `${day}, ${date}/${month}/${year}`;
      case 12:
        return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      case 13:
        return `${date}-${month}-${year}`;
    }
  }
  return '-';
};

export const _handlerComplete2Digit = (text: any) => {
  const txt = `${text}`;
  return txt?.length == 1 ? `0${txt}` : txt;
};

export const GenerateUUID = () => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );

  return uuid;
};

export const _handlerRoleName = (user_type_id: number) => {
  /*
    USER_TYPE_ID
    1. Murid >> B2C B2B
    2. Orang Tua >> Ngikut anak
    3. Mentor
    4. Kepsek >> B2B B2G
    5. Guru >> B2B
    6. Admin >> B2B
  */

  if (user_type_id) {
    switch (user_type_id) {
      case 1:
        return 'Murid';
      case 2:
        return 'Orang Tua';
      case 3:
        return 'Mentor';
      case 4:
        return 'Kepala Sekolah';
      case 5:
        return 'Guru';
      case 6:
        return 'Admin';
    }
  }

  return false;
};

export const convertToRupiah = (number: any) => {
  let reverse, thousand;
  if (typeof number === 'number') {
    reverse = number?.toString().split('').reverse().join('');
    thousand = reverse?.match(/\d{1,3}/g);
    thousand = thousand?.join('.').split('').reverse().join('');
  } else if (typeof number === 'string') {
    reverse = number?.split('').reverse().join('');
    thousand = reverse?.match(/\d{1,3}/g);
    thousand = thousand?.join('.').split('').reverse().join('');
  }

  return thousand;
};

export const _handlerConvertTimeTrackerPlayer = (seconds: number | string) => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '00:';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};

export const convertDateTime = (x: string) => {
  const startMoment = moment(x);
  const formattedStart = startMoment.format('DD MMM YYYY • HH:mm');
  return formattedStart;
};

export const convertPhoneNumber = (phoneNumber: string): string => {
  let newPhoneNumber = phoneNumber.replace(/-/g, '').replace(' ', '');

  const prefix08 = ['08'];
  const prefix62 = ['628'];
  if (prefix08.includes(newPhoneNumber.slice(0, 2))) {
    newPhoneNumber = '+628' + newPhoneNumber.slice(2, newPhoneNumber.length);
  } else if (prefix62.includes(newPhoneNumber.slice(0, 3))) {
    newPhoneNumber = '+628' + newPhoneNumber.slice(3, newPhoneNumber.length);
  }

  return newPhoneNumber;
};

export const convertBetweenDateTime = (dateRange: string) => {
  const [startStr, endStr] = dateRange.split(' - ');

  const startTime = startStr?.substring(11, 16);
  const endTime = endStr?.substring(11, 16);
  const start = moment(startStr?.substring(0, 10)).format('DD-MM-YYYY');
  const currentDate = moment().format('DD-MM-YYYY');

  let dateRangeX;

  if (currentDate === start) {
    dateRangeX = 'Hari ini';
  } else {
    dateRangeX = moment(start).format('ddd, DD MMM');
  }
  const formattedDateRange = `${dateRangeX} • ${startTime} - ${endTime}`;
  return formattedDateRange;
};

export const iosCameraPermission = async (): Promise<boolean> => {
  const permissionType = PERMISSIONS.IOS.CAMERA;
  try {
    const result = await check(permissionType);
    let bool = false;

    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('kamera');
            break;
          case RESULTS.UNAVAILABLE:
            alertFeatureNotAvailable('kamera');
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('kamera');
        break;
      case RESULTS.UNAVAILABLE:
        alertFeatureNotAvailable('kamera');
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

const alertRedirectToSettings = (context?: 'kamera' | 'galeri' | string) => {
  Alert.alert(
    'Info⚠️',
    `Mohon untuk memberikan izin untuk mengakses ${
      context ?? 'galeri'
    } terlebih dahulu`,
    [
      {
        onPress: () =>
          openSettings().catch(e => console.log('error when open settings', e)),
        text: 'Buka Pengaturan',
      },
    ],
    {
      cancelable: true,
    },
  );
};

const alertFeatureNotAvailable = (context?: 'kamera' | 'galeri' | string) => {
  Alert.alert(
    'Info⚠️',
    `Fitur ${context ?? 'galeri'} tidak tersedia pada perangkat ini`,
    [
      {
        onPress: () => {},
        text: 'Mengerti',
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {},
    },
  );
};

export const androidAskWriteExternalStorage = async (): Promise<boolean> => {
  const permissionType = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  try {
    const result = await check(permissionType);
    let bool = false;
    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('foto dan media');

            break;
          case RESULTS.UNAVAILABLE:
            alertFeatureNotAvailable();
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('akses foto dan media');
        break;
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

export const iosPhotoGalleryPermission = async (): Promise<boolean> => {
  const permissionType = PERMISSIONS.IOS.PHOTO_LIBRARY;
  try {
    const result = await check(permissionType);

    let bool = false;

    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings();
            break;
          case RESULTS.UNAVAILABLE:
            alertFeatureNotAvailable();
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings();
        break;
      case RESULTS.UNAVAILABLE:
        alertFeatureNotAvailable();
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

export const recordAudioPermission = async () => {
  if (Platform.OS == 'android') {
    try {
      let bool = false;
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return (bool = true);
      } else {
        // console.log('All required permissions not granted');
        Alert.alert(
          'Info⚠️',
          'Mohon untuk memberikan izin untuk mengakses rekam suara terlebih dahulu',
          [
            {
              onPress: () => openSettings().catch(),
              text: 'Buka Pengaturan',
            },
          ],
          {
            cancelable: true,
          },
        );
        return bool;
      }
    } catch (err) {
      return false;
    }
  } else if (Platform.OS == 'ios') {
    try {
      const permissionType = PERMISSIONS.IOS.MICROPHONE;
      const result = await check(permissionType);

      let bool = false;

      switch (result) {
        case RESULTS.GRANTED:
          bool = true;
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permissionType);
          switch (requestResult) {
            case RESULTS.GRANTED:
              bool = true;
              break;
            case RESULTS.BLOCKED:
              alertRedirectToSettings();
              break;
            case RESULTS.UNAVAILABLE:
              alertFeatureNotAvailable();
              break;
            case RESULTS.LIMITED:
              break;
            case RESULTS.DENIED:
              break;
            default:
              break;
          }
          break;
        case RESULTS.BLOCKED:
          alertRedirectToSettings();
          break;
        case RESULTS.UNAVAILABLE:
          alertFeatureNotAvailable();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.DENIED:
          break;
        default:
          break;
      }
      return bool;
    } catch (e) {
      return false;
    }
  }
};

export const askGetContactPermission = async (): Promise<boolean> => {
  const permissionType =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.CONTACTS
      : PERMISSIONS.ANDROID.READ_CONTACTS;
  try {
    const result = await check(permissionType);
    let bool = false;
    switch (result) {
      case RESULTS.GRANTED:
        bool = true;
        break;
      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            bool = true;
            break;
          case RESULTS.BLOCKED:
            alertRedirectToSettings('kontak');
            break;
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            break;
          default:
            break;
        }
        break;
      case RESULTS.BLOCKED:
        alertRedirectToSettings('kontak');
        break;
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.DENIED:
        break;
      default:
        break;
    }
    return bool;
  } catch (e) {
    return false;
  }
};

export const _handlerCameraPermission = async () => {
  if (Platform.OS == 'android') {
    try {
      let bool = false;
      const grantedcamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
        return (bool = true);
      } else {
        Alert.alert(
          'Info⚠️',
          'Mohon untuk memberikan izin untuk mengakses camera terlebih dahulu',
          [
            {
              onPress: () =>
                openSettings().catch(e =>
                  console.log('error when open settings', e),
                ),
              text: 'Buka Pengaturan',
            },
          ],
          {
            cancelable: true,
          },
        );
        return bool;
      }
    } catch (err) {
      return false;
    }
  } else {
    const permissionType = PERMISSIONS.IOS.CAMERA;
    try {
      const result = await check(permissionType);
      let bool = false;

      switch (result) {
        case RESULTS.GRANTED:
          bool = true;
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permissionType);
          switch (requestResult) {
            case RESULTS.GRANTED:
              bool = true;
              break;
            case RESULTS.BLOCKED:
              alertRedirectToSettings('kamera');
              break;
            case RESULTS.UNAVAILABLE:
              alertFeatureNotAvailable('kamera');
              break;
            case RESULTS.LIMITED:
              break;
            case RESULTS.DENIED:
              break;
            default:
              break;
          }
          break;
        case RESULTS.BLOCKED:
          alertRedirectToSettings('kamera');
          break;
        case RESULTS.UNAVAILABLE:
          alertFeatureNotAvailable('kamera');
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.DENIED:
          break;
        default:
          break;
      }
      return bool;
    } catch (e) {
      return false;
    }
  }
};

export const _handlerGalleryPermission = async () => {
  if (Platform?.OS === 'android') {
    return true;
  } else {
    const permissionType = PERMISSIONS.IOS.PHOTO_LIBRARY;

    try {
      const result = await check(permissionType);

      let bool = false;

      switch (result) {
        case RESULTS.GRANTED:
          bool = true;
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permissionType);
          switch (requestResult) {
            case RESULTS.GRANTED:
              bool = true;
              break;
            case RESULTS.BLOCKED:
              alertRedirectToSettings();
              break;
            case RESULTS.UNAVAILABLE:
              alertFeatureNotAvailable();
              break;
            case RESULTS.LIMITED:
              break;
            case RESULTS.DENIED:
              break;
            default:
              break;
          }
          break;
        case RESULTS.BLOCKED:
          alertRedirectToSettings();
          break;
        case RESULTS.UNAVAILABLE:
          alertFeatureNotAvailable();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.DENIED:
          break;
        default:
          break;
      }
      return bool;
    } catch (e) {
      return false;
    }
  }
};

export const checkPushNotifPermission = async () => {
  try {
    let newStatus;
    const value = await checkNotifications();
    switch (value.status) {
      case 'granted':
        break;
      case 'blocked':
        break;
      case 'limited':
        break;
      case 'denied':
        newStatus = await requestNotificationPermission();
        break;
      case 'unavailable':
        break;

      default:
        break;
    }
    return Promise.resolve(
      value.status === 'denied' ? newStatus : value.status,
    );
  } catch (e) {
    return Promise.reject(e);
  }
};

export const requestNotificationPermission = async () => {
  try {
    const val = await requestNotifications(['alert', 'sound', 'badge']);
    switch (val.status) {
      case 'granted':
        break;
      case 'blocked':
        break;
      case 'limited':
        break;
      case 'denied':
        break;
      case 'unavailable':
        break;

      default:
        break;
    }
    return Promise.resolve(val.status);
  } catch (e) {
    return Promise.reject(e);
  }
};

const formatImage = [
  '.jpg',
  '.jpeg',
  '.png',
  '.bmp',
  '.gif',
  '.JPG',
  '.JPEG',
  '.PNG',
  '.BMP',
  '.GIF',
];

export const isImageFile = (host?: string, ends = formatImage): boolean => {
  let value = false;
  if (host) {
    value = ends.some(element => {
      return host.endsWith(element);
    });
  }
  return value;
};

export const renderStripe = (str?: string) => {
  return str ?? '---';
};

export const formatDate = (start: any, end: any, formatDate: any = 1) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const formattedDate = startDate.locale('id').format('dddd, DD MMMM YYYY');
  const formattedStartTime = startDate.format('HH:mm');
  const formattedEndTime = endDate.format('HH:mm');

  const day = shortDays[startDate.get('day')];
  const date = startDate.get('date');
  const month = startDate.get('month');
  const year = startDate.get('year');

  switch (formatDate) {
    case 1:
      return `${formattedDate} • ${formattedStartTime} - ${formattedEndTime}`;
    case 2:
      return `${day}, ${date}/${month}/${year} ${formattedStartTime} - ${formattedEndTime}`;
    case 3:
      return `${day}, ${date}/${
        month + 2
      }/${year} ${formattedStartTime} - ${formattedEndTime}`;
  }
};

export const formatDateProductComment = (
  date: any,
  format: string = 'DD-MM-YYYY',
) => {
  const diffHour = dayjs().diff(date, 'hour');
  if (!date) {
    return '-';
  }

  if (diffHour < 24) {
    return `Hari ini, ${dayjs(date).format('HH:mm')}`;
  } else if (diffHour < 48) {
    return `Kemarin, ${dayjs(date).format('HH:mm')}`;
  } else {
    return dayjs(date).locale('id').format(format);
  }
};

export const formatDateLMSUjian = (startTime: any, endTime: any) => {
  const diffHour = dayjs().diff(startTime, 'hour');
  if (!startTime) {
    return '-';
  }

  if (diffHour < 24) {
    return `Hari ini ${dayjs(startTime)
      .utc()
      .locale('id')
      .format('• hh:mm -')} ${dayjs(endTime).format('hh:mm')}`;
  } else if (diffHour < 48) {
    return `Besok ${dayjs(startTime)
      .utc()
      .locale('id')
      .format('• hh:mm -')} ${dayjs(endTime).format('hh:mm')}`;
  } else {
    return `${dayjs(startTime)
      .utc()
      .locale('id')
      .format('ddd, D MMM YYYY • hh:mm -')} ${dayjs(endTime)
      .utc()
      .locale('id')
      .format('hh:mm')}`;
  }
};

export const formatDurationLMSUjian = (_startTime: any, _endTime: any) => {
  const startTime = dayjs(_startTime);
  const endTime = dayjs(_endTime);
  const _duration = duration(endTime.diff(startTime));

  return _duration.asDays();
};

export const formatScheduleDate = (startDate: any, endDate: any): string => {
  const diffHour = dayjs().diff(startDate, 'hour');
  if (diffHour > 0 && diffHour < 24) {
    return `Hari ini • ${dayjs
      .tz(startDate, 'Asia/Jakarta')
      .format('HH:mm')} - ${dayjs(endDate).format('HH:mm')}`;
  }
  return `${dayjs(startDate).locale('id').format('ddd, D MMM YYYY')} • ${dayjs
    .tz(startDate, 'Asia/Jakarta')
    .format('HH:mm')} - ${dayjs.tz(endDate, 'Asia/Jakarta').format('HH:mm')}`;
};

export const formatExamSchedule = (startDate: any, endDate: any): string => {
  const diffHour = dayjs().diff(startDate, 'hour');
  if (diffHour > 0 && diffHour < 24) {
    return `Hari ini • ${dayjs
      .tz(startDate, 'Asia/Jakarta')
      .format('HH:mm')} - ${dayjs(endDate).format('HH:mm')}`;
  }
  return `${dayjs(startDate).locale('id').format('dddd')} • ${dayjs
    .tz(startDate, 'Asia/Jakarta')
    .format('HH:mm')} - ${dayjs.tz(endDate, 'Asia/Jakarta').format('HH:mm')}`;
};

export const makePrefixUppercaseRestLowercase = (value: string) =>
  value
    .split(' ')
    .map((word, id) =>
      id === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase(),
    )
    .join(' ');

export const requestMicrophonePermission = async () => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.RECORD_AUDIO
      : PERMISSIONS.IOS.MICROPHONE;

  try {
    let status = await check(permission);
    let statusRequest = status;
    switch (status) {
      case 'granted':
        break;
      case 'denied':
        statusRequest = await request(permission);
        break;
      case 'blocked':
        break;
      case 'limited':
        break;
      case 'unavailable':
        break;
      default:
        break;
    }
    return Promise.resolve(status === 'granted' ? status : statusRequest);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const showErrorToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    ...params,
    type: 'error',
    text1: message || 'Terjadi Kesalahan',
  });
};

export const showSuccessToast = (message: string, params?: ToastShowParams) => {
  Toast.show({
    ...params,
    type: 'success',
    text1: message,
  });
};

export const generateDateDefault = () => {
  const currentDate: dayjs.Dayjs = dayjs();

  // set startDate dan endDate berdasarkan tanggal sekarang
  const startDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
  const endDate: dayjs.Dayjs = currentDate.add(1, 'month');

  // buat array tanggal
  const dateArray: string[] = [];
  let dateCursor: dayjs.Dayjs = startDate;

  while (dateCursor <= endDate) {
    // dateArray.push(dateCursor.format('dd, D MMM'));
    dateArray.push(dateCursor.format('YYYY-MM-DD'));
    dateCursor = dateCursor.add(1, 'day');
  }
  return dateArray;
};
