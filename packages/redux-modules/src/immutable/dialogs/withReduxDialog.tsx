import React, { ComponentType, Component, RefObject, forwardRef } from 'react';
import { connect } from 'react-redux';

import { initializeDialog, closeDialog } from '../../dialogs/actions';
import { getDialogStates } from './selectors';

export interface OwnProps {
  handleClose: () => void;
}

export interface DispatchProps {
  initializeDialog: (name: string) => void;
  closeDialog: (name: string) => void;
}

export interface StateProps {
  isOpen: boolean;
}

/**
 * Please read this article for more info.
 * https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
 * @param name
 */
const withReduxDialog = (name: string) => <
  T extends Component,
  OriginalProps extends {}
>(
  WrappedComponent: ComponentType<any | string>
) => {
  type PrivateProps = { forwardedRef: RefObject<T> };

  type Props = StateProps & DispatchProps & OwnProps & PrivateProps;

  class WithReduxDialog extends Component<Props> {
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
        <WrappedComponent
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
  const mapStateToProps = (state: any, ownProps: OwnProps): StateProps => ({
    ...getDialogStates(state, ownProps, name).toJS()
  });

  const mapDispatchToProps = (): DispatchProps => ({
    initializeDialog,
    closeDialog
  });

  const ConnectedComponent = connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxDialog);

  /**
   * Forwarding refs in higher-order components
   * https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
   */
  function RefForwardingFactory(props: any, ref: T) {
    return <ConnectedComponent {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const componentName = WrappedComponent.displayName || WrappedComponent.name;
  RefForwardingFactory.displayName = `withReduxDialog(${componentName})`;

  return forwardRef<T, OriginalProps>(RefForwardingFactory as any);
};

export default withReduxDialog;
