#!/bin/bash

sudo apt-get update -y 1> /dev/null
sudo apt-get install -y software-properties-common curl git 1> /dev/null
sudo apt-add-repository -y ppa:ansible/ansible 1> /dev/null
sudo apt-get update -y 1> /dev/null
sudo apt-get install ansible -q -y 1> /dev/null

ansible-pull --url https://github.com/p2kmgcl/chachi-shell.git --directory $HOME/.chachi-shell --only-if-changed playbook.yml
