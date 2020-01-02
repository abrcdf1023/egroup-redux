import { fromJS } from 'immutable';
import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA,
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData,
  reducer,
  getDialogStates
} from './dialogs';

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

describe('dialog reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle INITIALIZE_DIALOG', () => {
    expect(reducer(fromJS({}), initializeDialog(dialogName))).toEqual(
      fromJS({
        [dialogName]: {
          isOpen: false
        }
      })
    );
  });

  it('should handle OPEN_DIALOG', () => {
    expect(
      reducer(
        fromJS({
          [dialogName]: {
            isOpen: false
          }
        }),
        openDialog(dialogName)
      )
    ).toEqual(
      fromJS({
        [dialogName]: {
          isOpen: true
        }
      })
    );
  });

  it('should handle CLOSE_DIALOG', () => {
    expect(
      reducer(
        fromJS({
          [dialogName]: {
            isOpen: true
          }
        }),
        closeDialog(dialogName)
      )
    ).toEqual(
      fromJS({
        [dialogName]: {
          isOpen: false
        }
      })
    );
  });

  it('should handle SET_DIALOG_DATA', () => {
    expect(
      reducer(
        fromJS({
          [dialogName]: {
            isOpen: false
          }
        }),
        setDialogData({
          name: dialogName,
          message: 'message',
          title: 'title'
        })
      )
    ).toEqual(
      fromJS({
        [dialogName]: {
          isOpen: false,
          message: 'message',
          title: 'title'
        }
      })
    );
  });
});

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
