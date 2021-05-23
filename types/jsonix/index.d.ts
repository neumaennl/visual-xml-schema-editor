///<reference lib="dom" />
declare module 'jsonix' {
    namespace Jsonix {
        class Class {
            constructor(arguments: any[]);
        }
        namespace Util {
            function extend(destination: object, source: object): object;
            namespace Type {
                function exists(value: any): boolean;
                function isString(value: any): boolean;
                function isBoolean(value: any): boolean;
                function isObject(value: any): boolean;
                function isFunction(value: any): boolean;
                function isNumber(value: any): boolean;
                function isNumberOrNaN(value: any): boolean;
                function isNaN(value: any): boolean;
                function isArray(value: any): boolean;
                function isDate(value: any): boolean;
                function isRegExp(value: any): boolean;
                function isNode(value: any): boolean;
                function isEqual(a: any, b: any, report?: (message: string) => void): boolean;
                function cloneObject(source: object, target?: object): object;
                function defaultValue(args?: any[]): any | undefined;
            }
            namespace NumberUtils {
                function isInteger(value: any): boolean;
            }
            namespace StringUtils {
                function trim(str: string): string;
                function isEmpty(str: string): boolean;
                function isNotBlank(str: string): boolean;
                function splitBySeparatorChars(str: string, separatorChars: string): string[];
            }
            namespace Ensure {
                function ensureBoolean(value: any): void;
                function ensureString(value: any): void;
                function ensureNumber(value: any): void;
                function ensureNumberOrNaN(value: any): void;
                function ensureInteger(value: any): void;
                function ensureDate(value: any): void;
                function ensureObject(value: any): void;
                function ensureArray(value: any): void;
                function ensureFunction(value: any): void;
                function ensureExists(value: any): void;
            }
        }
        namespace XML {
            const XMLNS_NS: 'http://www.w3.org/2000/xmlns/';
            const XMLNS_P: 'xmlns';

            class QName extends Class {
                namespaceURI: string | null;
                localPart: string | null;
                prefix: string | null;
                key: string | null;
                string: string | null;

                constructor(one?: string, two?: string, three?: string);
                toString(): string | null;
                toCanonicalString(context?: Context): string;
                clone(): QName;
                equals(that: any): boolean;
                static fromString(qNameAsString: string, namespaceContext?: string, defaultNamespaceURI?: string): QName;
                static fromObject(object: object): QName;
                static fromObjectOrString(value: any, namespaceContext?: string, defaultNamespaceURI?: string): QName;
                static key(namespaceURI: string | null, localPart: string): string;
            }
            class Calendar extends Class {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
                second: number;
                fractionalSecond: number;
                timezone: number;
                date: Date | null;

                static MIN_TIMEZONE: number;
                static MAX_TIMEZONE: number;
                static DAYS_IN_MONTH: number[];

                constructor(data: object);
                static fromObject(object: object): Calendar;
                static validateYear(year: number): void;
                static validateMonth(month: number): void;
                static validateDay(day: number): void;
                static validateMonthDay(month: number, day: number): void;
                static validateYearMonthDay(year: number, month: number, day: number): void;
                static validateHour(hour: number): void;
                static validateMinute(minute: number): void;
                static validateSecond(second: number): void;
                static validateFractionalSecond(fractionalSecond: number): void;
                static validateTimezone(timezone: number): void;
            }
            class Input extends Class {
                root: Node | null;
                node: Node | null;
                attributes: NamedNodeMap | null;
                eventType: number | null;
                pns: { [key: string]: string }[] | null;

                static START_ELEMENT: number;
                static END_ELEMENT: number;
                static PROCESSING_INSTRUCTION: number;
                static CHARACTERS: number;
                static COMMENT: number;
                static SPACE: number;
                static START_DOCUMENT: number;
                static END_DOCUMENT: number;
                static ENTITY_REFERENCE: number;
                static ATTRIBUTE: number;
                static DTD: number;
                static CDATA: number;
                static NAMESPACE: number;
                static NOTATION_DECLARATION: number;
                static ENTITY_DECLARATION: number;

