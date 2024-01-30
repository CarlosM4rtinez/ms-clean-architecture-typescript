import logger from "../../../../../../helpers/logger/src/Logger.js";

export default class RoutePrinterUtil {

    constructor(app) {
        this.app = app;
    }

    printAllRoutes() {
        logger.info({ title: "Services exposed by the microservice:", ...this.getAllRoutes() });

    }

    getAllRoutes() {
        const routes = {};
        this.app._router.stack.forEach((middleware) => {
            if (middleware.route) {
                routes[`service_${Object.keys(routes).length}`] = this.getServicePathFromMiddleware(middleware);
            } else if (middleware.name === 'router') {
                const domain = this.getDomainFromRegexp(middleware.regexp).concat("_services");
                routes[domain] = this.getRoutesByDomain(middleware);
            }
        });
        return routes;
    }

    getRoutesByDomain(middleware) {
        return middleware.handle.stack.map((handler) => this.getServicePath(handler, middleware));
    }

    getDomainFromRegexp(regexp) {
        return `${regexp}`.split("/")[4].replace(/\\/g, '');
    }

    getHost() {
        return `http://localhost:${process.env.SERVER_PORT}`;
    }

    getServicePath(handler, middleware) {
        const method = Object.keys(handler.route.methods);
        const host = this.getHost();
        const domainPath = `${middleware.regexp}`.replace(/\/\^|\\/g, '').replace('/?(?=/|$)/i', '');
        const path = handler.route.path;
        return `${host}${domainPath}${path} -> ${method}`;
    }

    getServicePathFromMiddleware(middleware) {
        const method = Object.keys(middleware.route.methods);
        const host = this.getHost();
        const path = middleware.route.path;
        return `${host}${path} -> ${method}`;
    }

}