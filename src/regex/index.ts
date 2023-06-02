/**
 * Will check for:
 * - minimum 8 characters
 * - at least 1 uppercase
 * - at least 1 lowercase
 * - at least 1 special character
 */
export const passwordRegex: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-={}|;:'\",.<>?]).{8,}$/;

export const emailRegex: RegExp =
  /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;

/**
 * Will check whether the given string has @ symbol in the start
 */
export const atRegex: RegExp = /^@.*/;

/**
 * Will check for any international mobile number
 */
export const mobileRegex: RegExp = /^[+][1-9]{1,3}-[6-9]{1}[0-9]{9}$/;
