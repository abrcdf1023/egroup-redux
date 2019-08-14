import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import withReduxDialog from './withReduxDialog';

let store;
const dialogName = 'alertAialog';

const MockDialog = ({ isOpen, handleClose, title, message }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
};

describe('Redux Dialog HOC', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore(
      fromJS({
        dialogs: {
          [dialogName]: {
            isOpen: false,
            title: 'dialog title',
            message: 'dialog message'
          }
        }
      })
    );
  });
  it('Should render the component only when dialog prop is true', () => {
    const ReduxDialog = withReduxDialog(dialogName)(MockDialog);
    const { getByText } = render(<ReduxDialog store={store} />);
    expect(getByText('dialog title')).toBeInTheDocument();
    expect(getByText('dialog message')).toBeInTheDocument();
  });
});
