import * as Yup from "yup";

// Validate enum
const validateEnum = <T extends object>(enumObject: T): Yup.StringSchema<string | null | undefined> => {
    return Yup.string().oneOf(Object.values(enumObject).filter(value => typeof value === 'number').map(String) as string[]);
};

const transformAndDefault = <T extends Yup.Schema<any>>(schema: T): T => {
    return schema.transform((value, originalValue) => (originalValue !== undefined ? value : undefined)) as T;
};

export { validateEnum, transformAndDefault, Yup };