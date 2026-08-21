# syntax=docker/dockerfile:1
# Build from the workspace root:  docker build -f apps/web/Dockerfile .

FROM node:22-alpine AS builder
WORKDIR /workspace

# Next resolves rewrite destinations at build time, so the API origin has to be
# known here rather than at container start.
ARG API_URL=http://api:3333
ENV API_URL=$API_URL

COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.json ./
COPY apps ./apps
COPY libs ./libs

RUN npm ci
RUN npx nx build @platform/web

FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app

# `output: 'standalone'` already bundles the needed node_modules.
COPY --from=builder /workspace/apps/web/.next/standalone ./
COPY --from=builder /workspace/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /workspace/apps/web/public ./apps/web/public

USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
