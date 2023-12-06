import _ from 'lodash';
import ROUTER from './ROUTER.js';
import FACTORY from './FACTORY.js';
import ABI from './ABI/index.js';
import INTERFACE from './INTERFACE.js';
import ENV from './ENV.js';
import TOKEN from './TOKEN.js';

const ROUTER_LOW = _.mapValues(ROUTER, v => v.toLowerCase());
const ROUTER_LOW_INVERT = _.invert(ROUTER_LOW);

export { 
  ROUTER,
  ROUTER_LOW,
  ROUTER_LOW_INVERT,
  FACTORY,
  ABI,
  INTERFACE,
  ENV,
  TOKEN
};