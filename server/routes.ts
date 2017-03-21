/**
 * Main application routes
 */
import {userRoutes} from './mongo-db/api/user/user.router';
// DO NOT REMOVE: template route imports
import {authRoutes} from './mongo-db/auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  // DO NOT REMOVE: template routes
  app.use('/auth', authRoutes);
};
