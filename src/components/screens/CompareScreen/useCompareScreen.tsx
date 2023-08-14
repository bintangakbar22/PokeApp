import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const useCompareScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'CompareScreen'>>();
  return {navigation};
};

export {useCompareScreen};
