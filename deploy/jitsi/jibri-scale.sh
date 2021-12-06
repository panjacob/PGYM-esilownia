#!/bin/bash

set -e

containers=$(docker ps | grep jibri | cut -d' ' -f 1 | tail +2)
i=1

for c in $containers; do
	j=$(printf "%X" $i)
	docker exec -it $c /bin/bash -c "sed -i \"s/Loopback/Loopback_${j}/g\" /home/jibri/.asoundrc"
	i=$((i+1))
done

