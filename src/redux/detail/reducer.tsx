import {
  DETAIL_REQUEST,
  DETAIL_SUCCESS,
  DETAIL_FAILED,
  DETAIL_DESTROY,
} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const DetailReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DETAIL_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case DETAIL_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};
