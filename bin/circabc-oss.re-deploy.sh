#!/bin/sh -x
sudo docker stack rm ${stack}
sleep 100
sudo docker stack deploy -c ${HOME}/${stack}/etc/swarm/manifests/${stack}.yaml ${stack}
