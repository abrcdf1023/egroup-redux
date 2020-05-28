import React from 'react';
import { connect } from 'react-redux';

import {
  getSnackbarStates,
  initializeSnackbar,
  closeSnackbar
} from '../snackbars';

const withReduxSnackbar = name => Snackbar => {
  class ReduxSnackbar extends React.Component {
    componentDidMount() {
      this.props.initializeSnackbar(name);
    }
    render() {
      const {
        forwardedRef,
        initializeSnackbar,
        onClose,
        closeSnackbar,
        ...other
      } = this.props;

      const handleClose = e => {
        if (onClose) {
          onClose(e);
        }
        this.props.closeSnackbar(name);
      };

      return <Snackbar ref={forwardedRef} onClose={handleClose} {...other} />;
    }
  }

  /**
   * Connect before forwardRef
   * https://github.com/reduxjs/react-redux/issues/914
   */
  const mapStateToProps = (state, props) => ({
    ...getSnackbarStates(state, props, name)
  });

  const ConnectedComponent = connect(mapStateToProps, {
    initializeSnackbar,
    closeSnackbar
  })(ReduxSnackbar);

  /**
   * Forwarding refs in higher-order components
   * https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
   */
  function forwardRef(props, ref) {
    return <ConnectedComponent {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const snackbarComponentName = Snackbar.displayName || Snackbar.name;
  forwardRef.displayName = `withReduxSnackbar(${snackbarComponentName})`;

  return React.forwardRef(forwardRef);
};

export default withReduxSnackbar;
