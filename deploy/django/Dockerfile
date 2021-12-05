FROM python:3.8-alpine

ENV PATH="/scripts:${PATH}"

COPY ./app/requirements.txt /requirements.txt
RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers libffi-dev zlib-dev jpeg-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp

RUN mkdir /app
COPY ./app /app
WORKDIR /app
COPY ./scripts /scripts

RUN chmod +x /scripts/*

RUN mkdir -p /app/media
RUN mkdir -p /app/static
RUN mkdir -p /app/staticfiles

RUN adduser -D user
RUN chown -R user:user /app/media
RUN chown -R user:user /app/static
RUN chown -R user:user /app/staticfiles

RUN chmod -R 755 /app/media
RUN chmod -R 755 /app/static
run chmod -R 755 /app/staticfiles

USER user

CMD ["entrypoint.sh"]

