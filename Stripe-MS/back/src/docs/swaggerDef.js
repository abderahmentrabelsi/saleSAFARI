import package$0 from "../../package.json" assert { type: "json" };
import config from "../config/config.js";
const { version } = package$0;
const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'SmartGym API documentation',
        version,
        license: {
            name: 'proprietary',
            url: 'https://github.com/TheRealMkadmi/pi-dev-twin',
        },
    },
    servers: [
        {
            url: `http://localhost:${config.port}/api`,
        },
    ],
};
export default swaggerDef;
