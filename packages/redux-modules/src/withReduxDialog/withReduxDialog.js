import React from 'react';
import { connect } from 'react-redux';

import { getDialogStates, initializeDialog, closeDialog } from '../dialogs';

const withReduxDialog = name => Dialog => {
  class ReduxDialog extends React.Component {
    componentDidMount() {
      this.props.initializeDialog(name);
    }
    render() {
      const {
        forwardedRef,
        initializeDialog,
        handleClose,
        closeDialog,
        ...other
      } = this.props;
      return (
        <Dialog
          ref={forwardedRef}
          handleClose={() => {
            closeDialog(name);
          }}
          {...other}
        />
      );
    }
  }

  /**
   * Connect before forwardRef
   * https://github.com/reduxjs/react-redux/issues/914
   */
  const mapStateToProps = (state, props) => ({
    ...getDialogStates(state, props, name)
  });

  const ConnectedComponent = connect(mapStateToProps, {
    initializeDialog,
    closeDialog
  })(ReduxDialog);

  /**
   * Forwarding refs in higher-order components
   * https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
   */
  function forwardRef(props, ref) {
    return <ConnectedComponent {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const dialogComponentName = Dialog.displayName || Dialog.name;
  forwardRef.displayName = `withReduxDialog(${dialogComponentName})`;

  return React.forwardRef(forwardRef);
};

export default withReduxDialog;
