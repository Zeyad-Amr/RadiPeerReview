export const allValuesUndefined = (obj: { [key: string]: any }): boolean => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key]) {
                return false;
            }
        }
    }
    return true;
}