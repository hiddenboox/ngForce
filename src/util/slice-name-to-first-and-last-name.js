export default function sliceNameToFirstAndLastName(name) {
    if (!name) {
        return {};
    }

    return {
        firstName: name.slice(0, name.indexOf(' ')),
        lastName: name.slice(name.indexOf(' ') + 1),
        name,
    };
}