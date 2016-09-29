'use strict';

module.exports = {
  app: {
    title: 'Discover Your Wonder',
    description: 'A social art app',
    repository: 'https://gitlab.com/projectSHAI/discoveryourwonder',
    keywords: ['node', 'express', 'static'],
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  // Change to use https
  https_secure: false,
  // You will need to generate a self signed ssl certificate
  // or use a trusted certificate
  cert_loc: './config/sslcerts/cert.pem',
  key_loc: './config/sslcerts/key.pem',

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
  logo: 'modules/core/client/img/brand/logo.png',
  favicon: 'modules/core/client/img/brand/republicanLogo.png',
  uploads: {
    profileUpload: {
      dest: './modules/users/client/img/profile/uploads/', // Profile upload destination path
      limits: {
        fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
      }
    },
    missionUpload: {
      dest: './modules/core/client/img/photos/tmp/', // Mission photo upload tmp destination
      ftpdest: '/www/uploads/missions/',
      limits: {
        fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
      }
    },
    galleryUpload: {
      dest: './modules/core/client/img/photos/tmp/', // Gallery photo upload tmp destination
      ftpdest: '/www/uploads/photo-gallery/',
      limits: {
        fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
      }
    }
  },
  dropboxAPI: {
    access_token: 'HkqQF1z-TFAAAAAAAAAAZmGDirwwJrTBxYGxjXvjrhrvOXqbRizZJpjX7oVha7ub'
  }
};
