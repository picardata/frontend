# Picardata Frontend

## Prerequisite
* Clone [Picardata API](https://github.com/picardata-labs/api) and put it in the same directory with `frontend` folder

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

## Difference between `setup-dev` and `setup`
`setup-dev` - This will create your database data, build the container, launch the containers and install package dependencies.
`setup` - This will just launch the containers.
