const REQUIRED_CONTACT_ENV_VARS = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
] as const;

type RequiredContactEnvVar = (typeof REQUIRED_CONTACT_ENV_VARS)[number];

type ContactEmailEnv = Record<RequiredContactEnvVar, string>;

export function getContactEmailEnv(): ContactEmailEnv {
  const missingVars = REQUIRED_CONTACT_ENV_VARS.filter(
    (key) => !process.env[key]?.trim(),
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missingVars.join(
        ", ",
      )}. Add them to .env.local in the project root and restart the dev server.`,
    );
  }

  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY!.trim(),
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL!.trim(),
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL!.trim(),
  };
}
