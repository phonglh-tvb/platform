/**
 * Contracts shared between `@platform/api` and `@platform/web`.
 * Keep this file free of framework imports so both a Node server and a
 * browser bundle can depend on it.
 */

/** Prefix every `@platform/api` route is served under (see `apps/api/src/main.ts`). */
export const API_GLOBAL_PREFIX = 'api';

export interface MessageResponse {
  message: string;
}

export interface HealthResponse {
  status: 'ok';
  uptime: number;
}
