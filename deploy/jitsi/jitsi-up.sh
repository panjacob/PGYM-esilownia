#!/bin/bash

set -e

docker-compose -f docker-compose.yml -f jibri.yml up -d --scale jibri=5
./jibri-scale.sh
sed -i 's/SHOW_JITSI_WATERMARK: true/SHOW_JITSI_WATERMARK: false/g' config/web/interface_config.js

