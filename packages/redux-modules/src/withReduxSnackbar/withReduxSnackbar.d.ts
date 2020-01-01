import * as React from 'react';

interface ReduxSnackbarProps {
  initializeSnackbar: Function;
  closeSnackbar: Function;
}

declare function withReduxSnackbar(
  name: string
): React.ComponentType<ReduxSnackbarProps>;

export default withReduxSnackbar;
