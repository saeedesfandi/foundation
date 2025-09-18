FROM python:3.13-trixie

ENV DEBIAN_FRONTEND=noninteractive

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1 \
    APT_LISTCHANGES_FRONTEND=none \
    APT_INSTALL_RECOMMENDS=0 \
    APT_INSTALL_SUGGESTS=0

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1

ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_ROOT_USER_ACTION=ignore \
    PIP_PROGRESS_BAR=off

ENV TZ="Asia/Tehran" \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

WORKDIR /app

COPY requirements.apt ./
RUN apt-get update && \
    apt-get install -y --no-install-recommends $(awk '{print $1'} requirements.apt) && \
    apt-get purge -y --auto-remove build-essential && \ 
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./bin/* /usr/local/bin/
COPY ./src ./

CMD ["app.sh"]
