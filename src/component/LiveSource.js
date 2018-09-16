// @flow
import * as React from 'react';
import { LiveProvider, LivePreview } from 'react-live';
import LiveError from './LiveError';
import { event } from '../constants';
import PreviewStyle from './PreviewStyle';
import returnToRender from '../returnToRender';

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
class LiveSource extends React.Component<LivePreviewProps, LivePreviewState> {
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

    render(): ?React.Element<LiveProvider> {
        return (
            <LiveProvider code={this.state.code} transformCode={returnToRender} scope={this.props.scope} noInline>
                <PreviewStyle />
                <LivePreview />
                <LiveError />
            </LiveProvider>
        );
    }
}
