'use strict';
import { setupWorker } from 'msw';
import { handlers } from './handlers';

console.log('mockServiceWorker... start');

export const worker = setupWorker(...handlers);
