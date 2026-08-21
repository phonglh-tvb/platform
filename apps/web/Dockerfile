# syntax=docker/dockerfile:1
# Build from the workspace root:  docker build -f apps/web/Dockerfile .

ARG PNPM_VERSION=11.22.0

FROM node:22-alpine AS builder
ARG PNPM_VERSION
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Next resolves rewrite destinations at build time, so the API origin has to be
# known here rather than at container start.
ARG API_URL=http://api:3333
ENV API_URL=$API_URL

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json tsconfig.json ./
COPY apps ./apps
COPY libs ./libs

RUN pnpm install --frozen-lockfile
RUN pnpm nx build @platform/web

FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app

# `output: 'standalone'` đã gom sẵn node_modules cần thiết. Với pnpm, Next đi
# theo symlink và copy file thật vào standalone, nên runtime không cần pnpm.
COPY --from=builder /workspace/apps/web/.next/standalone ./
COPY --from=builder /workspace/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /workspace/apps/web/public ./apps/web/public

USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
