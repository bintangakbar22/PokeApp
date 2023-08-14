import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchDetail} from '@redux';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useDetailScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'DetailScreen'>>();
  const detailStore: any = useSelector((store: RootState) => store.detail);
  const data: any = detailStore?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetail(route?.params?.id));
  }, [route?.params?.id]);

  return {navigation, data};
};

export {useDetailScreen};
