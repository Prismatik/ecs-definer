### ecs-definer

This thing's job is to fetch an ECS task definition and save it to disk.

It queries ECS for the existing JSON payload of your task definition, nests it under some properties to put it into an appropriate format for `aws ecs register-task-definition` to deal with, then saves it to disk.

This is useful when doing a Continuous Deployment workflow on Amazon's ECS. You want your CD pipeline to be able to create new revisions of your task definition. In order to do that, it needs to know what your existing task definition is. You don't want to save your task definition in source control because it's full of juicy secrets in the environment variables. You need a way to easily fetch the task definition programatically, configured via environment variables.

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

`docker run -v `echo pwd`:/shared -e TASK_DEF_OUTFILE=/shared/taskdef.json -e AWS_ACCESS_KEY_ID=SECRET -e "AWS_SECRET_ACCESS_KEY=SUPER_SECRET" -e TASK_FAMILY=totally_rad_task -e AWS_REGION=ap-southeast-2 prismatik/ecs-definer`

And your task definition will be in `./taskdef.json`
