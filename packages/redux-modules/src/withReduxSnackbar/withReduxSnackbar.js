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
        handleClose,
        closeSnackbar,
        ...other
      } = this.props;
      return (
        <Snackbar
          ref={forwardedRef}
          handleClose={() => {
            this.props.closeSnackbar(name);
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
    return <ReduxSnackbar {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const snackbarComponentName = Snackbar.displayName || Snackbar.name;
  forwardRef.displayName = `withReduxSnackbar(${snackbarComponentName})`;

  const ForwardedComponent = React.forwardRef(forwardRef);

  const mapStateToProps = (state, props) => ({
    ...getSnackbarStates(state, props, name).toJS()
  });

  return connect(
    mapStateToProps,
    {
      initializeSnackbar,
      closeSnackbar
    }
  )(ForwardedComponent);
};

export default withReduxSnackbar;
