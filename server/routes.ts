/**
 * Main application routes
 */
import {userRoutes} from './api/user/user.router';
// DO NOT REMOVE: template route imports
import {authRoutes} from './auth/auth.router';

export function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  // DO NOT REMOVE: template routes
  app.use('/auth', authRoutes);
};
