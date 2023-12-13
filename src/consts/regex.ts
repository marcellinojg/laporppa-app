export const REGEX = {
    EMAIL: RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    PHONE_IDN: RegExp(/^(0)8[1-9][0-9]{6,12}$/),
    NIK: RegExp(/^\d{6}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/),
    ALPHABETIC_ONLY: RegExp(/^[a-zA-Z ]*$/),
    NUMERIC_RT_RW: RegExp(/^\d{2}$/),
}