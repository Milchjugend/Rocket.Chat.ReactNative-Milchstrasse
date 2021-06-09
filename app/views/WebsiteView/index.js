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

import { withTheme } from '../../theme';

import styles from './styles';

const ItemInfo = React.memo(({ info }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoText}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string
};

class WebsiteView extends React.Component {
	static navigationOptions = ({ route }) => ({
		title: route.params.title || 'Milchstrasse'
	});

	static propTypes = {
		route: PropTypes.object,
		theme: PropTypes.string
	};

	render() {
		const { theme, route } = this.props;
		const { url } = route.params;
		return (
			<SafeAreaView theme={theme} style={styles.container} testID='settings-view'>
				<StatusBar theme={theme} />
				<BrowserView url={url} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(WebsiteView));
