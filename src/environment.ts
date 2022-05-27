type Env = keyof typeof ENV;

const ENV = {
  dev: {
    apiUrl: "https://dda2-108-31-65-13.ngrok.io",
  },
  prod: {
    apiUrl: "https://app.cornerstone-schools.org",
  },
};

const getEnvVars = (env?: Env) => {
  if (env) {
    return ENV[env];
  }
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars;
