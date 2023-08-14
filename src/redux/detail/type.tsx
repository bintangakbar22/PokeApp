const BASE_NAME = 'DETAIL';
export const DETAIL_REQUEST = `${BASE_NAME}_REQUEST`;
export const DETAIL_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const DETAIL_FAILED = `${BASE_NAME}_FAILED`;
export const DETAIL_DESTROY = `${BASE_NAME}_DESTROY`;

interface DETAILRequestAction {
  type: typeof DETAIL_REQUEST;
}

interface DETAILSuccessAction {
  type: typeof DETAIL_SUCCESS;
  payload: {data: any};
}

interface DETAILFailedAction {
  type: typeof DETAIL_FAILED;
  payload: any;
}

interface DETAILDestroyAction {
  type: typeof DETAIL_DESTROY;
}

export type DETAIL_ACTION_TYPES =
  | DETAILRequestAction
  | DETAILSuccessAction
  | DETAILFailedAction
  | DETAILDestroyAction;
