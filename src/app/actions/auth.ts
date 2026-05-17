
'use server';

/**
 * Server Action to verify the application password.
 * Keeps the password secure on the server side.
 */
export async function verifyPassword(password: string) {
  const correctPassword = process.env.APP_PASSWORD || 'voterfront123';
  return password === correctPassword;
}
