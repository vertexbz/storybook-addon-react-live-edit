// @flow
import * as React from 'react';
import { withLive } from 'react-live';
import { className } from '../constants';
import { cleanupError } from '../returnToRender';

type LiveErrorProps = {
    live: {
        error?: ?string
    }
};

const LiveError = ({ live }: LiveErrorProps): ?React.Element<'div'> => live.error ? (
    <div className={className.error}>
        {cleanupError(live.error)}
    </div>
) : null;

export default withLive(LiveError);
