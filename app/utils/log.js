import firebase from 'react-native-firebase';

export const { analytics } = firebase;

let metadata = {};

export const logServerVersion = (serverVersion) => {
	metadata = {
		serverVersion
	};
};

export const setCurrentScreen = (currentScreen) => {
	analytics().setCurrentScreen(currentScreen);
};

export default (e) => {
	console.log(e, metadata);
};
