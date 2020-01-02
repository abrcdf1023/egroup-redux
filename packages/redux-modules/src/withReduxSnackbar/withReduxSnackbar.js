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
        initializeSnackbar,
        handleClose,
        closeSnackbar,
        ...other
      } = this.props;
      return (
        <Snackbar
          handleClose={() => {
            this.props.closeSnackbar(name);
          }}
          {...other}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => ({
    ...getSnackbarStates(state, props, name).toJS()
  });

  return connect(
    mapStateToProps,
    {
      initializeSnackbar,
      closeSnackbar
    }
  )(ReduxSnackbar);
};

export default withReduxSnackbar;
