import React from 'react';
import {
	View, SafeAreaView, Text, ActivityIndicator
} from 'react-native';
import {
	WebView
} from 'react-native-webview';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { HeaderBackButton } from 'react-navigation-stack';
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
			<SafeAreaView style={styles.container} testID='settings-view'>
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
	allowCrashReport: state.crashReport.allowCrashReport
});

const mapDispatchToProps = dispatch => ({
	toggleCrashReport: params => dispatch(toggleCrashReportAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityProfileView);
