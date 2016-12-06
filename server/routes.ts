/**
 * Main application routes
 */
import {userRoutes} from './api/user/user.router';
import {authRoutes} from './auth/auth.router';

export function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  app.use('/auth', authRoutes);
};
