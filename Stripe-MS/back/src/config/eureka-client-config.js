// eureka-client-config.js
import {Eureka} from 'eureka-js-client';

const client = new Eureka({
    instance: {
        app: 'stripe-ms',
        hostName: 'stripe-ms', // Update to the hostname of your Express.js server
        ipAddr: '127.0.0.1', // The IP address of your Express.js server
        port: {
            $: 3000, // Port your Express.js application is running on
            '@enabled': true,
        },
        vipAddress: 'stripe-ms',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'eureka-server', // The hostname of your Eureka server
        port: 8761, // The port of your Eureka server
        servicePath: '/eureka/apps/',
    },

});

export default client;