                constructor(node: Node);
                hasNext(): boolean;
                next(): number;
                enter(node: Node): number;
                leave(node: Node): number;
                getName(): QName | null;
                getNameKey(): string | null;
                getText(): string | null;
                nextTag(): number;
                skipElement(): number;
                getElementText(): string;
                retrieveElement(): Element;
                retrieveAttributes(): NamedNodeMap;
                getAttributeCount(): number;
                getAttributeName(index: number): QName;
                getAttributeNameKey(index: number): string;
                getAttributeValue(index: number): string;
                getAttributeValueNS(namespaceURI: string | null, localPart: string): string | null;
                getAttributeValueNSViaElement(namespaceURI: string | null, localPart: string): string | null;
                getAttributeValueNSViaAttribute(namespaceURI: string | null, localPart: string): string | null;
                getAttributeNodeNS(namespaceURI: string | null, localPart: string): Attr | null;
                getAttributeNodeNSViaElement(namespaceURI: string | null, localPart: string): Attr | null;
                getAttributeNodeNSViaAttribute(namespaceURI: string | null, localPart: string): Attr | null;
                getElement(): Element | null;
                pushNS(node: Node): void;
                popNS(): { [key: string]: string };
                getNamespaceURI(p: string): string;
            }
            class Output extends Class {
                document: Document | null;
                documentElement: Element | null;
                node: Node | null;
                nodes: Node[] | null;
                nsp: { [key: string]: string }[] | null;
                pns: { [key: string]: string }[] | null;
                namespacePrefixIndex: number;
                xmldom: null;

