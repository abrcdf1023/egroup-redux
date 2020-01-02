import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDialogStates, initializeDialog, closeDialog } from '../dialogs';

const withReduxDialog = name => Dialog => {
  class ReduxDialog extends Component {
    componentDidMount() {
      this.props.initializeDialog(name);
    }
    render() {
      const {
        initializeDialog,
        handleClose,
        closeDialog,
        ...other
      } = this.props;
      return (
        <Dialog
          handleClose={() => {
            closeDialog(name);
          }}
          {...other}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => ({
    ...getDialogStates(state, props, name).toJS()
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
