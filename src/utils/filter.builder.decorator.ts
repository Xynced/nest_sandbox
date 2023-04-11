export const CheckDefined = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (!args[0]) {
                return this;
            }
            return original.apply(this, args);
        }
    }
}
