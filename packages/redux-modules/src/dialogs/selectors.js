import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getRootStates = (state, props, dialogName) =>
  state.getIn(['dialogs', dialogName], Map());

export const getIsOpen = (state, props, dialogName) =>
  createSelector(
    getRootStates,
    rootStates => rootStates.get('isOpen', false)
  )(state, props, dialogName);

export const getTitle = (state, props, dialogName) =>
  createSelector(
    getRootStates,
    rootStates => rootStates.get('title', props.title)
  )(state, props, dialogName);

export const getMessage = (state, props, dialogName) =>
  createSelector(
    getRootStates,
    rootStates => rootStates.get('message', props.message)
  )(state, props, dialogName);
