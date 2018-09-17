import * as index from '../index';

import addLiveSource from '../addLiveSource';
import withLiveEdit from '../withLiveEdit';
import withLiveEditScope from '../withLiveEditScope';

describe('index', () => {
    it('exposes proper interface', () => {
        expect(index.default).toBe(addLiveSource);
        expect(index.addLiveSource).toBe(addLiveSource);
        expect(index.withLiveEdit).toBe(withLiveEdit);
        expect(index.withLiveEditScope).toBe(withLiveEditScope);
    });
});
