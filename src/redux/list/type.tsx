const BASE_NAME = 'LIST';
export const LIST_REQUEST = `${BASE_NAME}_REQUEST`;
export const LIST_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const LIST_FAILED = `${BASE_NAME}_FAILED`;
export const LIST_DESTROY = `${BASE_NAME}_DESTROY`;

interface LISTRequestAction {
  type: typeof LIST_REQUEST;
}

interface LISTSuccessAction {
  type: typeof LIST_SUCCESS;
  payload: {data: any};
}

interface LISTFailedAction {
  type: typeof LIST_FAILED;
  payload: any;
}

interface LISTDestroyAction {
  type: typeof LIST_DESTROY;
}

export type LIST_ACTION_TYPES =
  | LISTRequestAction
  | LISTSuccessAction
  | LISTFailedAction
  | LISTDestroyAction;
