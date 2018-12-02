import * as React from 'react';
import { mount } from 'enzyme';
import ErrorDisplay from '../../component/ErrorDisplay';

describe('ErrorDisplay', () => {
    it('displays error', () => {
        const error = new Error('An error.');

        const wrapper = mount(<ErrorDisplay error={error} />);

        expect(wrapper.find('div > div').text()).toEqual(error.message);
        expect(wrapper.find('code').text()).toEqual(error.stack);
    });
});
