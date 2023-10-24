package io.salesafari.apigateway;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class CustomTokenRelayGatewayFilterFactory extends AbstractGatewayFilterFactory<Object> {

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().getFirst("Authorization");
            if (token != null) {
                return chain.filter(
                        exchange.mutate()
                                .request(r -> r.headers(headers -> headers.add("Authorization", token))
                                ).build()
                );
            }
            return chain.filter(exchange);
        };
    }

}
