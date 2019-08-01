import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRootStates, initializeDialog, closeDialog } from './dialogs';

const withReduxDialog = name => Dialog => {
  class ReduxDialog extends Component {
    componentDidMount() {
      this.props.initializeDialog(name);
    }
    render() {
      const { initializeDialog, handleClose, ...other } = this.props;
      return (
        <Dialog
          handleClose={() => {
            this.props.closeDialog(name);
          }}
          {...other}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => ({
    ...getRootStates(state, props, name).toJS()
  });

  return connect(
    mapStateToProps,
    {
      initializeDialog,
      closeDialog
    }
  )(ReduxDialog);
};

export default withReduxDialog;
