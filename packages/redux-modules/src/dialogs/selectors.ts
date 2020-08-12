import getIn from '@e-group/utils/getIn';
import { OwnProps } from './withReduxDialog';

export const getDialogStates = (state: any, props: OwnProps, name: string) =>
  getIn(state, ['dialogs', name], {
    isOpen: false
  });
