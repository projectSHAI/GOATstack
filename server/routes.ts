/**
 * Main application routes
 */
import {userRoutes} from './sql-db/api/_user/user.router';
// DO NOT REMOVE: template route imports
import {authRoutes} from './sql-db/auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  // DO NOT REMOVE: template routes
  app.use('/auth', authRoutes);
};
