/**
 * Main application routes
 */
import {userRoutes} from './api/user/user.router';
import {wonderRoutes} from './api/wonder/wonder.router';
// DO NOT REMOVE: template route imports
import {authRoutes} from './auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  app.use('/api/wonders', wonderRoutes);
  // DO NOT REMOVE: template routes
  app.use('/auth', authRoutes);
};
