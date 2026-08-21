import { readdirSync } from 'node:fs';
import { join } from 'node:path';

/** Tên thư mục con của `apps/` và `libs/` — cũng chính là scope hợp lệ. */
const projectScopes = ['apps', 'libs'].flatMap((parent) =>
  readdirSync(join(import.meta.dirname, parent), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name),
);

const extraScopes = ['repo', 'deps', 'ci', 'docs', 'docker'];

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [...projectScopes, ...extraScopes]],
    'scope-empty': [2, 'never'],
    'header-max-length': [2, 'always', 120],
    'body-max-line-length': [2, 'always', 120],
  },
};
