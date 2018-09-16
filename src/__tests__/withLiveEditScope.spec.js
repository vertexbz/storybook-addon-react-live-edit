import withLiveEditScope from '../withLiveEditScope';
import { symbol } from '../constants';

describe('withLiveEditScope', () => {
    it('decorates story with scope variables', () => {
        expect(typeof withLiveEditScope).toBe('function');

        const story = jest.fn();
        const context = {};


        const scope1 = {
            var1: 'value1'
        };

        const scopeDecorator1 = withLiveEditScope(scope1);
        const decoratedStory1 = scopeDecorator1(jest.fn().mockReturnValue(story), context);
        expect(decoratedStory1).toBe(story);

        expect(context).toEqual({ [symbol.Scope]: scope1 });


        const scope2 = {
            var2: 'value2'
        };

        const scopeDecorator2 = withLiveEditScope(scope2);
        const decoratedStory2 = scopeDecorator2(jest.fn().mockReturnValue(story), context);
        expect(decoratedStory2).toBe(story);

        expect(context).toEqual({ [symbol.Scope]: { ...scope1, ...scope2 } });

        expect(story).not.toBeCalled();
    });
});
