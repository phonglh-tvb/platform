# syntax=docker/dockerfile:1
# Build from the workspace root:  docker build -f apps/api/Dockerfile .

FROM node:22-alpine AS builder
WORKDIR /workspace

COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.json ./
COPY apps ./apps
COPY libs ./libs

RUN npm ci
# `prune` runs build + copies workspace libs + writes a pruned package-lock.json
# into apps/api/dist, so the runtime stage installs only what the API needs.
RUN npx nx prune @platform/api

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /workspace/apps/api/dist ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

USER node
EXPOSE 3333
CMD ["node", "src/main.js"]
