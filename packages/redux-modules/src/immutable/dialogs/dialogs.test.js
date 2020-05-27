import { fromJS } from 'immutable';
import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData
} from '../../dialogs';
import { reducer } from './dialogs';

const dialogName = 'alertAialog';

describe('dialog reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should handle INITIALIZE_DIALOG', () => {
    const state = fromJS({});
    const initializeState = fromJS({
      [dialogName]: {
        isOpen: false
      }
    });
    expect(reducer(state, initializeDialog(dialogName))).toEqual(
      initializeState
    );
    expect(reducer(state, initializeDialog())).toEqual(state);
    expect(reducer(initializeState, initializeDialog(dialogName))).toEqual(
      initializeState
    );
  });

  it('should handle OPEN_DIALOG', () => {
    const state = fromJS({
      [dialogName]: {
        isOpen: false
      }
    });
    expect(reducer(state, openDialog(dialogName))).toEqual(
      fromJS({
        [dialogName]: {
          isOpen: true
        }
      })
    );
    expect(reducer(state, openDialog())).toEqual(state);
  });

  it('should handle CLOSE_DIALOG', () => {
    const state = fromJS({
      [dialogName]: {
        isOpen: true
      }
    });
    expect(reducer(state, closeDialog(dialogName))).toEqual(
      fromJS({
        [dialogName]: {
          isOpen: false
        }
      })
    );
    expect(reducer(state, closeDialog())).toEqual(state);
  });

  it('should handle SET_DIALOG_DATA', () => {
    const state = fromJS({
      [dialogName]: {
        isOpen: false
      }
    });
    expect(
      reducer(
        state,
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
    expect(reducer(state, setDialogData())).toEqual(state);
  });
});
