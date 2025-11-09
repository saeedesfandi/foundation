FROM node:24-trixie

ENV DEBIAN_FRONTEND=noninteractive

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1 \
    APT_LISTCHANGES_FRONTEND=none \
    APT_INSTALL_RECOMMENDS=0 \
    APT_INSTALL_SUGGESTS=0

# ENV NODE_ENV=production

# ENV npm_config_production=true \
ENV    npm_config_update_notifier=false \
    npm_config_audit=false \
    npm_config_fund=false
#    npm_config_loglevel=error

ENV ENV NEXT_TELEMETRY_DISABLED=1

ENV TZ="Asia/Tehran" \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

WORKDIR /app

# npm
# COPY ./package.json ./package-lock.json /app/
# RUN npm ci --no-audit --no-fund

# pnpm
COPY ./package.json ./pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile --prefer-offline

COPY ./bin/* /usr/local/bin/
COPY . /app

ENV NEXT_TELEMETRY_DISABLED=1
# RUN npm run build
    # npm prune --include production && \
    # rm -rf /root/.npm /tmp/*
RUN pnpm run build

CMD ["app.sh"]
