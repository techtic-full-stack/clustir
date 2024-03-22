/**
 * Replaces characters in the email address with asterisks to mask it.
 * 
 * @param email - The email address to be masked.
 * @returns The masked email address.
 */
const maskedEmail = (email: string): string => {
    const maskedEmail = email.replace(
      /(?<=.{1}).(?=[^@]*?@)|(?<=.{2})[^@](?=.*?@)/g,
      "*"
    );
    return maskedEmail;
}
export default maskedEmail;