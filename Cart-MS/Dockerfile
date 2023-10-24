FROM openjdk:8
EXPOSE 8088
ADD target/Cart_MS-0.0.1-SNAPSHOT.jar Cart_MS-docker.jar
ENTRYPOINT ["java","-jar","/Cart_MS-docker.jar"]