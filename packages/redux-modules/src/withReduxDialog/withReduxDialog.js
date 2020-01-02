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
   * Forwarding refs in higher-order components
   * https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
   */
  function forwardRef(props, ref) {
    return <ReduxDialog {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const dialogComponentName = Dialog.displayName || Dialog.name;
  forwardRef.displayName = `withReduxDialog(${dialogComponentName})`;

  const ForwardedComponent = React.forwardRef(forwardRef);

  const mapStateToProps = (state, props) => ({
    ...getDialogStates(state, props, name).toJS()
  });

  return connect(
    mapStateToProps,
    {
      initializeDialog,
      closeDialog
    }
  )(ForwardedComponent);
};

export default withReduxDialog;
