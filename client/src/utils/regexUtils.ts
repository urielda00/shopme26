export const passwordRegex = {
    min4: /.{4,}/,
    digit: /(?=.*?[0-9])/,
    upperCase: /(?=.*?[A-Z])/,
    lowerCase: /(?=.*?[a-z])/,
};