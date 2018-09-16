import * as React from 'react';
import { mount } from 'enzyme';
import { transform } from 'babel-standalone';
import returnToRender, { cleanupError } from '../returnToRender';
import { className } from '../constants';

const transformAndExecWithScope = (code) => {
    let result = null;

    const scope = {
        React,
        render: (element) => result = element
    };

    Function(...Object.keys(scope), transform(code, { presets: ['react'] }).code)
        .apply(null, Object.values(scope));

    return result;
};

describe('returnToRender', () => {
    it('renders returned element', () => {
        const element = transformAndExecWithScope(
            returnToRender('return <div>success</div>')
        );

        const wrapper = mount(element);

        expect(wrapper).toBeTruthy();
        expect(wrapper.text()).toBe('success');
    });

    it('renders via render call and discards return value', () => {
        const element = transformAndExecWithScope(
            returnToRender('render(<div>success</div>); return false;')
        );

        const wrapper = mount(element);

        expect(wrapper).toBeTruthy();
        expect(wrapper.text()).toBe('success');
    });

    it('renders error when no render called and no value returned', () => {
        const element = transformAndExecWithScope(
            returnToRender('')
        );

        const wrapper = mount(element);

        expect(wrapper).toBeTruthy();
        expect(wrapper.text()).toEqual(expect.any(String));
        expect(wrapper.prop('className')).toContain(className.error);
    });

    it('renders error when no render called and invalid value returned', () => {
        const element = transformAndExecWithScope(
            returnToRender('return true;')
        );

        const wrapper = mount(element);

        expect(wrapper).toBeTruthy();
        expect(wrapper.text()).toEqual(expect.any(String));
        expect(wrapper.prop('className')).toContain(className.error);
    });

    it('throws an error for invalid code', () => {
        expect(() => {
            transformAndExecWithScope(
                returnToRender('asdlkasldj()')
            );
        }).toThrow();
    });

    it('cleanup the error message - 1 line', () => {
        const error = `SyntaxError: Unexpected token (3:5)
1 : const thunk = (render) => {
2 : 
3 : retu r  n <div style={{ padding: '10px', border: '1px solid orange', margin: 10 }}>live demo}</div>;
         ^`;

        const clean = cleanupError(error);

        const expected = `SyntaxError: Unexpected token (2:5)
1 : 
2 : retu r  n <div style={{ padding: '10px', border: '1px solid orange', margin: 10 }}>live demo}</div>;
         ^`;

        expect(clean).toEqual(expected);
    });

    it('cleanup the error message - 2 lines', () => {
        const error = `SyntaxError: Unexpected token (3:5)
1 : 
2 : const thunk = (render) => {
3 : retu r  n <div style={{ padding: '10px', border: '1px solid orange', margin: 10 }}>live demo}</div>;
         ^`;

        const clean = cleanupError(error, 2);

        const expected = `SyntaxError: Unexpected token (1:5)
1 : retu r  n <div style={{ padding: '10px', border: '1px solid orange', margin: 10 }}>live demo}</div>;
         ^`;

        expect(clean).toEqual(expected);
    });
});