                constructor(options?: Options);
                destroy(): void;
                writeStartDocument(): Document;
                writeEndDocument(): Node | undefined;
                writeStartElement(name: QName): Element;
                writeEndElement(): Node | undefined;
                writeCharacters(text: string): Text;
                writeCdata(text: string): CDATASection;
                writeCdataWithoutCdend(text: string): CDATASection;
                writeAttribute(name: QName, value: string): void;
                writeNode(node: Node): Node;
                push(node: Node): Node;
                peek(): Node;
                pop(): Node | undefined;
                pushNS(): void;
                popNS(): void;
                declareNamespaces(): void;
                declareNamespace(ns: string, p: string): void;
                getPrefix(ns: string, p: string): string;
                getNamespaceURI(p: string): string;
            }
        }
        namespace DOM {
            function isDomImplementationAvailable(): boolean;
            function createDocument(): Document;
            function serialize(node: Node): string;
            function parse(text: string): Document;
            function load(url: string, callback: (doc: Document) => void, options?: Jsonix.Request.Options): void;
            function isXlinkFixRequired(): boolean;
        }
        class Request extends Class {
            issue(url: string, onSuccess?: (transport: XMLHttpRequest) => void, onFailure?: (transport: XMLHttpRequest) => void, options?: Jsonix.Request.Options): XMLHttpRequest;
            handleTransport(transport: XMLHttpRequest, onSuccess: (transport: XMLHttpRequest) => void, onFailure: (transport: XMLHttpRequest) => void): void;
            createTransport(): XMLHttpRequest;
        }
        namespace Request {
            type Options = {
                method?: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';
                async?: boolean;
                proxy?: string;
                user?: string;
                password?: string;
                headers?: { [key: string]: string };
                data?: any;
            }
            const INSTANCE: Jsonix.Request;
            var PROXY: string;
        }
        namespace Schema {

        }
        namespace Model {
            abstract class TypeInfo extends Class {
                module: Module | null;
                name: string | null;
                baseTypeInfo: TypeInfo | null;
                constructor();
                isBasedOn(typeInfo: TypeInfo): boolean;
            }
            class ClassInfo {
                localName: string | null;
                typeName: Jsonix.XML.QName | null;
                instanceFactory: object | null;
                properties: PropertyInfo[] | null;
                propertiesMap: { [key: string]: PropertyInfo } | null;
                structure: Structure | null;
                targetNamespace: string;
                defaultElementNamespaceURI: string;
                defaultAttributeNamespaceURI: string;
                built: boolean;
                constructor(mapping: object, options: Options);
                getPropertyInfoByName(name: string): PropertyInfo | undefined;
                destroy(): void;
                build(context: Context): void;
                buildStructure(context: Context, structure: Structure): void;
                //TODO: proper return type
                unmarshal(context: Context, input: Jsonix.XML.Input): object;
                //TODO: proper type for result
                unmarshalProperty(context: Context, input: Jsonix.XML.Input, propertyInfo: PropertyInfo, result: object): void;
                //TODO: proper type for result and value
                unmarshalPropertyValue(context: Context, input: Jsonix.XML.Input, propertyInfo: PropertyInfo, result: object, value: object): void;
                //TODO: proper type for value
                marshal(value: object, context: Context, output: Jsonix.XML.Output, scope?: Jsonix.Model.TypeInfo): void;
                //TODO: proper type for value
                isMarshallable(value: object, context?: Context, scope?: Jsonix.Model.TypeInfo): boolean;
                //TODO: proper type for value
                isInstance(value: object, context?: Context, scope?: Jsonix.Model.TypeInfo): boolean;
                b(baseTypeInfo: TypeInfo): ClassInfo;
                ps(): ClassInfo;
                p(mapping: object): void;
                aa(mapping: object): ClassInfo;
                ae(mapping: object): ClassInfo;
                a(mapping: object): ClassInfo;
                em(mapping: object): ClassInfo;
                e(mapping: object): ClassInfo;
                es(mapping: object): ClassInfo;
                er(mapping: object): ClassInfo;
                ers(mapping: object): ClassInfo;
                v(mapping: object): ClassInfo;
                addDefaultNamespaces(mapping: object): void;
                addProperty(property: PropertyInfo): ClassInfo;
                propertyInfoCreators: { [key: string]: (mapping: object) => void }
            }
            interface ClassInfo extends Jsonix.Model.TypeInfo, Jsonix.Mapping.Styled { }
            class EnumLeafInfo extends TypeInfo {
                //TODO: continue here
            }
            class ElementInfo extends Class {
                //TODO: continue here
            }
            abstract class PropertyInfo extends Class {
                //TODO: continue here
            }
            class AnyAttributePropertyInfo extends PropertyInfo {
                //TODO: continue here
            }
            namespace AnyAttributePropertyInfo {
                class Simplified extends AnyAttributePropertyInfo {
                    //TODO: continue here
                }
            }
            class SingleTypePropertyInfo extends PropertyInfo {
                //TODO: continue here
            }
            class AttributePropertyInfo extends SingleTypePropertyInfo {
                //TODO: continue here
            }
            class ValuePropertyInfo extends SingleTypePropertyInfo {
                //TODO: continue here
            }
            abstract class AbstractElementsPropertyInfo extends PropertyInfo {
                //TODO: multiple inheritance + methods
            }
            class ElementPropertyInfo extends AbstractElementsPropertyInfo {
                //TODO: multiple inheritance + methods
            }
            class ElementsPropertyInfo extends AbstractElementsPropertyInfo {
                //TODO: multiple inheritance + methods
            }
            class ElementMapPropertyInfo extends AbstractElementsPropertyInfo {
                //TODO: continue here
            }
            class AbstractElementRefsPropertyInfo extends PropertyInfo {
                //TODO: multiple inheritance + methods
            }
            class ElementRefPropertyInfo extends AbstractElementRefsPropertyInfo {
                //TODO: continue here
            }
            namespace ElementRefPropertyInfo {
                class Simplified extends ElementRefPropertyInfo {
                    //TODO: multiple inheritance + methods
                }
            }
            class ElementRefsPropertyInfo extends AbstractElementRefsPropertyInfo {
                //TODO: continue here
            }
            namespace ElementRefsPropertyInfo {
                class Simplified extends ElementRefsPropertyInfo {
                    //TODO: multiple inheritance + methods
                }
            }
            class AnyElementPropertyInfo extends PropertyInfo {
                //TODO: multiple inheritance + methods
            }
            namespace AnyElementPropertyInfo {
                class Simplified extends AnyElementPropertyInfo {
                    //TODO: multiple inheritance + methods
                }
            }
            class Module extends Jsonix.Mapping.Styled {

            }
            type Structure = {
                elements: { [key: string]: ElementPropertyInfo | ElementsPropertyInfo | ElementMapPropertyInfo | AbstractElementRefsPropertyInfo | ElementRefPropertyInfo | ElementRefsPropertyInfo } | null,
                attributes: { [key: string]: AttributePropertyInfo },
                anyAttribute: AnyAttributePropertyInfo | null,
                value: ValuePropertyInfo | null;
                any: AnyElementPropertyInfo | null
            }
        }
        namespace Mapping {
            class Style extends Class {
                marshaller: Jsonix.Binding.Marshaller<unknown> | null;
                unmarshaller: Jsonix.Binding.Unmarshaller<unknown> | null;
                module: Jsonix.Model.Module | null;
                elementInfo: Jsonix.Model.ElementInfo | null;
                classInfo: Jsonix.Model.ClassInfo | null;
                enumLeafInfo: Jsonix.Model.EnumLeafInfo | null;
                anyAttributePropertyInfo: Jsonix.Model.AnyAttributePropertyInfo | null;
                anyElementPropertyInfo: Jsonix.Model.AnyElementPropertyInfo | null;
                attributePropertyInfo: Jsonix.Model.AttributePropertyInfo | null;
                elementMapPropertyInfo: Jsonix.Model.ElementMapPropertyInfo | null;
                elementPropertyInfo: Jsonix.Model.ElementPropertyInfo | null;
                elementsPropertyInfo: Jsonix.Model.ElementsPropertyInfo | null;
                elementRefPropertyInfo: Jsonix.Model.ElementRefPropertyInfo | null;
                elementRefsPropertyInfo: Jsonix.Model.ElementRefsPropertyInfo | null;
                valuePropertyInfo: Jsonix.Model.ValuePropertyInfo | null;

