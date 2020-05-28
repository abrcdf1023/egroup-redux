import { getIn } from '../utils';

export const getDialogStates = (state, props, dialogName) =>
  getIn(state, ['dialogs', dialogName], {
    isOpen: false
  });
