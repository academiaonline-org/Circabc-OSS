#!/bin/sh -x
#################################################################################
sudo docker stack rm ${stack}
sleep 100
cd ${HOME}/${stack}
previous_tag=$( git status | awk '/On branch/ { print $4 }' )
git stash
git checkout ${tag}
sudo docker stack deploy -c ${HOME}/${stack}/etc/swarm/manifests/${stack}.yaml ${stack}
git checkout ${previous_tag}
git stash apply
#################################################################################
