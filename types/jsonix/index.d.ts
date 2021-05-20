declare module 'jsonix' {

    interface Unmarshaller<T> {
        unmarshalString(arg: string): T;
    }

    interface Marshaller<T> {
        marshalString(object: T): string;
    }
    namespace Jsonix {
        class Context {
            constructor(
                s: any[],
                options?: { namespacePrefixes?: { [key: string]: string } }
            );

            createMarshaller<T>(): Marshaller<T>;

            createUnmarshaller<T>(): Unmarshaller<T>;
        }
    }
}
declare module 'w3c-schemas' {
    var XSD_1_0: Object;
}