# GPT Compare

## Application Setup and Initialization Guide

Follow these instructions to build and run the Docker container for the GPT Compare back-end application, which includes the initialization of the database with the schema and seeding scripts. These instructions also provide steps for running the GPT Compare front-end application and getting started as a new Admin user in the app.

### Initialization Scripts (the initialization scripts are already created and in the scripts directory of the project)

1. **Prepare Initialization Scripts**: Prepare the database initialization scripts and create a directory named `scripts` in the same directory as the `docker-compose.yml` file.
2. **Place SQL Scripts**: Inside the `scripts` directory, place the database schema (`init.sql`) and data seeding (`seed.sql`) SQL files. The PostgreSQL container is configured to automatically apply these scripts in alphabetical order when the Docker database image is built for the first time.

### Building and Running Containers

To build the Docker images and start the containers, run the following command in the terminal in the `root` directory after cloning the project:

```bash
docker-compose up --build
```

This command builds the images for the application and starts the containers as defined in the `docker-compose.yml` file.

### Running the Front-End of the App

Once the Docker containers are running, open a new terminal and navigate to the `frontend` directory of the cloned project, and use the following command

```bash
npm i
npm run dev
```

Once the front-end of the application is running, click on the link that is provided to you in the terminal. It will most likely be http:localhost:5173/

#### Recreating the Database

If the database needs to be recreated, use the following commands:

```bash
docker-compose down -v
docker-compose up --build
```

The `down -v` command removes the containers and their volumes, effectively resetting the database. Running `up --build` after this will rebuild the images and restart the containers, reapplying the initialization scripts.

## Accessing Dockerized PostgreSQL with Dockerized pgAdmin4 (optional if you want to view the database)

### Access pgAdmin4

Open your web browser and navigate to **http://localhost:5050**.
Log in using the credentials provided:

**Email:** admin@gptcompare.com
**Password:** password

### Create a New Server in pgAdmin4

1. Right-click on 'Servers' in the left sidebar of pgAdmin4.
2. Select 'Create' and then 'Server' to open the server creation dialog.

### Determine the Host Name of the PostgreSQL Container

1. Open your terminal.
2. Type the command `docker container ls` to list all running containers.
3. Locate the container running the PostgreSQL image (named `postgres:latest`).
4. Copy the Container ID of the PostgreSQL container.

### Inspect the PostgreSQL Container

1. In your terminal, type `docker inspect <container ID>` replacing `<container ID>` with the ID you just copied.
2. From the output, identify the IP address under "IPAddress" which will be used as the host address in pgAdmin4.

### Configure the Server in pgAdmin4

1. Right-click on `Server`, left-click on `Register > Server`, 

2. General tab:

    - Name: this is `gpt_compare`

3. Connection tab:
    
    - Hostname/address: Paste the IP address you found from the docker inspect output.
    
    - Port: this is `5432` for PostgreSQL.
    
    - Maintenance database: this is `postgres`
    
    - Username: this is `postgres`
    
    - Password: this is `password`

4. Click 'Save' to establish the connection.

## Steps to Sign In to the GPT Compare App as a Default admin

1. Open the application and navigate to the login screen.
2. In the login form, enter `admin` as the username.
3. For the password, type `password`.
4. Click on the Sign In button or press Enter.
5. You should now be logged in as the admin and have access to all administrative functionalities. For security reasons, it is highly recommended to change the default admin password after your first login.
