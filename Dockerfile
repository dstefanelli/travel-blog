FROM node:lts AS base
WORKDIR /app

ARG VITE_BASE_URL
ARG VITE_API_URL

RUN corepack enable
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build-deps
RUN pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN VITE_BASE_URL=$VITE_BASE_URL \
  VITE_API_URL=$VITE_API_URL \
  pnpm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
