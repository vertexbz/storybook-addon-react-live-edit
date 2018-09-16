// @flow
import * as React from 'react';
import { Editor } from 'react-live';
import { baseFonts } from '@storybook/components/dist/theme';
import { event } from '../constants';
// $FlowIgnore
import Style from 'babel-loader!react-live/src/components/Editor/Style';

type LiveEditorProps = {
    channel: any,
    api: any
};

type LiveEditorState = {
    code: ?string
};

export default
class LiveEditor extends React.Component<LiveEditorProps, LiveEditorState> {
    state = {
        code: null
    };

    constructor(...args: *) {
        super(...args);

        // $FlowIgnore
        this.loadSource = this.loadSource.bind(this);
        // $FlowIgnore
        this.onSourceChange = this.onSourceChange.bind(this);
    }

    loadSource(code: string) {
        this.setState({ code });
    }

    onSourceChange(code: string) {
        this.props.channel.emit(event.UpdateSource, code);
    }

    componentDidMount() {
        this.props.channel.on(event.LoadSource, this.loadSource);
    }

    componentWillUnmount() {
        this.props.channel.removeListener(event.LoadSource, this.loadSource);
    }

    render(): React.Element<'div'> {
        if (this.state.code === null) {
            return (
                <div
                    style={{
                        ...baseFonts,
                        width: '100%',
                        textAlign: 'center',
                        padding: '20px',
                        color: 'gray',
                        textTransform: 'uppercase'
                    }}
                >
                    Editor unavailable
                </div>
            );
        }

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Style />
                <Editor onChange={this.onSourceChange} code={this.state.code} style={{ height: '100%' }} />
            </div>
        );
    }
}
