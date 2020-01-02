import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getSnackbarStates,
  initializeSnackbar,
  closeSnackbar
} from '../snackbars';

const withReduxSnackbar = name => Snackbar => {
  class ReduxSnackbar extends Component {
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
  const ForwardedComponent = React.forwardRef((props, ref) => {
    return <ReduxSnackbar {...props} forwardedRef={ref} />;
  });

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
