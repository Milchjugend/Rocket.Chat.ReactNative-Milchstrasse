import React from 'react';
import {
	View, Text, Image, TouchableOpacity, BackHandler
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Orientation from 'react-native-orientation-locker';

import { selectServerRequest, serverInitAdd, serverFinishAdd } from '../../actions/server';
import { appStart as appStartAction } from '../../actions';
import I18n from '../../i18n';
import Button from './Button';
import styles from './styles';
import { isIOS, isNotch } from '../../utils/deviceInfo';
import EventEmitter from '../../utils/events';
import { CustomIcon } from '../../lib/Icons';
import StatusBar from '../../containers/StatusBar';
import { COLOR_PRIMARY } from '../../constants/colors';

class OnboardingView extends React.Component {
	static navigationOptions = () => ({
		header: null
	})

	static propTypes = {
		navigation: PropTypes.object,
		adding: PropTypes.bool,
		selectServer: PropTypes.func.isRequired,
		currentServer: PropTypes.string,
		initAdd: PropTypes.func,
		finishAdd: PropTypes.func,
		appStart: PropTypes.func
	}

	constructor(props) {
		super(props);
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		this.previousServer = props.navigation.getParam('previousServer');
		Orientation.lockToPortrait();
	}

	componentDidMount() {
		const { initAdd } = this.props;
		if (this.previousServer) {
			initAdd();
		}
		EventEmitter.addEventListener('NewServer', this.handleNewServerEvent);
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillUnmount() {
		const {
			selectServer, currentServer, adding, finishAdd
		} = this.props;
		if (adding) {
			if (this.previousServer !== currentServer) {
				selectServer(this.previousServer);
			}
			finishAdd();
		}
		EventEmitter.removeListener('NewServer', this.handleNewServerEvent);
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		const { appStart } = this.props;
		appStart('background');
		return false;
	}

	close = () => {
		const { appStart } = this.props;
		appStart('inside');
	}

	newServer = (server) => {
		const { navigation } = this.props;
		navigation.navigate('NewServerView', { server });
	}

	handleNewServerEvent = (event) => {
		const { server } = event;
		this.newServer(server);
	}

	connectMilchstrasseServer = () => {
		this.newServer('https://chat.milchjugend.ch');
	}

	renderClose = () => {
		if (this.previousServer) {
			let top = 15;
			if (isIOS) {
				top = isNotch ? 45 : 30;
			}
			return (
				<TouchableOpacity
					style={[styles.closeModal, { top }]}
					onPress={this.close}
					testID='onboarding-close'
				>
					<CustomIcon
						name='cross'
						size={30}
						color={COLOR_PRIMARY}
					/>
				</TouchableOpacity>
			);
		}
		return null;
	}

	render() {
		return (
			<SafeAreaView style={styles.container} testID='onboarding-view'>
				<StatusBar light />
				<Image style={styles.onboarding} source={{ uri: 'onboarding' }} fadeDuration={0} />
				<Text style={styles.title}>{I18n.t('Landing_title')}</Text>
				<Text style={styles.subtitle}>{I18n.t('Landing_subtitle')}</Text>
				<View style={styles.buttonsContainer}>
					<Button
						type='secondary'
						title={I18n.t('Connect_to_milchstrasse')}
						icon={<CustomIcon name='permalink' size={30} color={COLOR_PRIMARY} />}
						onPress={this.connectMilchstrasseServer}
						testID='connect-milchstrasse-button'
					/>
				</View>
				{this.renderClose()}
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	currentServer: state.server.server,
	adding: state.server.adding
});

const mapDispatchToProps = dispatch => ({
	initAdd: () => dispatch(serverInitAdd()),
	finishAdd: () => dispatch(serverFinishAdd()),
	selectServer: server => dispatch(selectServerRequest(server)),
	appStart: root => dispatch(appStartAction(root))
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingView);
