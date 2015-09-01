# The Docker Book
These are my notes from 'The Docker Book' which is available at [http://www.dockerbook.com/](http://www.dockerbook.com/). I highly recommend it as a way to get started and familiar with Docker. The following are my rough notes while reading the book.

## Summary
### Chapter 1
> Docker adds an application deployment engine on top of a virtualized container execution environment.

> Containers are launched form images and can contain one or more running processes. You can think about images as the building or packing aspect of Docker and the containers as the running or execution aspect of Docker.

### Chapter 2
- Install docker using the Docker toolbox.
- Kitematic - GUI interface for running Docker locally and interacting with Docker Hub.

### Chapter 3
Running our first container. This will provision Ubuntu container and open the bash. using an interactive shell.

```
docker run -it ubuntu /bin/bash
```

Starting a stopped container and then attach to it. You may need to hit enter twice to attach to the container.

```
docker start [container name / id]
docker attach [container name / id]
```

Daemonized Containers. This will start a long-running container. The additional commands allow you to tap into the log files. Also see the top running commands and stats for named container instances.

```
docker run --name daemon_container -d ubuntu /bin/bash -c "while true; do echo hello world; sleep 1; done";

docker logs -ft [container name / id]

docker top [container name / id]

docker stats [container name / id]
```

Stopping a daemonized container

```
docker stop [container name / id]
```

Get more info about the container

```
docker inspect [container name / id]
```

Deleting a container

```
docker rm [container name / id]
```

Delete all containers

```
docker rm `docker ps -a -q`
```

Useful commands:
- --name: setup the name for the container, otherwise it's automatically assigned.
- -ft: follow with timestamp for logs
- -it: interactive container creating TTY and capture STDIN for execution
- --restart: automatically restarts container on error

### Chapter 4
> In a more traditional Linux boot, the root filesystem is mounted read-only and then switched to read-write after boot and an integrity check is conducted. In the Docker world, however, the root filesystem stays in read-only mode, and Docker take advantage of a union mount to add more read-only filesystems onto the root filesystem. A union mount that allows several filesystems to be mounted at one time but appear to be one filesystem. The union mount overlays the filesystem on top of one another so that the resulting filesystem may container files and subdirectories from any or all of the underlying filesystems.

> Docker calls each of these filesystem images. Images can be layered on top of one another. The image below the parent image and you can traverse each layer until you reach the bottom of the image stack where the final image is called the base image. Finally, when a container is launched from an image, Docker mounts a read-write filesystem on top of any ayers below. This is where whatever processes we want our Docker containers to run will execute.

> This pattern is traditionally called 'copy on write' and is one of the features that makes Docker so powerful. Each read-only image layer is read-only; this image never changes. When a container is created, Docker build from the stack of image and then adds the read-write layer on top. That layer, combined with the knowledge of the image layers below it and some configuration data, form the container... containers can be changed, they have state and they can be started and stopped.  This, and the image-laying framework, allows us to quickly build images and run containers with our applications and services.

Listing docker images

```
docker images
```

Pull a specific version of Ubuntu container from Docker Hub and run it

```
docker pull ubuntu:14.04
docker run -it --name new_container ubuntu:14.04 /bin/bash
```

Searching Docker Hub

```
docker search puppet
```

Login with Docker hub

```
docker login
```

Sample Docker File.

```
FROM ubuntu:14.04
MAINTAINER Roy Martin "roy@roy-martin.com"
ENV REFRESHED_AT 2015-08-30
RUN apt-get update
RUN apt-get install -y nginx
RUN echo 'hi, i am in your container' \
    > /usr/share/nginx/html/index.html
EXPOSE 80
```

Push Docker images to Hub.

```
docker push [username]/[container name]
```

> Each instruction adds a new layer to the image then commits the image. Docker executing instructions roughly follow a workflow.
  - Docker runs a container from the image.
  - An instruction executes and makes a change to the container.
  - Docker runs the equivalent of docker commit to commit a new layer.
  - Docker then runs a new container from this new image.
  - The next instruction in the file is executed, and then process repeats until all instructions have been executed.
  - This means that if your Dockerfile stops for some reason, you will be left with an image you can use.

Docker instructions
- CMD: command line to run when a container is launched. This can be overwritten with the Docke run command.
- ENTRYPOINT: Similar to CMD but not as easy to override.
- WORKDIR: Specify the working directory prior to running commands.
- ENV: setup environment variables. Can be referenced with $.
- USER: User that image should be run as.
- VOLUME: Adds volumes to any container created from the image. A volume, is a specify designated directory within one or more containers that bypasses the Union File System to ... for persistent or shared data.
  - Volumes can be shared and reused between containers. a container doesn't have to be runningto share its volumes.
  - Changes to a volume will not be included when you update an image.
  - Volumes persist until no containers use them.

- ADD: add files and directory from our build environment into our image. Specified as a source and destination.
  - When adding files Docker uses the ending character of the destination to determine what the source is. If the destination ends in a / then it considered the source a directory. If it doesn't end in a /, it considers the source a file.
  - The source can also be a URL or tar file

- COPY: Similar to add, exepct it is limited in scope and doens't contianer url, untar functionality.
- LABEL: Add metadata in the form of key/value pairs.
- ONBUILD: trggers inserts a new instruction in the build process.

### Chapter 5
Building a container from a Dockerfile

```
docker build -t [username]/[container name] .
```
