// @flow
import withLiveEdit from './withLiveEdit';

export default {
    addLiveSource(name: string, source: string, scope?: $Subtype<{}>): * {
        return this.add(name, withLiveEdit(source, scope));
    }
};
