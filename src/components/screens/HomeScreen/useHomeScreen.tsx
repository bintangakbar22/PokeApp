/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchList} from '@redux';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const LIMIT_OFFSET = {
  limit: 25,
  offset: 0,
};

const useHomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreen'>>();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState(LIMIT_OFFSET);

  const listStore: any = useSelector((store: RootState) => store.list);

  const isLoading = listStore?.loading;

  const data: any = listStore?.data;

  useEffect(() => {
    dispatch(
      fetchList({
        ...pagination,
      }),
    );
  }, [pagination]);

  const __onEndReached = () => {
    const {nextPage} = listStore;

    if (nextPage && !isLoading) {
      setPagination(prevState => ({
        ...prevState,
        offset: pagination.offset + pagination.limit,
      }));
    }
  };

  return {navigation, __onEndReached, listStore, data, isLoading};
};

export {useHomeScreen};
