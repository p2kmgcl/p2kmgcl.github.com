#!/bin/bash

sudo apt update -q -y
sudo apt install -q -y software-properties-common curl git
sudo apt-add-repository -q -y ppa:ansible/ansible
sudo apt install ansible -q -y

ansible-pull --url https://github.com/p2kmgcl/chachi-shell.git --directory $HOME/.chachi-shell --only-if-changed
