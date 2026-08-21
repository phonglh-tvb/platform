import { killPort, waitForPortOpen } from '@nx/node/utils';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

/**
 * Runs once before the whole suite. Start anything the API needs here
 * (database, docker-compose, …) — `nx e2e` already starts the API itself.
 */
export async function setup() {
  console.log('\nSetting up...\n');
  await waitForPortOpen(port, { host });
}

export async function teardown() {
  await killPort(port);
  console.log('\nTearing down...\n');
}
