#!/bin/bash

sed -i 's/http:\/\/127.0.0.1:8000\//https:\/\/api.pgym.xyz\//g' src/components/Axios/Axios_variebles.js
npm run build
sshpass -p "PuddingALaMode621" scp -r -P 2621 build x@pgym.xyz:/home/x/Documents/reverse_proxy/
sshpass -p "PuddingALaMode621" ssh -p 2621 x@pgym.xyz "cd /home/x/Documents/reverse_proxy/ && ./deploy"
sed -i 's/https:\/\/api.pgym.xyz\//http:\/\/127.0.0.1:8000\//g' src/components/Axios/Axios_variebles.js
