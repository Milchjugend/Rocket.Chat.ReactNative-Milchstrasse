import React from 'react';
import {
	View, SafeAreaView, Text, ActivityIndicator
} from 'react-native';
import {
	WebView
} from 'react-native-webview';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleMarkdown as toggleMarkdownAction } from '../../actions/markdown';
import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';
import { DrawerButton } from '../../containers/HeaderButton';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import sharedStyles from '../Styles';

const ItemInfo = React.memo(({ info }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoText}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string
};

class CommunityProfileView extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: <DrawerButton navigation={navigation} />,
		title: navigation.getParam('title', 'Milchstrasse')
	});

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
		const { visible } = this.state;
		return (
			<SafeAreaView style={sharedStyles.listSafeArea} testID='settings-view'>
				<StatusBar />
				<WebView
					onLoadStart={() => (this.showSpinner())}
					onLoad={() => this.hideSpinner()}
					source={{ uri: 'https://app.milchjugend.ch/members/me' }}
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
	useMarkdown: state.markdown.useMarkdown,
	allowCrashReport: state.crashReport.allowCrashReport
});

const mapDispatchToProps = dispatch => ({
	toggleMarkdown: params => dispatch(toggleMarkdownAction(params)),
	toggleCrashReport: params => dispatch(toggleCrashReportAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityProfileView);
