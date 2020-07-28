import React from 'react';
import {
	ActivityIndicator, Linking
} from 'react-native';
import {
	WebView
} from 'react-native-webview';


import PropTypes from 'prop-types';

class BrowserView extends React.Component {
	constructor(props) {
		super(props);
		this.webview = React.createRef();
		this.state = { visible: true };
	}

	hideSpinner=() => {
		this.setState({ visible: false });
	};

	showSpinner=() => {
		this.setState({ visible: true });
	};

	handleNavigationStateChange=(event) => {
		if (event.url && !event.url.includes('app.milchjugend.ch')) {
			this.webview.current.stopLoading();
			Linking.openURL(event.url);
		}
	};

	render() {
		const { url, style } = this.props;
		const { visible } = this.state;
		return (
			<>
				<WebView
					onLoadStart={() => (this.showSpinner())}
					onLoad={() => this.hideSpinner()}
					source={{ uri: url }}
					ref={this.webview}
					onNavigationStateChange={this.handleNavigationStateChange}
					style={style}
					decelerationRate='normal'
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
			</>
		);
	}
}


BrowserView.propTypes = {
	url: PropTypes.string,
	style: PropTypes.object
};

export default BrowserView;
