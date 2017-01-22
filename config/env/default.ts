/*
==============================================================================================
These configuration settings get called no matter what Node's process.env.NODE_ENV is set to.
==============================================================================================
*/

export const defaultConfig = {
  // Change to use https
  https_secure: false,
  // You will need to generate a self signed ssl certificate
  // using the generator in ./scripts or use a trusted certificate
  cert_loc: './server/sslcerts/cert.pem',
  key_loc: './server/sslcerts/key.pem',

  port: process.env.PORT || 5000,
  host: process.env.HOST || '0.0.0.0',
  // Session Cookie settings
  sessionCookie: {
    // session expiration is set by default to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false
  },
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: process.env.SESSION_SECRET || 'APP',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  userRoles: ['guest', 'user', 'admin']
};
