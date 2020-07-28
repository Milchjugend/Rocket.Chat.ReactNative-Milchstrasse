import React from 'react';
import PropTypes from 'prop-types';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { CustomIcon } from '../lib/Icons';
import { isIOS, isAndroid } from '../utils/deviceInfo';
import { themes } from '../constants/colors';
import I18n from '../i18n';
import { withTheme } from '../theme';

export const headerIconSize = 23;

const CustomHeaderButton = React.memo(withTheme(({ theme, ...props }) => (
	<HeaderButton
		{...props}
		IconComponent={CustomIcon}
		iconSize={headerIconSize}
		color={
			isAndroid
				? themes[theme].headerTitleColor
				: themes[theme].headerTintColor
		}
	/>
)));

export const CustomHeaderButtons = React.memo(props => (
	<HeaderButtons
		HeaderButtonComponent={CustomHeaderButton}
		{...props}
	/>
));

const CustomHeaderButtonMaterial = React.memo(withTheme(({ theme, ...props }) => (
	<HeaderButton
		{...props}
		IconComponent={MaterialIcons}
		iconSize={headerIconSize}
		color={
			isAndroid
				? themes[theme].headerTitleColor
				: themes[theme].headerTintColor
		}
	/>
)));

export const CustomHeaderButtonsMaterial = React.memo(props => (
	<HeaderButtons
		HeaderButtonComponent={CustomHeaderButtonMaterial}
		{...props}
	/>
));

export const DrawerButton = React.memo(({ navigation, testID, ...otherProps }) => (
	<CustomHeaderButtonsMaterial left>
		<Item title='drawer' iconName='menu' onPress={navigation.toggleDrawer} testID={testID} {...otherProps} />
	</CustomHeaderButtonsMaterial>
));

export const CloseModalButton = React.memo(({ navigation, testID, onPress = () => navigation.pop() }) => (
	<CustomHeaderButtons left>
		<Item title='close' iconName='cross' onPress={onPress} testID={testID} />
	</CustomHeaderButtons>
));

export const CancelModalButton = React.memo(({ onPress, testID }) => (
	<CustomHeaderButtons left>
		{isIOS
			? <Item title={I18n.t('Cancel')} onPress={onPress} testID={testID} />
			: <Item title='close' iconName='cross' onPress={onPress} testID={testID} />
		}
	</CustomHeaderButtons>
));

export const MoreButton = React.memo(({ onPress, testID }) => (
	<CustomHeaderButtons>
		<Item title='more' iconName='menu' onPress={onPress} testID={testID} />
	</CustomHeaderButtons>
));

export const SaveButton = React.memo(({ onPress, testID }) => (
	<CustomHeaderButtons>
		<Item title='save' iconName='Download' onPress={onPress} testID={testID} />
	</CustomHeaderButtons>
));

export const LegalButton = React.memo(({ navigation, testID }) => (
	<MoreButton onPress={() => navigation.navigate('LegalView')} testID={testID} />
));

CustomHeaderButton.propTypes = {
	theme: PropTypes.string
};
DrawerButton.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired
};
CloseModalButton.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired,
	onPress: PropTypes.func
};
CancelModalButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};
MoreButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};
SaveButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};
LegalButton.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired
};

export { Item };
