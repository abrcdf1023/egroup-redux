import getIn from '@e-group/utils/getIn';
import { OwnProps } from './withReduxDialog';

export const getDialogStates = (
  state: any,
  props: OwnProps,
  dialogName: string
) =>
  getIn(state, ['dialogs', dialogName], {
    isOpen: false
  });
