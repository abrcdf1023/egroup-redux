import { Map } from 'immutable';
import { OwnProps } from './withReduxDialog';

export const getDialogStates = (
  state: any,
  props: OwnProps,
  dialogName: string
) =>
  state.getIn(
    ['dialogs', dialogName],
    Map({
      isOpen: false
    })
  );
