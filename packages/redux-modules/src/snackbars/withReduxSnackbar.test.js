import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import withReduxSnackbar from './withReduxSnackbar';

let store;
const name = 'globalSnackbar';

const MockSnackbar = React.forwardRef(function MockSnackbar(props, ref) {
  const { isOpen, handleClose, title, message } = props;
  return (
    <div ref={ref}>
      <p>{String(isOpen)}</p>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
});

describe('Redux Snackbar HOC', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore({
      snackbars: {
        [name]: {
          isOpen: true,
          title: 'snackbar title',
          message: 'snackbar message'
        }
      }
    });
  });
  it('Should render the component only when snackbar prop is true', () => {
    const ReduxSnackbar = withReduxSnackbar(name)(MockSnackbar);
    const { getByText } = render(<ReduxSnackbar store={store} />);
    expect(getByText('true')).toBeInTheDocument();
    expect(getByText('snackbar title')).toBeInTheDocument();
    expect(getByText('snackbar message')).toBeInTheDocument();
  });
  it('Should pass ref to Snackbar component', () => {
    const ReduxSnackbar = withReduxSnackbar(name)(MockSnackbar);
    const ref = React.createRef(null);
    render(<ReduxSnackbar ref={ref} store={store} />);
    expect(ref.current).not.toBeNull();
  });
});
