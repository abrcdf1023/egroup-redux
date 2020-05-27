import * as React from 'react';

interface ReduxDialogProps {
  initializeDialog: Function;
  closeDialog: Function;
}

declare function withReduxDialog(
  name: string
): React.ComponentType<ReduxDialogProps>;

export default withReduxDialog;
