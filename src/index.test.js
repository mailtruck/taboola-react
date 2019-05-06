import React from 'react'
import { expect } from 'chai'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Taboola from './index.js'

configure({ adapter: new Adapter() })

describe('<Taboola />', () => {
    it('renders a taboola asset', () => {
        const wrapper = mount((
            <Taboola publisher={'taboola-training'} 
                pageType={'article'} 
                placement={'Below Article Thumbnails'} 
                mode={'thumbnails-m'} 
                targetType={'mix'} 
            />
        ));
        expect(wrapper.find('div').exists()).to.equal(true)
    })
})