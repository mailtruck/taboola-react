import React from 'react';

const viewIds = [];

class Taboola extends React.Component {
	constructor(props) {
		super(props);
		const { currentUrl } = props;
		this._newPageLoad = false;

		if (
			!viewIds.includes(currentUrl) &&
			document.getElementById('tb_loader_script')
		) {
			window._taboola = window._taboola || [];
			window._taboola.push({ notify: 'newPageLoad' });
			viewIds.push(currentUrl);
			this._newPageLoad = true;
		}
	}

	loadScript() {
		const { publisher, pageType, currentUrl } = this.props;
		const topInfo = this._newPageLoad
			? { [pageType]: 'auto', url: currentUrl }
			: { [pageType]: 'auto' };

		window._taboola = window._taboola || [];
		window._taboola.push(topInfo);

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
