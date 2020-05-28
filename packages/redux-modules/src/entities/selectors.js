import { getIn } from '../utils';

export const getEntities = state => getIn(state, ['entities']);
