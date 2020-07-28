import React from 'react';
import {
	View, SafeAreaView, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';

import StatusBar from '../../containers/StatusBar';
import BrowserView from '../../containers/BrowserView';

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
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('title', 'Milchstrasse')
	});

	static propTypes = {
		navigation: PropTypes.object
	};

	render() {
		const { navigation } = this.props;
		const url = navigation.getParam('url', '');
		return (
			<SafeAreaView style={styles.container} testID='settings-view'>
				<StatusBar />
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

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteView);
