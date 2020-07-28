import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Touchable from 'react-native-platform-touchable';
import { settings as RocketChatSettings } from '@rocket.chat/sdk';

import { avatarURL } from '../utils/avatar';
import Emoji from './markdown/Emoji';

const Avatar = ({
	text, size, baseUrl, borderRadius, style, avatar, type, children, userId, token, onPress, theme, emoji, getCustomEmoji, forceReload
}) => {
	const avatarStyle = {
		width: size,
		height: size,
		borderRadius
	};

	const [, setValue] = useState(0);

	useEffect(() => {
		setValue(value => value + 1);
	}, [forceReload]);

	if (!text && !avatar) {
		return null;
	}

	let uri = avatarURL({
		type, text, size, userId, token, avatar, baseUrl
	});

	if (forceReload) {
		uri += `&tc=${ forceReload }`;
	}

	let image = emoji ? (
		<Emoji
			theme={theme}
			baseUrl={baseUrl}
			getCustomEmoji={getCustomEmoji}
			isMessageContainsOnlyEmoji
			literal={emoji}
		/>
	) : (
		<FastImage
			style={avatarStyle}
			source={{
				uri,
				headers: RocketChatSettings.customHeaders,
				priority: FastImage.priority.high,
				cache: FastImage.cacheControl.web
			}}
		/>
	);

	if (onPress) {
		image = (
			<Touchable onPress={onPress}>
				{image}
			</Touchable>
		);
	}

	return (
		<View style={[avatarStyle, style]}>
			{image}
			{children}
		</View>
	);
};

Avatar.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	style: PropTypes.any,
	text: PropTypes.string,
	avatar: PropTypes.string,
	emoji: PropTypes.string,
	size: PropTypes.number,
	borderRadius: PropTypes.number,
	type: PropTypes.string,
	children: PropTypes.object,
	userId: PropTypes.string,
	token: PropTypes.string,
	theme: PropTypes.string,
	onPress: PropTypes.func,
	getCustomEmoji: PropTypes.func,
	forceReload: PropTypes.string
};

Avatar.defaultProps = {
	text: '',
	size: 25,
	type: 'd',
	borderRadius: 4
};

export default Avatar;
