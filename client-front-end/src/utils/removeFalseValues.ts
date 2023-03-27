export const removeFalseValues = (input: any) => {
    const output: any = {};
    for (const [key, value] of Object.entries(input)) {
        if (value) {
            output[key] = value;
        }
    }
    return output;
};
