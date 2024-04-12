#!/bin/bash
HFLAG=" localhost:8000/users"
curl -v -X POST --json "{\"id\":\"$1\", \"name\":\"$2\", \"job\":\"$3\"}" $HFLAG



