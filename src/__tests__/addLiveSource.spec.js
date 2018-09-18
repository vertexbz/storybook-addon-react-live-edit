import { mount } from 'enzyme';
import addLiveSource from '../addLiveSource';
import LivePreview from '../component/LivePreview';
import { symbol } from '../constants';

jest.mock('@storybook/addons');
import addonsMock from '@storybook/addons';

describe('addLiveSource', () => {
    it('adds editable story', () => {
        expect(typeof addLiveSource.addLiveSource).toBe('function');

        addLiveSource.add = jest.fn();

        const kind = 'kind';
        const source = 'source';
        const localScope = { scopeVar: 'xxx' };
        const contextScope = { scopeVar: 'zzz', scopeVar2: 'yyy' };

        addLiveSource.addLiveSource(kind, source, localScope);

        expect(addLiveSource.add).toBeCalledWith(kind, expect.any(Function));

        const storyFn = addLiveSource.add.mock.calls[0][1];

        const renderedStory = mount(storyFn({ [symbol.Scope]: contextScope }));

        expect(renderedStory.type()).toBe(LivePreview);
        expect(renderedStory.prop('code')).toBe(source);
        expect(renderedStory.prop('scope')).toEqual({ ...contextScope, ...localScope });
        expect(renderedStory.prop('channel')).toBe(addonsMock.__channel);
    });
});
