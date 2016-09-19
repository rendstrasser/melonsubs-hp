import React, {Component} from 'react'
import marked from 'marked'
import cNames from 'classnames'

import './style/markdown-editor.scss'

class MarkdownEditor extends Component {

    constructor() {
        super();

        this.getValue = this.getValue.bind(this);
        this.getToolBar = this.getToolBar.bind(this);
        this.getModeBar = this.getModeBar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.updateContentWithFormatter = this.updateContentWithFormatter.bind(this);
        this.boldText = this.boldText.bind(this);
        this.italicText = this.italicText.bind(this);
        this.linkText = this.linkText.bind(this);
        this.blockquoteText = this.blockquoteText.bind(this);
        this.codeText = this.codeText.bind(this);
        this.pictureText = this.pictureText.bind(this);
        this.listUlText = this.listUlText.bind(this);
        this.listOlText = this.listOlText.bind(this);
        this.headerText = this.headerText.bind(this);

        this.state = {
            result: "",
            panelClass: 'md-panel',
            mode: 'split',
            isFullScreen: false
        }
    }

    componentDidMount() {
        // cache dom node
        this.textControl = this.refs.editor
        this.previewControl = this.refs.preview
    }

    componentWillUnmount() {
        this.textControl = null
        this.previewControl = null
    }

    render() {
        const unparsedTextareaId = this.props.unparsedTextareaId || "content";

        const unformattedContent = this.state.content || this.props.content || "";
        const formattedContent = marked(unformattedContent);

        const panelClass = cNames(['md-panel', {'fullscreen': this.state.isFullScreen}])
        const editorClass = cNames(['md-editor', {'expand': this.state.mode === 'edit'}])
        const previewClass = cNames(['md-preview', 'markdown', {
            'expand': this.state.mode === 'preview',
            'shrink': this.state.mode === 'edit'
        }])

        return (
            <div className={panelClass}>
                <div className="md-menubar">
                    {this.getModeBar()}
                    {this.getToolBar()}
                </div>
                <div className={editorClass}>
                    <textarea ref="editor" id={unparsedTextareaId} name={unparsedTextareaId} onChange={this.onChange} value={unformattedContent}/>
                </div>
                <div className={previewClass} ref="preview"
                     dangerouslySetInnerHTML={{ __html: formattedContent }}></div>
                <div className="md-spliter"></div>
            </div>
        )
    }

    getValue() {
        return this.state.content
    }

    // widgets constructors
    getToolBar() {
        return (
            <ul className="md-toolbar">
                <li className="tb-btn"><a title="Bold" onClick={this.boldText}><i
                    className="small material-icons markdown-icon">format_bold</i></a></li>
                {/* bold */}
                <li className="tb-btn"><a title="Italic" onClick={this.italicText}><i
                    className="small material-icons markdown-icon">format_italic</i></a></li>
                {/* italic */}
                <li className="tb-btn spliter"/>
                <li className="tb-btn"><a title="Link" onClick={this.linkText}><i
                    className="small material-icons markdown-icon">insert_link</i></a></li>
                {/* link */}
                <li className="tb-btn"><a title="Blockquote" onClick={this.blockquoteText}><i
                    className="small material-icons markdown-icon">format_quote</i></a></li>
                {/* blockquote */}
                <li className="tb-btn"><a title="Code" onClick={this.codeText}><i
                    className="small material-icons markdown-icon">code</i></a></li>
                {/* code */}
                <li className="tb-btn"><a title="Picture" onClick={this.pictureText}><i
                    className="small material-icons markdown-icon">insert_photo</i></a></li>
                {/* picture-o */}
                <li className="tb-btn spliter"/>
                <li className="tb-btn"><a title="Ordered list" onClick={this.listOlText}><i
                    className="small material-icons markdown-icon">format_list_bulleted</i></a></li>
                {/* list-ol */}
                <li className="tb-btn"><a title="Unordered list" onClick={this.listUlText}><i
                    className="small material-icons markdown-icon">format_list_numbered</i></a></li>
                {/* list-ul */}
                <li className="tb-btn"><a title="Header" onClick={this.headerText}><i
                    className="small material-icons markdown-icon">title</i></a></li>
                {/* header */}
            </ul>
        )
    }

