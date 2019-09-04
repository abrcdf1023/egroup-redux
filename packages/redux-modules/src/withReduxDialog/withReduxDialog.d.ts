import * as React from 'react';

interface ReduxDialogProps {
  initializeDialog: Function;
  closeDialog: Function;
}

declare function withReduxDialog(
  dialogName: string
): React.ComponentType<ReduxDialogProps>;

export default withReduxDialog;
