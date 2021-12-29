# Picardata Frontend

## Prerequisite
* Clone [Picardata API](https://github.com/picardata-labs/api) and put it in the same directory with `frontend` folder
* Set Up API by going to it's root folder and running the command below.
```shell script
make setup-dev destroy
```

## Installation
Run the command below if you are setting up a new development environment
```shell
make setup-dev
```

## Setting up
If you already run `make setup-dev` before then you will just need to run the command below.
```
make setup
```

## Add this to your `/etc/host`
```
local.globelise.com 127.0.0.1
api.local.globelise.com 127.0.0.1
```

## Difference between `setup-dev` and `setup`
`setup-dev` - This will create your database data, build the container, launch the containers and install package dependencies.
`setup` - This will just launch the containers.
