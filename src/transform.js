// @flow
import { transform } from '@babel/standalone';
import { getOptions } from './options';

export default (source: string, scope: $Subtype<{}>): () => * => {
    const { presets, plugins } = getOptions();
    const code = transform(source, { presets, plugins, parserOpts: { allowReturnOutsideFunction: true } }).code;
    // $FlowIgnore
    return Function(...Object.keys(scope), code).bind(null, ...Object.values(scope));
};
