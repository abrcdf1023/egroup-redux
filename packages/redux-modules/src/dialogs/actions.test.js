import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA
} from './types';
import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData
} from './actions';

const dialogName = 'alertAialog';

describe('dialog actions', () => {
  it('should create an action to initialize dialog', () => {
    const expectedAction = {
      type: INITIALIZE_DIALOG,
      payload: dialogName
    };
    expect(initializeDialog(dialogName)).toEqual(expectedAction);
  });

  it('should create an action to open dialog', () => {
    const expectedAction = {
      type: OPEN_DIALOG,
      payload: dialogName
    };
    expect(openDialog(dialogName)).toEqual(expectedAction);
  });

  it('should create an action to close dialog', () => {
    const expectedAction = {
      type: CLOSE_DIALOG,
      payload: dialogName
    };
    expect(closeDialog(dialogName)).toEqual(expectedAction);
  });

  it('should create an action to set dialog data', () => {
    const data = {
      message: 'message',
      title: 'title'
    };
    const expectedAction = {
      type: SET_DIALOG_DATA,
      payload: data
    };
    expect(setDialogData(data)).toEqual(expectedAction);
  });
});
