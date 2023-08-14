import {
  ABILITY_REQUEST,
  ABILITY_SUCCESS,
  ABILITY_FAILED,
  ABILITY_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const AbilityReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case ABILITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ABILITY_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case ABILITY_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ABILITY_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};
