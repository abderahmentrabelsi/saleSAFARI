FROM openjdk:8
EXPOSE 9000
ADD target/dockertest.jar dockertest.jar
ENTRYPOINT ["java", "-jar", "dockertest.jar"]
