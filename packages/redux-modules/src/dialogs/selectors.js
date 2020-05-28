import getIn from '@e-group/utils/getIn';

export const getDialogStates = (state, props, dialogName) =>
  getIn(state, ['dialogs', dialogName], {
    isOpen: false
  });
