import { getDialogStates } from './selectors';

const dialogName = 'alertAialog';

describe('dialog selectors', () => {
  it('should get default dialog states when dialog is undefined.', () => {
    expect(getDialogStates({}, null, dialogName)).toEqual({
      isOpen: false
    });
  });

  const dialogStates = {
    isOpen: false,
    message: 'message',
    title: 'title'
  };
  const state = {
    dialogs: {
      [dialogName]: dialogStates
    }
  };
  it('should get dialog states by dialog name', () => {
    expect(getDialogStates(state, null, dialogName)).toEqual(dialogStates);
  });
});
