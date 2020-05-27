import { fromJS } from 'immutable';
import { getDialogStates } from './selectors';

const dialogName = 'alertAialog';

describe('dialog selectors', () => {
  it('should get default dialog states when dialog is undefined.', () => {
    expect(getDialogStates(fromJS({}), null, dialogName)).toEqual(
      fromJS({
        isOpen: false
      })
    );
  });

  const dialogStates = fromJS({
    isOpen: false,
    message: 'message',
    title: 'title'
  });
  const state = fromJS({
    dialogs: {
      [dialogName]: dialogStates
    }
  });
  it('should get dialog states by dialog name', () => {
    expect(getDialogStates(state, null, dialogName)).toEqual(dialogStates);
  });
});
