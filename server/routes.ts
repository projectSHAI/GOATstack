/**
 * Main application routes
 */
import {userRoutes} from './cassandra-db/api/user/user.router';
// DO NOT REMOVE: template route imports
import {authRoutes} from './cassandra-db/auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  // DO NOT REMOVE: template routes
  app.use('/auth', authRoutes);
};
