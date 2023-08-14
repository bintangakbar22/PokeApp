import {
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  DETAIL_FAILED,
  DETAIL_DESTROY,
  DETAIL_ACTION_TYPES,
} from './type';

import api from '@api/index';
import {URL_PATH} from '@constants/url';

import {Dispatch} from 'redux';

const DetailRequest = () => {
  return {
    type: DETAIL_REQUEST,
  };
};

const DetailSuccess = (data: any) => {
  return {
    type: DETAIL_SUCCESS,
    payload: {data},
  };
};

const DetailFailed = (error: any) => {
  return {
    type: DETAIL_FAILED,
    payload: error,
  };
};

export const DetailDestroy = () => {
  return {
    type: DETAIL_DESTROY,
    payload: null,
  };
};

export const fetchDetail = (id: number): any => {
  return async (dispatch: Dispatch<DETAIL_ACTION_TYPES>): Promise<void> => {
    dispatch(DetailRequest());
    try {
      const res = await api.get(URL_PATH.detail(id));
      if (res?.status === 200) {
        dispatch(DetailSuccess(res?.data));
      } else {
        dispatch(DetailFailed(res?.data));
      }
    } catch (err) {
      dispatch(DetailFailed(err));
    }
  };
};
