export default function objectKeysToCase(obj, caseFn = camelCase) {
    if (Array.isArray(obj)) {
        return obj.map(item => objectKeysToCase(item, caseFn));
    }

    return Object.keys(obj).reduce((accumulator, current) => {
        const processedKey = caseFn(current);
        return {
            ...accumulator,
            [processedKey]: obj[current]
        };
    }, {});
}

export function camelCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}