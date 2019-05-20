import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Taboola from './index.js';

configure({ adapter: new Adapter() });

describe('Taboola Component', () => {
	it('renders without crashing', () => {
		const wrapper = mount(
			<Taboola
				currentUrl={'https://www.awesomenews.com/dogs-rule'}
				publisher={'taboola-training'}
				pageType={'article'}
				placement={'Below Article Thumbnails'}
				mode={'thumbnails-m'}
				targetType={'mix'}
			/>
		);
		expect(wrapper.find('div').exists()).to.equal(true);
	});
});
