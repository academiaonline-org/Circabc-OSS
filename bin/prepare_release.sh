#!/bin/sh
#################################################################################
#       Copyright (C) 2020        Sebastian Francisco Colomar Bauza             #
#       SPDX-License-Identifier:  GPL-2.0-only                                  #
#################################################################################
set -x                                                                          ;
#################################################################################
release=${1}                                                                    ;
#################################################################################
git checkout -b ${release}                                                      ;
#################################################################################
sed --in-place /branch=docker/s/docker/${release}/ README.md                    ;
sed --in-place /circabc.*latest/s/latest/${release#v}/ 				\
	circabc-docker/*/Dockerfile.* 						\
	Dockerfile.* 								\
	etc/*/manifests/*.yaml 							\
										;
sed --in-place s/-\ docker/-\ ${release}/ .github/workflows/ci.yaml             ;
#################################################################################
git add 									\
	.github/workflows/ci.yaml 						\
	circabc-docker/*/Dockerfile.* 						\
	Dockerfile.* 								\
	etc/*/manifests/*.yaml 							\
	README.md 								\
                                                                                ;
#################################################################################
git commit -m ${release}                                                        ;
#################################################################################
git push --set-upstream origin ${release}                                       ;
#################################################################################
