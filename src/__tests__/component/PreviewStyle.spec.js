import * as React from 'react';
import { shallow } from 'enzyme';
import mensch from 'mensch';
import PreviewStyle from '../../component/PreviewStyle';
import { className } from '../../constants';

describe('PreviewStyle', () => {
    it('renders error styles', () => {
        const wrapper = shallow(<PreviewStyle />);

        expect(wrapper).toBeTruthy();
        expect(wrapper.type()).toBe('style');

        const styleAst = mensch.parse(wrapper.render().contents().text());
        expect(styleAst.type).toBe('stylesheet');

        expect(styleAst.stylesheet.rules).toBeInstanceOf(Array);

        const isErrorSelector = (selector) => selector === '.' + className.error;

        const isErrorRule = ({ type, selectors }) => type === 'rule' && selectors.some(isErrorSelector);

        expect(styleAst.stylesheet.rules.find(isErrorRule)).toBeTruthy();
    });
});
