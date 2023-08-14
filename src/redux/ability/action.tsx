import {
  ABILITY_REQUEST,
  ABILITY_SUCCESS,
  ABILITY_FAILED,
  ABILITY_DESTROY,
  ABILITY_ACTION_TYPES,
} from './type';

import api from '@api/index';
import {URL_PATH} from '@constants/url';

import {Dispatch} from 'redux';

const AbilityRequest = () => {
  return {
    type: ABILITY_REQUEST,
  };
};

const AbilitySuccess = (data: any) => {
  return {
    type: ABILITY_SUCCESS,
    payload: {data},
  };
};

const AbilityFailed = (error: any) => {
  return {
    type: ABILITY_FAILED,
    payload: error,
  };
};

export const AbilityDestroy = () => {
  return {
    type: ABILITY_DESTROY,
    payload: null,
  };
};

export const fetchAbility = (id: number): any => {
  return async (dispatch: Dispatch<ABILITY_ACTION_TYPES>): Promise<void> => {
    dispatch(AbilityRequest());
    try {
      const res = await api.get(URL_PATH.ability(id));
      if (res?.status === 200) {
        dispatch(AbilitySuccess(res?.data));
      } else {
        dispatch(AbilityFailed(res?.data));
      }
    } catch (err) {
      dispatch(AbilityFailed(err));
    }
  };
};
