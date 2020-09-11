import React, { ComponentType, Component, RefObject, forwardRef } from 'react';
import { connect } from 'react-redux';

import { initializeSnackbar, closeSnackbar } from '../../snackbars/actions';
import { getSnackbarStates } from './selectors';

export interface OwnProps {
  onClose: (event: Event) => void;
}

export interface DispatchProps {
  initializeSnackbar: (name: string) => void;
  closeSnackbar: (name: string) => void;
}

export interface StateProps {
  isOpen: boolean;
}

export type WithReduxSnackbarProps = StateProps & DispatchProps & OwnProps;

/**
 * Please read this article for more info.
 * https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
 * @param name
 */
const withReduxSnackbar = (name: string) => <
  T extends Component,
  OriginalProps extends {}
>(
  WrappedComponent: ComponentType<any | string>
) => {
  type PrivateProps = { forwardedRef: RefObject<T> };

  type Props = WithReduxSnackbarProps & PrivateProps;

  class WithReduxSnackbar extends Component<Props> {
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

      const handleClose = (e: Event) => {
        if (onClose) {
          onClose(e);
        }
        this.props.closeSnackbar(name);
      };

      return (
        <WrappedComponent ref={forwardedRef} onClose={handleClose} {...other} />
      );
    }
  }

  /**
   * Connect before forwardRef
   * https://github.com/reduxjs/react-redux/issues/914
   */
  const mapStateToProps = (state: any, ownProps: OwnProps): StateProps => ({
    ...getSnackbarStates(state, ownProps, name).toJS()
  });

  const ConnectedComponent = connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    {
      initializeSnackbar,
      closeSnackbar
    }
  )(WithReduxSnackbar);

  /**
   * Forwarding refs in higher-order components
   * https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
   */
  function RefForwardingFactory(props: any, ref: T) {
    return <ConnectedComponent {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const componentName = WrappedComponent.displayName || WrappedComponent.name;
  RefForwardingFactory.displayName = `withReduxSnackbar(${componentName})`;

  return forwardRef<T, OriginalProps>(RefForwardingFactory as any);
};

export default withReduxSnackbar;