                static STYLES: { [key: string]: Jsonix.Mapping.Style };
            }
            class Styled extends Class {
                constructor(options?: Options);
            }
        }
        namespace Binding {

            namespace Marshalls {
                abstract class Element extends Class {
                    marshalElement(value: object, context: Jsonix.Context, output: Jsonix.XML.Output, scope: Jsonix.Model.TypeInfo): void;
                    getTypeInfoByElementName(name: string, context: Jsonix.Context, scope: Jsonix.Model.TypeInfo): Jsonix.Model.TypeInfo | undefined;
                }
                namespace Element {
                    class AsElementRef extends Class {
                        convertToTypedNamedValue(value: object, context: Jsonix.Context, output: Jsonix.XML.Output, scope: Jsonix.Model.TypeInfo): { name: Jsonix.XML.QName, value: object, type: Jsonix.Model.TypeInfo };
                        convertToNamedValue(elementValue: object, context: Jsonix.Context, output?: Jsonix.XML.Output, scope?: Jsonix.Model.TypeInfo): { name: Jsonix.XML.QName, value: object };
                    }
                }
            }
            namespace Unmarshalls {
                abstract class WrapperElement extends Class {
                    mixed: boolean;
                    unmarshalWrapperElement(context: Jsonix.Context, input: Jsonix.XML.Input, scope: Jsonix.Model.TypeInfo, callback: (node: Node) => void): void
                }
                class Element extends Class {
                    allowTypedObject: boolean;
                    allowDom: boolean;
                    unmarshalElement(context: Jsonix.Context, input: Jsonix.XML.Input, scope: Jsonix.Model.TypeInfo, callback: (node: Node) => void): void;
                    getTypeInfoByInputElement(context: Jsonix.Context, input: Jsonix.XML.Input, scope: Jsonix.Model.TypeInfo): Jsonix.Model.TypeInfo;
                    getTypeInfoByElementName(name: Jsonix.XML.QName, context: Jsonix.Context, scope: Jsonix.Model.TypeInfo): Jsonix.Model.TypeInfo | undefined;
                }
                namespace Element {
                    class AsElementRef extends Class {
                        convertFromTypedNamedValue(typedNamedValue: { name: Jsonix.XML.QName, value: object, type: Jsonix.Model.TypeInfo }, context?: Jsonix.Context, input?: Jsonix.XML.Input, scope?: Jsonix.Model.TypeInfo): { name: Jsonix.XML.QName, value: object };
                    }
                    class AsSimplifiedElementRef extends Class {
                        convertFromTypedNamedValue(typedNamedValue: { name: Jsonix.XML.QName, value: object, type: Jsonix.Model.TypeInfo }, context?: Jsonix.Context, input?: Jsonix.XML.Input, scope?: Jsonix.Model.TypeInfo): { [key: string]: object };
                    }
                }
            }
            class Marshaller<T> {
                context: Context;
                constructor(context: Context);
                marshalString(object: T): string;
                marshalDocument(object: T): Document;
            }
            interface Marshaller<T> extends Jsonix.Binding.Marshalls.Element, Jsonix.Binding.Marshalls.Element.AsElementRef { }
            namespace Marshaller {
                interface Simplified<T> extends Marshaller<T> { }
            }
            class Unmarshaller<T> {
                context: Context;
                allowTypedObject: boolean;
                allowDom: boolean;
                constructor(context: Context);
                unmarshalString(arg: string): T;
                unmarshalURL(url: string, callback: (doc: Document) => void, options?: Jsonix.Request.Options): T;
                unmarshalFile(fileName: string, callback: (doc: Document) => void, options?: Jsonix.Request.Options): T;
                unmarshalDocument(doc: Document, scope?: Jsonix.Model.TypeInfo): T;
            }
            interface Unmarshaller<T> extends Jsonix.Binding.Unmarshalls.Element, Jsonix.Binding.Unmarshalls.Element.AsElementRef { }
            namespace Unmarshaller {
                class Simplified<T> {
                    context: Context;
                    allowTypedObject: boolean;
                    allowDom: boolean;
                    constructor(context: Context);
                    unmarshalString(arg: string): T;
                    unmarshalURL(url: string, callback: (doc: Document) => void, options?: Jsonix.Request.Options): T;
                    unmarshalFile(fileName: string, callback: (doc: Document) => void, options?: Jsonix.Request.Options): T;
                    unmarshalDocument(doc: Document, scope?: Jsonix.Model.TypeInfo): T;
                }
                /**
                 * does in fact extend Unmarshaller and AsSimplifiedElementRef, 
                 * but that doesn't work in TypeScript because you can't override a method 
                 * and change its return type, which would have to be necessary for convertFromTypedNamedValue()
                 */
                interface Simplified<T> extends Jsonix.Binding.Unmarshalls.Element, Jsonix.Binding.Unmarshalls.Element.AsSimplifiedElementRef { }
            }
        }
        class Context extends Jsonix.Mapping.Styled {
            constructor(
                mappings: any[],
                options?: Options
            );

            createMarshaller<T>(): Jsonix.Binding.Marshaller<T>;

            createUnmarshaller<T>(): Jsonix.Binding.Unmarshaller<T>;
        }
        type Options = {
            namespacePrefixes?: { [key: string]: string };
            mappingStyle?: string;
            supportXsiType?: boolean;
        }
    }
}
declare module 'w3c-schemas' {
    const Atom_1_0: object;
    const WS_Addr_1_0_Core: object;
    const XHTML_1_0_Strict: object;
    const XLink_1_0: object;
    const XSD_1_0: object;
}