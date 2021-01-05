import React from 'react';
import {
	View, SafeAreaView, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BrowserView from '../../containers/BrowserView';
import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';
import { CloseModalButton, DrawerButton } from '../../containers/HeaderButton';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';

import I18n from '../../i18n';
import { withTheme } from '../../theme';

const ItemInfo = React.memo(({ info }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoText}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string
};

class CommunityProfileView extends React.Component {
	static navigationOptions = ({ navigation, isMasterDetail }) => ({
		headerLeft: () => (isMasterDetail ? (
			<CloseModalButton navigation={navigation} testID='settings-view-close' />
		) : (
			<DrawerButton navigation={navigation} />
		)),
		title: I18n.t('Community_Profile')
	});

	static propTypes = {
		theme: PropTypes.string
	}

	render() {
		const { theme } = this.props;
		return (
			<SafeAreaView theme={theme} style={styles.container} testID='settings-view'>
				<StatusBar theme={theme} />
				<BrowserView url='https://app.milchjugend.ch/members/me' />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server,
	allowCrashReport: state.crashReport.allowCrashReport,
	isMasterDetail: state.app.isMasterDetail
});

const mapDispatchToProps = dispatch => ({
	toggleCrashReport: params => dispatch(toggleCrashReportAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CommunityProfileView));
