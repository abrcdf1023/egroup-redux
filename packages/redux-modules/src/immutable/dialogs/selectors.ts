import { Map } from 'immutable';
import { OwnProps } from './withReduxDialog';

export const getDialogStates = (state: any, props: OwnProps, name: string) =>
  state.getIn(
    ['dialogs', name],
    Map({
      isOpen: false
    })
  );
