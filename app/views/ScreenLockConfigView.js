import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet, FlatList, View, Text, Linking, Switch, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import I18n from '../i18n';
import { themedHeader } from '../utils/navigation';
import { withTheme } from '../theme';
import { themes, SWITCH_TRACK_COLOR } from '../constants/colors';
import sharedStyles from './Styles';
import StatusBar from '../containers/StatusBar';
import Separator from '../containers/Separator';
import ListItem from '../containers/ListItem';
import { CustomIcon } from '../lib/Icons';
import database from '../lib/database';
import { connect } from 'react-redux';

const DEFAULT_AUTO_LOCK = [
	{
		title: 'After 1 minute',
		value: 60
	},
	{
		title: 'After 5 minutes',
		value: 300
	},
	{
		title: 'After 15 minutes',
		value: 900
	},
	{
		title: 'After 30 minutes',
		value: 1800
	},
	{
		title: 'After 1 hour',
		value: 3600
	}
];

const styles = StyleSheet.create({
	listPadding: {
		paddingVertical: 36
	},
	info: {
		paddingTop: 25,
		paddingBottom: 18,
		paddingHorizontal: 16
	},
	infoText: {
		fontSize: 16,
		...sharedStyles.textRegular
	},
	sectionSeparatorBorder: {
		...sharedStyles.separatorVertical,
		height: 36
	},
});

const SectionSeparator = React.memo(({ theme }) => (
	<View
		style={[
			styles.sectionSeparatorBorder,
			{
				borderColor: themes[theme].separatorColor,
				backgroundColor: themes[theme].auxiliaryBackground
			}
		]}
	/>
));
SectionSeparator.propTypes = {
	theme: PropTypes.string
};

class ScreenLockConfigView extends React.Component {
	static navigationOptions = ({ screenProps }) => ({
		title: I18n.t('Screen_lock'),
		...themedHeader(screenProps.theme)
	})

	static propTypes = {
		theme: PropTypes.string
	}

	constructor(props) {
		super(props);
		this.state = {
			autoLock: false,
			autoLockTime: null,
			supported: []
		};
		this.init();
	}

	init = async() => {
		const { server } = this.props;
		const serversDB = database.servers;
		const serversCollection = serversDB.collections.get('servers');
		try {
			this.serverRecord = await serversCollection.find(server);
			this.setState({ autoLock: this.serverRecord?.autoLock, autoLockTime: this.serverRecord?.autoLockTime });
		} catch (error) {
			// TODO: raise error in case server wasn't found and pop?
		}
	}

	save = async() => {
		const { autoLock, autoLockTime } = this.state;
		const serversDB = database.servers;
		await serversDB.action(async() => {
			await this.serverRecord?.update((record) => {
				record.autoLock = autoLock;
				record.autoLockTime = autoLockTime;
			});
		});
	}

	autoLock = () => {
		this.setState(({ autoLock }) => ({ autoLock: !autoLock }), () => this.save());
	}

	isSelected = (value) => {
		const { autoLockTime } = this.state;
		return autoLockTime === value;
	}

	changeAutoLockTime = (autoLockTime) => {
		this.setState({ autoLockTime }, () => this.save());
	}

	renderSeparator = () => {
		const { theme } = this.props;
		return <Separator theme={theme} />;
	}

	renderIcon = () => {
		const { theme } = this.props;
		return <CustomIcon name='check' size={20} color={themes[theme].tintColor} />;
	}

	renderItem = ({ item }) => {
		const { theme } = this.props;
		const { title, value } = item;
		return (
			<>
				<ListItem
					title={title}
					onPress={() => this.changeAutoLockTime(value)}
					right={this.isSelected(value) ? this.renderIcon : null}
					theme={theme}
				/>
				<Separator theme={theme} />
			</>
		);
	}

	renderSwitch = () => {
		// const { allowCrashReport } = this.props;
		const { autoLock } = this.state;
		return (
			<Switch
				value={autoLock}
				trackColor={SWITCH_TRACK_COLOR}
				onValueChange={this.autoLock}
			/>
		);
	}

	renderAutoLockItems = () => {
		const { autoLock, supported } = this.state;
		const { theme } = this.props;
		if (!autoLock) {
			return null;
		}
		return (
			<>
				<View style={{ height: 36 }} />
				<Separator theme={theme} />
				{autoLock ? DEFAULT_AUTO_LOCK.concat(supported).map(item => this.renderItem({ item })) : null}
			</>
		);
	}

	render() {
		const { autoLock, supported } = this.state;
		const { theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].auxiliaryBackground }]}
				forceInset={{ vertical: 'never' }}
				testID='default-browser-view'
			>
				<StatusBar theme={theme} />
				<ScrollView
					keyExtractor={item => item.value}
					contentContainerStyle={styles.listPadding}
				>
					<Separator theme={theme} />
					<ListItem
						title='Unlock with METHODHERE'
						right={() => this.renderSwitch()}
						theme={theme}
					/>
					<Separator theme={theme} />
					{this.renderAutoLockItems()}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server.server
});

export default connect(mapStateToProps)(withTheme(ScreenLockConfigView));
