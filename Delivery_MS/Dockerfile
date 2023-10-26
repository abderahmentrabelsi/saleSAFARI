FROM openjdk:17
EXPOSE 8088
ADD target/Delivery-MS-0.0.1-SNAPSHOT.jar Delivery-MS-docker.jar
ENTRYPOINT ["java","-jar","/Delivery-MS-docker.jar"]
