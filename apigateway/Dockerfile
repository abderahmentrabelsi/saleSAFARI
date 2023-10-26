FROM openjdk:17-alpine
EXPOSE 8761
ADD target/apigateway-0.0.1-SNAPSHOT.jar apigateway-0.0.1-SNAPSHOT.jar
ADD wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

ENTRYPOINT ["/wait-for.sh", "-t", "240", "eureka-server:8761", "--", "java", "-jar", "/apigateway-0.0.1-SNAPSHOT.jar"]
