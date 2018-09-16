import * as index from '../index';

import addLiveSource from '../addLiveSource';
import withLiveEditScope from '../withLiveEditScope';

describe('index', () => {
    it('exposes proper interface', () => {
        expect(index.default).toBe(addLiveSource);
        expect(index.addLiveSource).toBe(addLiveSource);
        expect(index.withLiveEditScope).toBe(withLiveEditScope);
    });
});
