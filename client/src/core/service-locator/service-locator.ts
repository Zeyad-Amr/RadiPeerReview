import ServiceKeys from './service-keys';

class ServiceLocator {
    private static instance: ServiceLocator;

    public static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    private services: { [key: string]: any } = {

    };

    registerFactory<T>(key: ServiceKeys, factory: () => T): void {
        this.services[key] = factory;
    }

    get<T>(key: ServiceKeys): T {
        const name = ServiceKeys[key];
        if (this.services.hasOwnProperty(name)) {
            return this.services[name]() as T;
        } else {
            throw new Error(`Service '${name}' not registered in the service locator.`);
        }
    }

    hasService(key: ServiceKeys): boolean {
        const name = ServiceKeys[key];
        return this.services.hasOwnProperty(name);
    }

    clear(): void {
        this.services = {};
    }

    remove(key: ServiceKeys): void {
        const name = ServiceKeys[key];
        if (this.services.hasOwnProperty(name)) {
            delete this.services[name];
        }
    }

    getAllServices(): { [key: string]: any } {
        return this.services;
    }

}

const sl = ServiceLocator.getInstance();
export default sl;
