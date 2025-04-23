// Configuration for the Interstellar proxy
// This is a client-side version of the server-side config.js

interface Config {
  challenge: boolean
  users: Record<string, string>
}

const config: Config = {
  challenge: false,
  users: {
    admin: "admin",
    user: "password",
  },
}

export default config
