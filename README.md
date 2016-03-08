### ecs-definer

This thing's job is to create a new revision of an existing ECS task definition.

It queries ECS for the existing JSON payload of your task definition, then just re-uploads it to create a new revision.

This is useful when doing a Continuous Deployment workflow on Amazon's ECS, since you need to automatically create new revisions of your task definition in order to trigger a new deployment.

## System requirements

In order to do its job, this tool expects the `aws` CLI to be installed and configured on the running system.

## Configuration

It takes its configuration via environment variables. Required vars are:

* TASK_FAMILY: This is the Task Definition Name in ECS.
* AWS_REGION: The region code, ie: ap-southeast-2 for Sydney (represent!)

Optional vars are:

* TASK_DEF_OUTFILE: This is the filename the process will save the task definition JSON to. Defaults to taskdef.json

You probably want to configure the `aws` CLI via environment variables too:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

## Docker

A docker image is available on the Dockerhub registry here:

https://hub.docker.com/r/prismatik/ecs-definer/

You can install it with `docker pull prismatik/ecs-definer`

## All together now

`docker run -e AWS_ACCESS_KEY_ID=SECRET -e "AWS_SECRET_ACCESS_KEY=SUPER_SECRET" -e TASK_FAMILY=totally_rad_task -e AWS_REGION=ap-southeast-2 prismatik/ecs-definer`
