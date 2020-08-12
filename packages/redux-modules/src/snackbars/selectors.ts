import getIn from '@e-group/utils/getIn';
import { OwnProps } from './withReduxSnackbar';

export const getSnackbarStates = (state: any, props: OwnProps, name: string) =>
  getIn(state, ['snackbars', name], {});
