#!/bin/bash

project_dir=$(dirname $(dirname $(realpath $0)))

set -o allexport
[ -f $project_dir/.env ] && source $project_dir/.env

# DATABASE_URI is the env var from the .env file
db_url=postgresql://${DATABASE_URI:-'zenith:zenith@tcp(localhost:5432)/zenith'}

exec migrate -path ${project_dir}/db/migrations -database $db_url $@