/**
 * Main application routes
 */
import {wonderRoutes} from './api/wonder/wonder.router';
import {userRoutes} from './api/user/user.router';
// DO NOT REMOVE: template route imports
import {authRoutes} from './auth/auth.router';

export function routes(app) {
	// Insert routes below
	app.use('/api/wonders', wonderRoutes);
	app.use('/api/users', userRoutes);
	// DO NOT REMOVE: template routes
	app.use('/auth', authRoutes);
};
