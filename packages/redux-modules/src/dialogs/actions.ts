import { createAction } from 'redux-actions';

import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA
} from './types';

export const initializeDialog = createAction(INITIALIZE_DIALOG);
export const openDialog = createAction(OPEN_DIALOG);
export const closeDialog = createAction(CLOSE_DIALOG);
export const setDialogData = createAction(SET_DIALOG_DATA);
