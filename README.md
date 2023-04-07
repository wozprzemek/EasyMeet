# **EasyMeet**

EasyMeet is a simple and user-friendly web application for scheduling meetings based on participant availability. Inspired by the popular tool **When2Meet**, EasyMeet allows you to quickly and easily find the best time for a meeting by identifying the common availability of all participants.

The application has been self-hosted and is available at https://easymeet.toadres.pl/.

<p align="center">
 <img src="/frontend/src/assets/createMeeting.png" alt="createmeeting" width="800px" height="auto"/>
</p>
<p align="center">
 <img src="/frontend/src/assets/availability.png" alt="createmeeting" width="800px" height="auto"/>
</p>


## Features

- Create meetings - set the meeting name, pick the appropiate dates and select the daily timeframes.
- Mark your availability using a simple grid layout for the meeting - indicate you free and busy time slots. Your input can be protected by a password.
- Schedule the meeting based on your team's availability.
 - Easily share meetings with colleagues.
 
##  Technologies Used
- **Backend** - Express + Zod (runtime request validation)
- **ORM** - MikroORM
- **Database** - PostgreSQL
- **Frontend** - React + SCSS
- **Reverse proxy & serving static files** - NGINX
- **Dev environment & deployment** - Docker + Docker Compose

##  Building and running

If you want to run the app locally, the latest Docker images are built and uploaded to Github Container Registry via Github Actions and are available in the *Packages* section of this repository. When running the application locally, these images will be first pulled from the registry, and in case of failure, built from local Dockerfile configurations.

 In order to run the app, follow the instructions:

1. Clone the EasyMeet repository from GitHub.
2. In the main repository directory, run the application with the `docker-compose up` command
(**Note:** Docker with Docker Compose required)
3. Access the application in your web browser simply at `localhost` (or `localhost:80`). If needed, adjust the ports in `nginx.conf` and `docker-compose.yml` under the ***nginx*** service section with port mapping.

## TODO
While the application is functional, there are several improvements to be made (currently under development)
- Grid performance improvement with large number of meeting participants
- Small interface improvements on mobile
- Adding the timezone selection support
- API testing with JEST
