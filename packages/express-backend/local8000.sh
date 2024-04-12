#!/bin/bash

for i in {1..100}
do
  HFLAG=" localhost:8000/users"
  curl -v -X POST --json "{\"id\":\"$i\", \"name\":\"$i\", \"job\":\"$i\"}" $HFLAG
done


