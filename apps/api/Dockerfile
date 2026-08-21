# syntax=docker/dockerfile:1
# Build from the workspace root:  docker build -f apps/api/Dockerfile .

ARG PNPM_VERSION=11.22.0

FROM node:22-alpine AS builder
ARG PNPM_VERSION
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json tsconfig.json ./
COPY apps ./apps
COPY libs ./libs

# --frozen-lockfile: fail thay vì tự sửa lockfile nếu nó lệch với package.json.
RUN pnpm install --frozen-lockfile
# `prune` chạy build + copy workspace lib + ghi pnpm-lock.yaml rút gọn vào
# apps/api/dist, nhờ đó stage runtime chỉ cài đúng thứ API cần.
RUN pnpm nx prune @platform/api

FROM node:22-alpine AS runner
ARG PNPM_VERSION
ENV NODE_ENV=production
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY --from=builder /workspace/apps/api/dist ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts \
  && pnpm store prune \
  && chown -R node:node /app

USER node
EXPOSE 3333
CMD ["node", "src/main.js"]
