import React from 'react';
import PropTypes from 'prop-types';

// let currentView = '';

const currentView = {
	view: '',
	setView: function(view) {
		this.view = view;
	},
	getView: function() {
		return this.view;
	},
};

class Taboola extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaderCalled: false,
		};
	}

	isFirstPage() {
		// it is the first page if the loader has not been loaded
		return !document.getElementById('tb_loader_script');
	}

	callTaboolaLoader() {
		const { publisher } = this.props;
		(function(e, f, u, i) {
			if (!document.getElementById(i)) {
				e.async = 1;
				e.src = u;
				e.id = i;
				if (!f) {
					document.head.append(e);
				} else {
					f.parentNode.insertBefore(e, f);
				}
			}
		})(
			document.createElement('script'),
			document.getElementsByTagName('script')[0],
			`//cdn.taboola.com/libtrc/${publisher}/loader.js`,
			'tb_loader_script'
		);
		if (window.performance && typeof window.performance.mark == 'function') {
			window.performance.mark('tbl_ic');
		}
	}

	shouldPushNewPage() {
		const { currentUrl } = this.props;
		// if we have the loader but this is a new URL, we should push the notify-new-page event and the currentUrl
		return (
			!!document.getElementById('tb_loader_script') &&
			!currentView.getView() === currentUrl
		);
	}

	// This function calls the loader
	onPageLoad() {
		const { pageType, currentUrl } = this.props;

		// if it's a new page, pass the new url, else pass the page type
		const topInfo = this.shouldPushNewPage()
			? { [pageType]: 'auto', url: currentUrl }
			: { [pageType]: 'auto' };

		window._taboola = window._taboola || [];
		window._taboola.push(topInfo);

		// if it is a new page, notify a new page has loaded
		if (this.shouldPushNewPage()) {
			window._taboola.push({ notify: 'newPageLoad' });
		}

		// if it's the first page loaded
		if (this.isFirstPage()) {
			this.callTaboolaLoader();
		}

		// finally, mark this page as seen
		currentView.setView(currentUrl);
	}

	loadWidget({ mode, placement, targetType, containerId }) {
		try {
			window._taboola = window._taboola || [];
			window._taboola.push({
				mode,
				container: containerId,
				placement,
				target_type: targetType,
			});
		} catch (e) {
			console.log('Error in taboola-react-plugin: ' + e.message);
		}
	}

	formatContainerId(placement) {
		const saltedPlacement = `${placement}-${Math.floor(
			Math.random() * 100000
		)}`;
		return saltedPlacement
			.toLowerCase()
			.split(' ')
			.join('-');
	}

	componentDidMount() {
		try {
			this.onPageLoad();
		} catch (e) {
			console.log('Error in taboola-react-plugin: ', e.message);
		} finally {
			currentView.setView('');
			this.setState({
				loaderCalled: true,
				containerId: this.formatContainerId(this.props.placement),
			});
		}
	}

	componentWillUnmount() {
		// clean up next ups
		const nextUp = document.querySelector('#tbl-next-up');

		if (nextUp) {
			nextUp.remove();
		}
	}

	render() {
		const { mode, placement, targetType } = this.props;
		const { containerId } = this.state;
		return (
			<React.Fragment>
				{this.state.loaderCalled && <div id={containerId} />}
				{this.state.loaderCalled &&
					containerId &&
					this.loadWidget({ mode, placement, targetType, containerId })}
			</React.Fragment>
		);
	}
}
Taboola.propTypes = {
	currentUrl: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
	pageType: PropTypes.string.isRequired,
	placement: PropTypes.string.isRequired,
	publisher: PropTypes.string.isRequired,
	targetType: PropTypes.string.isRequired,
};
export default Taboola;
