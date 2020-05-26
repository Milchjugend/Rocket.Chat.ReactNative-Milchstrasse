import React from 'react';
import {
	View, SafeAreaView, Text, ActivityIndicator
} from 'react-native';
import {
	WebView
} from 'react-native-webview';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';

import StatusBar from '../../containers/StatusBar';

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

	constructor(props) {
		super(props);
		this.state = { visible: true };
	}

	hideSpinner=() => {
		this.setState({ visible: false });
	};

	showSpinner=() => {
		this.setState({ visible: true });
	};

	render() {
		const { navigation } = this.props;
		const { visible } = this.state;
		const url = navigation.getParam('url', '');
		return (
			<SafeAreaView style={styles.container} testID='settings-view'>
				<StatusBar />
				<WebView
					onLoadStart={() => (this.showSpinner())}
					onLoad={() => this.hideSpinner()}
					source={{ uri: url }}
				/>
				{visible && (
					<ActivityIndicator
						style={{
							flex: 1,
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							position: 'absolute',
							alignItems: 'center',
							justifyContent: 'center'
						}}
						size='large'
					/>
				)}
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
