// @flow
import * as React from 'react';
import CodeMirror from 'codemirror';
import { event } from '../../constants';
import CodeMirrorStyle, * as themes from './styles';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import { themeNameToVarName } from './utils';

type LiveEditorProps = {
    channel: any,
    api: any,
    theme?: ?string,
    active: boolean
};

type LiveEditorState = {
    code: ?string,
    theme: ?string
};

export default
class LiveEditor extends React.Component<LiveEditorProps, LiveEditorState> {
    state = {
        code: null,
        theme: this.props.theme
    };

    codeMirrorRef: ?HTMLElement;
    codeMirror: *;

    constructor(...args: *) {
        super(...args);

        // $FlowIgnore
        this.loadSource = this.loadSource.bind(this);
        // $FlowIgnore
        this.loadOptions = this.loadOptions.bind(this);
        // $FlowIgnore
        this.onSourceChange = this.onSourceChange.bind(this);
        // $FlowIgnore
        this.setCodeMirrorRef = this.setCodeMirrorRef.bind(this);
        // $FlowIgnore
        this.codemirrorValueChanged = this.codemirrorValueChanged.bind(this);
    }

    shouldComponentUpdate(nextProps: LiveEditorProps, state: LiveEditorState): boolean {
        return this.props.active !== nextProps.active || this.state.theme !== state.theme || Boolean(this.state.code) !== Boolean(state.code);
    }

    loadSource(code: string) {
        this.setState({ code });
    }

    loadOptions(options: { theme: ?string }) {
        this.setState({ theme: options.theme });
    }

    onSourceChange(code: string) {
        this.props.channel.emit(event.UpdateSource, code);
    }

    componentDidMount() {
        this.props.channel.on(event.LoadSource, this.loadSource);
        this.props.channel.on(event.SyncOptions, this.loadOptions);
    }

    componentWillUnmount() {
        this.props.channel.removeListener(event.LoadSource, this.loadSource);
        this.props.channel.removeListener(event.SyncOptions, this.loadOptions);
    }

    componentDidUpdate() {
        if (this.state.code !== null && this.props.active) {
            const theme = themeNameToVarName(this.state.theme) in themes ? this.state.theme : 'default';
            if (!this.codeMirror) {
                this.codeMirror = CodeMirror(this.codeMirrorRef, { mode: 'jsx', theme });
                this.codeMirror.on('change', this.codemirrorValueChanged);
            } else {
                this.codeMirror.setOption('theme', theme);
            }
            // $FlowIgnore
            this.codeMirror.setValue(this.state.code);
        } else {
            this.codeMirror = null;
        }
    }

    codemirrorValueChanged(doc: *, change: *) {
        if (change.origin !== 'setValue') {
            this.onSourceChange(doc.getValue());
        }
    }

    setCodeMirrorRef(el: ?HTMLElement) {
        this.codeMirrorRef = el;
    }

    render(): ?React.Element<'div'> {
        if (!this.props.active) {
            return null;
        }

        if (this.state.code === null) {
            return (
                <div
                    style={{
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

        const themeVarName = themeNameToVarName(this.state.theme);
        return (
            <div key={themeVarName} style={{ width: '100%', display: 'flex', flex: '1 1', minHeight: '100%' }}>
                {themeVarName in themes && (<style dangerouslySetInnerHTML={{ __html: themes[themeVarName] }} />) }
                <style dangerouslySetInnerHTML={{ __html: CodeMirrorStyle }} />
                <style
                    dangerouslySetInnerHTML={{ __html: `
                        div.CodeMirror {
                            width: 100%;
                            height: initial;
                        }
                    ` }}
                />
                <div style={{ minWidth: '100%', minHeight: '100%', display: 'flex', flex: '1 1' }} ref={this.setCodeMirrorRef} />
            </div>
        );
    }
}
