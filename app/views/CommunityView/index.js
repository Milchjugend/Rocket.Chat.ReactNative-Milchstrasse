import React from 'react';
import {
	View, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';
import StatusBar from '../../containers/StatusBar';
import BrowserView from '../../containers/BrowserView';
import SafeAreaView from '../../containers/SafeAreaView';
import styles from './styles';

import I18n from '../../i18n';
import { withTheme } from '../../theme';
import * as HeaderButton from "../../containers/HeaderButton";

const ItemInfo = React.memo(({ info }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoText}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string
};

class CommunityView extends React.Component {
	static navigationOptions = ({ navigation, isMasterDetail }) => ({
		headerLeft: isMasterDetail ? undefined : () => <HeaderButton.Drawer navigation={navigation} testID='settings-view-close'/>,
		title: I18n.t('Community')
	})

	static propTypes = {
		theme: PropTypes.string
	}

	render() {
		const { theme } = this.props;
		return (
			<SafeAreaView theme={theme} style={styles.container} testID='settings-view'>
				<StatusBar theme={theme} />
				<BrowserView url='https://app.milchjugend.ch/members/' />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CommunityView));
