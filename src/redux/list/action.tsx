import {
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILED,
  LIST_DESTROY,
  LIST_ACTION_TYPES,
} from './type';

import api from '@api/index';
import {URL_PATH} from '@constants/url';

import {Dispatch} from 'redux';

const ListRequest = () => {
  return {
    type: LIST_REQUEST,
  };
};

const ListSuccess = (data: any, nextPage: boolean, params: any) => {
  return {
    type: LIST_SUCCESS,
    payload: {
      data,
      nextPage,
      params,
    },
  };
};

const ListFailed = (error: any) => {
  return {
    type: LIST_FAILED,
    payload: error,
  };
};

export const ListDestroy = () => {
  return {
    type: LIST_DESTROY,
    payload: null,
  };
};

export const fetchList = (params: any): any => {
  return async (dispatch: Dispatch<LIST_ACTION_TYPES>): Promise<void> => {
    dispatch(ListRequest());
    try {
      const res = await api.get(URL_PATH.list, {params: params});
      if (res?.status === 200) {
        const nextPage = res.data?.results?.length > 0 ? true : false;
        if (res?.data?.results?.length > 0) {
          const mapping = res?.data?.results?.map(async (obj: any) => {
            if (obj?.url) {
              const resDetail = await api.get(obj?.url);
              if (resDetail) {
                obj.id = resDetail?.data?.id;
                if (resDetail?.data?.sprites?.front_default) {
                  obj.avatar =
                    resDetail?.data?.sprites?.other?.home?.front_default;
                }
              }
            }
          });
          await Promise.all(mapping);
        }
        dispatch(ListSuccess(res?.data?.results, nextPage, params));
      } else {
        dispatch(ListFailed(res?.data));
      }
    } catch (err) {
      dispatch(ListFailed(err));
    }
  };
};
