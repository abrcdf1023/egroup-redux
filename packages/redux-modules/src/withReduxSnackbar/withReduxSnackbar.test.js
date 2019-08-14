import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import withReduxSnackbar from './withReduxSnackbar';

let store;
const snackbarName = 'globalSnackbar';

const MockSnackbar = ({ isOpen, handleClose, title, message }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
};

describe('Redux Snackbar HOC', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore(
      fromJS({
        snackbars: {
          [snackbarName]: {
            isOpen: false,
            title: 'snackbar title',
            message: 'snackbar message'
          }
        }
      })
    );
  });
  it('Should render the component only when snackbar prop is true', () => {
    const ReduxSnackbar = withReduxSnackbar(snackbarName)(MockSnackbar);
    const { getByText } = render(<ReduxSnackbar store={store} />);
    expect(getByText('snackbar title')).toBeInTheDocument();
    expect(getByText('snackbar message')).toBeInTheDocument();
  });
});
