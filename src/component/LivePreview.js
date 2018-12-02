// @flow
import * as React from 'react';
import ErrorDisplay from './ErrorDisplay';
import { event } from '../constants';
import transform from '../transform';

type LivePreviewProps = {
    scope?: {
        +[string]: any
    },
    channel: any,
    code: string
};

type LivePreviewState = {
    code: string
};

export default
class LivePreview extends React.Component<LivePreviewProps, LivePreviewState> {
    state = {
        code: this.props.code
    };

    constructor(...args: *) {
        super(...args);

        // $FlowIgnore
        this.setSource = this.setSource.bind(this);
    }

    setSource(code: string) {
        this.setState({ code });
    }

    componentDidMount() {
        this.props.channel.on(event.UpdateSource, this.setSource);
        this.props.channel.emit(event.LoadSource, this.props.code);
    }

    componentWillUnmount() {
        this.props.channel.emit(event.LoadSource, null);
        this.props.channel.removeListener(event.UpdateSource, this.setSource);
    }

    render(): ?React.Element<*> {
        try {
            return transform(this.state.code, this.props.scope || {})();
        } catch (e) {
            return <ErrorDisplay error={e}/>;
        }
    }
}
