// @flow
import { symbol } from './constants';

type StorybookContextType = $Subtype<{}>;
type StoryRendererSig<S> = (?StorybookContextType) => S;

export default (scope: $Subtype<{}>): * =>
    <S>(story: StoryRendererSig<S>, context: StorybookContextType): S => {
        context[symbol.Scope] = { ...context[symbol.Scope], ...scope };
        return story();
    };
