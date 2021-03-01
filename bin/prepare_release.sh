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
sed --in-place /image.*latest/s/latest/${release#v}/ etc/*/manifests/*.yaml     ;
sed --in-place s/-\ docker/-\ ${release}/ .github/workflows/ci.yaml             ;
sed --in-place s/latest-maven/${release#v}-maven/ Dockerfile.*			;
#################################################################################
git add                                                                         \
  README.md                                                                     \
  etc/*/manifests/*.yaml                                                        \
  .github/workflows/ci.yaml                                                     \
                                                                                ;
#################################################################################
git commit -m ${release}                                                        ;
#################################################################################
git push --set-upstream origin ${release}                                       ;
#################################################################################