    getModeBar() {
        const checkActive = (mode) => cNames({active: this.state.mode === mode})

        const fullscreenIcon = this.state.isFullScreen ? "fullscreen_exit" : "fullscreen";

        return (
            <ul className="md-modebar">
                <li className="tb-btn pull-right">
                    <a className={checkActive('preview')} onClick={this.changeMode('preview')} title="Preview Mode">
                        <i className="small material-icons markdown-icon">remove_red_eye</i>
                    </a>
                </li>
                { /* preview mode */ }
                <li className="tb-btn pull-right">
                    <a className={checkActive('split')} onClick={this.changeMode('split')} title="Split Mode">
                        <i className="small material-icons markdown-icon">chrome_reader_mode</i>
                    </a>
                </li>
                { /* split mode */ }
                <li className="tb-btn pull-right">
                    <a className={checkActive('edit')} onClick={this.changeMode('edit')} title="Edit mode">
                        <i className="small material-icons markdown-icon">mode_edit</i>
                    </a>
                </li>
                { /* edit mode */ }
                <li className="tb-btn spliter pull-right"/>
                <li className="tb-btn pull-right">
                    <a title="Full screen" onClick={this.toggleFullScreen}>
                        <i className="small material-icons markdown-icon">{fullscreenIcon}</i>
                    </a>
                </li>
                {/* full-screen */}
            </ul>
        )
    }

    // event handlers
    onChange(e) {
        const {onContentChange} = this.props;

        this.setState({content: e.target.value})

        onContentChange(e.target.value);
    }

    changeMode(mode) {
        return () => {
            this.setState({mode})
        }
    }

    toggleFullScreen(e) {
        this.setState({isFullScreen: !this.state.isFullScreen})
    }

    updateContentWithFormatter(defaultValue, formatter) {
        const start = this.textControl.selectionStart;
        const end = this.textControl.selectionEnd;
        const currentContent = this.textControl.value;

        let selectedValue = defaultValue;

        // if there is something selected, override the default value
        if (start !== end) {
            selectedValue = currentContent.slice(start, end);
        }

        const formattedValue = formatter(selectedValue);

        // set transformed content and preselect transformed value
        this.textControl.value = currentContent.slice(0, start) + formattedValue + currentContent.slice(end);
        this.textControl.setSelectionRange(start, start + formattedValue.length);

        // additionally call consumer of new content
        const {onContentChange} = this.props;
        onContentChange(this.textControl.value);
    }

    boldText() {
        this.updateContentWithFormatter("bold", value => "**" + value + "**");
    }

    italicText() {
        this.updateContentWithFormatter("italic", value => "_" + value + "_");
    }

    linkText() {
        this.updateContentWithFormatter("link", value => "[" + value + "](www.google.at)");
    }

    blockquoteText() {
        this.updateContentWithFormatter("blockquote", value => "> " + value);
    }

    codeText() {
        this.updateContentWithFormatter("\ncode block\n", value => "```" + value + "```");
    }

    pictureText() {
        this.updateContentWithFormatter("image", value => "![" + value + "](www.google.at/image.png)");
    }

    listUlText() {
        this.updateContentWithFormatter("list element", value => "- " + value);
    }

    listOlText() {
        this.updateContentWithFormatter("list element", value => "1. " + value);
    }

    headerText() {
        this.updateContentWithFormatter("header", value => "## " + value);
    }
}

MarkdownEditor.propTypes = {
    content: React.PropTypes.string,
    onContentChange: React.PropTypes.func.isRequired,
    unparsedTextareaId: React.PropTypes.string
}

export default MarkdownEditor