import { setupServer } from 'msw/node';

import { restHandlers } from './handlers';

export const server = setupServer(...restHandlers);
