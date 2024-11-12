export function removeEmptyFields(obj: { [key: string]: any }) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );
}

