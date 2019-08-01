import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getRootStates = (state, props, name) =>
  state.getIn(['snackbars', name], Map());

export const getIsOpen = (state, props, name) =>
  createSelector(
    getRootStates,
    rootStates => rootStates.get('isOpen', false)
  )(state, props, name);

export const getMessage = (state, props, name) =>
  createSelector(
    getRootStates,
    rootStates => rootStates.get('message')
  )(state, props, name);

export const getVariant = (state, props, name) =>
  createSelector(
    getRootStates,
    rootStates => rootStates.get('variant')
  )(state, props, name);
