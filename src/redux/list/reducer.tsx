import {LIST_REQUEST, LIST_SUCCESS, LIST_FAILED, LIST_DESTROY} from './type';

const initialState = {
  loading: false,
  data: [],
  error: null,
  nextPage: true,
};

export const ListReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_SUCCESS:
      return {
        loading: false,
        data:
          action.payload.params.offset === 0
            ? action.payload.data
            : [...state.data!, ...action.payload.data],
        error: '',
        nextPage: action.payload.nextPage,
      };
    case LIST_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LIST_DESTROY:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};
