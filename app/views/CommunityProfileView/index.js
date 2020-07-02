import React from 'react';
import {
	View, SafeAreaView, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { HeaderBackButton } from 'react-navigation-stack';
import BrowserView from '../../containers/BrowserView';
import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';
import { DrawerButton } from '../../containers/HeaderButton';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import { themedHeader } from '../../utils/navigation';
import { themes } from '../../constants/colors';
import I18n from '../../i18n';

const ItemInfo = React.memo(({ info }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoText}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string
};

class CommunityProfileView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		...themedHeader(screenProps.theme),
		headerLeft: screenProps.split ? (
			<HeaderBackButton
				onPress={() => navigation.navigate('SettingsView')}
				tintColor={themes[screenProps.theme].headerTintColor}
			/>
		) : (
			<DrawerButton navigation={navigation} />
		),
		title: I18n.t('Community_Profile')
	})

	render() {
		return (
			<SafeAreaView style={styles.container} testID='settings-view'>
				<StatusBar />
				<BrowserView url='https://app.milchjugend.ch/members/me' />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server,
	allowCrashReport: state.crashReport.allowCrashReport
});

const mapDispatchToProps = dispatch => ({
	toggleCrashReport: params => dispatch(toggleCrashReportAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityProfileView);
