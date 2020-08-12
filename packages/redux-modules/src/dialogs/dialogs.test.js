import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData
} from './actions';
import { reducer } from './dialogs';

const name = 'alertAialog';

describe('dialog reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle INITIALIZE_DIALOG', () => {
    const state = {};
    const initializeState = {
      [name]: {
        isOpen: false
      }
    };
    expect(reducer(state, initializeDialog(name))).toEqual(initializeState);
    expect(reducer(state, initializeDialog())).toEqual(state);
    expect(reducer(state, initializeDialog({}))).toEqual(state);
    expect(reducer(initializeState, initializeDialog(name))).toEqual(
      initializeState
    );
  });

  it('should handle OPEN_DIALOG', () => {
    const state = {
      [name]: {
        isOpen: false
      }
    };
    expect(reducer(state, openDialog(name))).toEqual({
      [name]: {
        isOpen: true
      }
    });
    expect(reducer(state, openDialog())).toEqual(state);
    expect(reducer(state, openDialog({}))).toEqual(state);
  });

  it('should handle CLOSE_DIALOG', () => {
    const state = {
      [name]: {
        isOpen: true
      }
    };
    expect(reducer(state, closeDialog(name))).toEqual({
      [name]: {
        isOpen: false
      }
    });
    expect(reducer(state, closeDialog())).toEqual(state);
    expect(reducer(state, closeDialog({}))).toEqual(state);
  });

  it('should handle SET_DIALOG_DATA', () => {
    const state = {
      [name]: {
        isOpen: false
      }
    };
    expect(
      reducer(
        state,
        setDialogData({
          name: name,
          message: 'message',
          title: 'title'
        })
      )
    ).toEqual({
      [name]: {
        isOpen: false,
        message: 'message',
        title: 'title'
      }
    });
    expect(reducer(state, setDialogData())).toEqual(state);
    expect(reducer(state, setDialogData('foo'))).toEqual(state);
  });
});
