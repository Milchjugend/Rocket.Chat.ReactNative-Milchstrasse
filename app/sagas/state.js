import { takeLatest, select, put } from 'redux-saga/effects';

import RocketChat from '../lib/rocketchat';
import { setBadgeCount } from '../notifications/push';
import log from '../utils/log';
import { localAuthenticate, saveLastLocalAuthenticationSession } from '../utils/localAuthentication';
import * as actions from '../actions';
import { APP_STATE } from '../actions/actionsTypes';

const appHasComeBackToForeground = function* appHasComeBackToForeground() {
	const appRoot = yield select(state => state.app.root);
	if (appRoot === 'outside') {
		return;
	}
	const auth = yield select(state => state.login.isAuthenticated);
	if (!auth) {
		return;
	}
	try {
		const server = yield select(state => state.server.server);
		const localAuthResult = yield localAuthenticate(server);
		if (!localAuthResult) {
			yield put(actions.appStart('locked'));
		}
		setBadgeCount();
		return yield RocketChat.setUserPresenceOnline();
	} catch (e) {
		log(e);
	}
};

const appHasComeBackToBackground = function* appHasComeBackToBackground() {
	const appRoot = yield select(state => state.app.root);
	if (appRoot === 'outside') {
		return;
	}
	const auth = yield select(state => state.login.isAuthenticated);
	if (!auth) {
		return;
	}
	try {
		yield RocketChat.setUserPresenceAway();

		const server = yield select(state => state.server.server);
		yield saveLastLocalAuthenticationSession(server);
	} catch (e) {
		log(e);
	}
};

const root = function* root() {
	yield takeLatest(APP_STATE.FOREGROUND, appHasComeBackToForeground);
	yield takeLatest(APP_STATE.BACKGROUND, appHasComeBackToBackground);
};

export default root;
