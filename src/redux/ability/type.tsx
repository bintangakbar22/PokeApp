const BASE_NAME = 'ABILITY';
export const ABILITY_REQUEST = `${BASE_NAME}_REQUEST`;
export const ABILITY_SUCCESS = `${BASE_NAME}_SUCCESS`;
export const ABILITY_FAILED = `${BASE_NAME}_FAILED`;
export const ABILITY_DESTROY = `${BASE_NAME}_DESTROY`;

interface ABILITYRequestAction {
  type: typeof ABILITY_REQUEST;
}

interface ABILITYSuccessAction {
  type: typeof ABILITY_SUCCESS;
  payload: {data: any};
}

interface ABILITYFailedAction {
  type: typeof ABILITY_FAILED;
  payload: any;
}

interface ABILITYDestroyAction {
  type: typeof ABILITY_DESTROY;
}

export type ABILITY_ACTION_TYPES =
  | ABILITYRequestAction
  | ABILITYSuccessAction
  | ABILITYFailedAction
  | ABILITYDestroyAction;
