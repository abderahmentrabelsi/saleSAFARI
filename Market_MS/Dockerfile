FROM openjdk:19
EXPOSE 8082
ADD target/Market_MS-0.0.1-SNAPSHOT.jar Market_MS-docker.jar
ENTRYPOINT ["java","-jar","/Market_MS-docker.jar"]