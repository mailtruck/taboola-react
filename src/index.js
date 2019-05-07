import React from 'react';

const viewIds = [];

class Taboola extends React.Component {
	constructor(props) {
		super(props);
		const { currentUrl } = props;
		this._newPageLoad = false;

		// if we have called the loader but have not seen this page before
		// then we will push the 'newPageLoad' notification and add the currentUrl to the viewIds
		if (
			!viewIds.includes(currentUrl) &&
			document.getElementById('tb_loader_script')
		) {
			window._taboola = window._taboola || [];
			window._taboola.push({ notify: 'newPageLoad' });
			viewIds.push(currentUrl);
			// we set this boolean to know later if we need to push the url in with the page type
			this._newPageLoad = true;

			// if we do not have the loader script and have not been to this page before,
			// that means it is the first page we are visiting
		} else if (!viewIds.includes(currentUrl)) {
			viewIds.push(currentUrl);
		}
	}

	// This function calls the loader
	loadScript() {
		const { publisher, pageType, currentUrl } = this.props;
		// if it's a new page, pass the new url
		const topInfo = this._newPageLoad
			? { [pageType]: 'auto', url: currentUrl }
			: { [pageType]: 'auto' };

		window._taboola = window._taboola || [];
		window._taboola.push(topInfo);

		// call the loader
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
			`https://cdn.taboola.com/libtrc/${publisher}/loader.js`,
			'tb_loader_script'
		);
		if (window.performance && typeof window.performance.mark == 'function') {
			window.performance.mark('tbl_ic');
		}
	}

	loadWidget({ mode, placement, targetType, containerId }) {
		window._taboola = window._taboola || [];
		window._taboola.push({
			mode,
			container: containerId,
			placement,
			target_type: targetType,
		});
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
		// when the component mounts, call the loader
		const { publisher, pageType } = this.props;
		this.loadScript({ publisher, pageType });
	}

	render() {
		const { mode, placement, targetType } = this.props;
		const containerId = this.formatContainerId(placement);
		return (
			<React.Fragment>
				<div id={containerId} />
				{this.loadWidget({ mode, placement, targetType, containerId })}
			</React.Fragment>
		);
	}
}

export default Taboola;
