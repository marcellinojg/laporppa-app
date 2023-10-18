export const REGEX = {
    EMAIL: RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    PHONE_IDN: RegExp(/^(0)8[1-9][0-9]{6,9}$/),
    ALPHABETIC_ONLY: RegExp(/^[a-zA-Z ]*$/),
}