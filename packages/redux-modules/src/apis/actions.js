import { createAction } from 'redux-actions';

import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE,
  EG_CLEAR_API_RESPONSE,
  EG_CLEAR_APIS_RESPONSE,
  EG_DESTROY_API
} from './types';

export const egApiTake = createAction(EG_API_TAKE);
export const egApiRequest = createAction(EG_API_REQUEST);
export const egApiCancel = createAction(EG_API_CANCEL);
export const egApiSuccess = createAction(EG_API_SUCCESS);
export const egApiFailure = createAction(EG_API_FAILURE);
export const clearApiResponse = createAction(EG_CLEAR_API_RESPONSE);
export const clearApisResponse = createAction(EG_CLEAR_APIS_RESPONSE);
export const destroyApi = createAction(EG_DESTROY_API);
