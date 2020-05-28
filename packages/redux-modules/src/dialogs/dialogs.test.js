import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData
} from './actions';
import { reducer } from './dialogs';

const dialogName = 'alertAialog';

describe('dialog reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle INITIALIZE_DIALOG', () => {
    const state = {};
    const initializeState = {
      [dialogName]: {
        isOpen: false
      }
    };
    expect(reducer(state, initializeDialog(dialogName))).toEqual(
      initializeState
    );
    expect(reducer(state, initializeDialog())).toEqual(state);
    expect(reducer(state, initializeDialog({}))).toEqual(state);
    expect(reducer(initializeState, initializeDialog(dialogName))).toEqual(
      initializeState
    );
  });

  it('should handle OPEN_DIALOG', () => {
    const state = {
      [dialogName]: {
        isOpen: false
      }
    };
    expect(reducer(state, openDialog(dialogName))).toEqual({
      [dialogName]: {
        isOpen: true
      }
    });
    expect(reducer(state, openDialog())).toEqual(state);
    expect(reducer(state, openDialog({}))).toEqual(state);
  });

  it('should handle CLOSE_DIALOG', () => {
    const state = {
      [dialogName]: {
        isOpen: true
      }
    };
    expect(reducer(state, closeDialog(dialogName))).toEqual({
      [dialogName]: {
        isOpen: false
      }
    });
    expect(reducer(state, closeDialog())).toEqual(state);
    expect(reducer(state, closeDialog({}))).toEqual(state);
  });

  it('should handle SET_DIALOG_DATA', () => {
    const state = {
      [dialogName]: {
        isOpen: false
      }
    };
    expect(
      reducer(
        state,
        setDialogData({
          name: dialogName,
          message: 'message',
          title: 'title'
        })
      )
    ).toEqual({
      [dialogName]: {
        isOpen: false,
        message: 'message',
        title: 'title'
      }
    });
    expect(reducer(state, setDialogData())).toEqual(state);
    expect(reducer(state, setDialogData('TEST'))).toEqual(state);
  });
});
