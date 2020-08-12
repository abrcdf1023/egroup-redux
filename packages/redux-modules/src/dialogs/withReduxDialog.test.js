import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import withReduxDialog from './withReduxDialog';

let store;
const dialogName = 'alertAialog';

const MockDialog = React.forwardRef(function MockDialog(props, ref) {
  const { isOpen, handleClose, title, message } = props;
  return (
    <div ref={ref}>
      <p>{String(isOpen)}</p>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
});

describe('Redux Dialog HOC', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore({
      dialogs: {
        [dialogName]: {
          isOpen: true,
          title: 'dialog title',
          message: 'dialog message'
        }
      }
    });
  });
  it('Should render the component only when dialog prop is true', () => {
    const ReduxDialog = withReduxDialog(dialogName)(MockDialog);
    const { getByText } = render(<ReduxDialog store={store} />);
    expect(getByText('true')).toBeInTheDocument();
    expect(getByText('dialog title')).toBeInTheDocument();
    expect(getByText('dialog message')).toBeInTheDocument();
  });
  it('Should pass ref to Dialog component', () => {
    const ReduxDialog = withReduxDialog(dialogName)(MockDialog);
    const ref = React.createRef(null);
    render(<ReduxDialog ref={ref} store={store} />);
    expect(ref.current).not.toBeNull();
  });
});
