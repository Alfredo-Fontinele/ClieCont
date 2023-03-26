interface IInputObject {
    [x: string]: string | undefined | null;
}

export const removeFalseValues = (input: IInputObject): IInputObject => {
    const output: IInputObject = {};
    for (const [key, value] of Object.entries(input)) {
        if (value) {
            output[key] = value;
        }
    }
    return output;
};
