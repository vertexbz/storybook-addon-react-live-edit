import { mount } from 'enzyme';
import { symbol } from '../constants';
import withLiveEdit from '../withLiveEdit';
import LivePreview from '../component/LivePreview';

jest.mock('@storybook/addons');

describe('withLiveEdit', () => {
    it('injects source to LiveSource', () => {
        expect(typeof withLiveEdit).toBe('function');

        const source = 'some source';
        const localScope = { localVar: 1 };
        const globalScope = { globalVar: 0 };
        const context = { [symbol.Scope]: globalScope };

        const storyFn = withLiveEdit(source, localScope);

        expect(storyFn).toEqual(expect.any(Function));

        const rendered = storyFn(context);

        const renderStub = jest.spyOn(LivePreview.prototype, 'render').mockImplementation(() => null);

        const renderedStory = mount(rendered);

        expect(renderedStory.type()).toBe(LivePreview);
        expect(renderedStory.prop('code')).toBe(source);
        expect(renderedStory.prop('scope')).toEqual({ ...globalScope, ...localScope });
        expect(renderStub).toBeCalled();
    });
});
