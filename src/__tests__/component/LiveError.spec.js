import * as React from 'react';
import { mount } from 'enzyme';
import { LiveProvider } from 'react-live';
import LiveError from '../../component/LiveError';
import returnToRender from '../../returnToRender';

describe('LiveError', () => {
    it('should not render with no error', () => {
        const wrapper = mount(
            <LiveProvider code="return <div />" transformCode={returnToRender} noInline>
                <LiveError />
            </LiveProvider>
        );

        expect(wrapper.find(LiveError).render()).toMatchSnapshot();
    });
    it('should render cleaned up error message for error', () => {
        const wrapper = mount(
            <LiveProvider code="re turn <div />" transformCode={returnToRender} noInline>
                <LiveError />
            </LiveProvider>
        );

        expect(wrapper.find(LiveError).render()).toMatchSnapshot();
    });
});
