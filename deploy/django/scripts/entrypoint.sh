#!/bin/sh

set -e

python manage.py collectstatic --noinput

gunicorn core.wsgi -b 0.0.0.0:8123

