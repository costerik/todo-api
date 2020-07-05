# todo-api
the api is running in this url `https://serene-kenai-fjords-89574.herokuapp.com`

The endpoints are

## States
```
GET		/states
POST	/states
```

## Tasks
```
TASKS
GET		/tasks
GET		/tasks/:id
POST	/tasks
PATCH	/tasks/:id
PATCH	/tasks/:id/user
```

## Users
```
GET		/users
GET		/users/:id
POST	/users
PATCH	/users/:id
PATCH	/users/:id/task
```

## Setup
create an `.env` file and add a `DATABASE_URL` variable for the mongodb connection string and also add a `PORT` variable with a valid value e.g. `5000`. 

## Run

```bash
$ yarn
$ yarn dev
```
