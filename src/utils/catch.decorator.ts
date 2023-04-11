type HandlerFunction = (error: Error) => void;

export const Catch = (errorName: string, handler: HandlerFunction) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            try {
                const result = original.apply(this, args);

                if (result && result instanceof Promise) {
                    return result.catch(error => {
                        catchError(error, errorName, handler);
                    })
                }

                return result;
            } catch (error) {
                catchError(error, errorName, handler)
            }
        }
    }
}

const catchError = (error: Error, errorName: string, handler: HandlerFunction) => {
    if (error.name === errorName) {
        handler(error);
    } else {
        throw error;
    }
}