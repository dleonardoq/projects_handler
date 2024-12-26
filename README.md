<a name="readme-top"></a>

## Project handler

<details>
<summary>Table of contents</summary>

- [About](#about)
- [Getting started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Instalation](#instalation)

</details>

## About

- This is an App to manage projects and its tasks, that means you can create, update and delete these ones, and also you can have a session with them.
- It's a porject created with nestjs, microservices, postgresql, mongodb and reactjs.
- Docker is used to improve develop and instalation process.
</p>

## Getting started

### Prerequisites
- You must have docker version 19.03.0 or later
- You must have docker compose version 1.27.0 or later
- You might have rest client vs code extension for testing endpoints (optional)

### Instalation
1. Clone the repository
```sh
git clone git@github.com:dleonardoq/projects_handler.git
```
2. Move into projects_handler directory
```sh
cd projects_handler
```
3. Create .env file with example.env file in all projects and follow the steps in example.evn files
  - Example:
```sh
cd api-gateway
cp example.env .env
```

4. Start Docker Desktop if you have it (ignore this step if you only have docker engine)
5. You have to be in the path of projects_handler where it's the docker-compose.yml file
5.1. Run the next command if is in a develop environment
```sh
  docker compose -f docker-compose-dev.yml up
```
5.2. Run the next command if is in a production environment
```sh
  docker compose  up
```
