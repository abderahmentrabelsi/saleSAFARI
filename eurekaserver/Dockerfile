FROM openjdk:17-alpine
RUN apk --no-cache add curl
RUN apk --no-cache add bash
EXPOSE 8761
ADD target/eurekaserver-0.0.1-SNAPSHOT.jar eurekaserver-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/eurekaserver-0.0.1-SNAPSHOT.jar"]
