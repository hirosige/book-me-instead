import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';
import unified from 'unified';
import markdown from 'remark-parse';
import toc from 'remark-toc';
import math from 'remark-math'
import github from 'remark-github'
import remark2rehype from 'remark-rehype'
import highlightCode from '@mapbox/rehype-prism'
import rehype2react from 'rehype-react'
import emoji from 'remark-emoji'
import iframe from 'remark-iframes'

import katex from 'rehype-katex'
import stringify from 'rehype-stringify'
import Prism from 'prismjs'

import Clipboard from 'react-clipboard.js';

import 'prismjs/themes/prism.css'

class MarkdownEditor extends React.Component {
  constructor (props) {
    super(props)

    const initialContent = [
      '# Sample Js Code',
      '',
      '## Table of Contents',
      '',
      '## JS Code',
      '```js',
      'console.log("Hello World")',
      '```',
      '',
      '## 数式1',
      '$$',
      'c = \\pm\\sqrt{a^2 + b^2}',
      '$$',
      '',
      '## 数式2',
      '$$',
      'f{x} = \\int_{-\\infty}^\\infty',
      '    \\hat f\\xi\\,e^{2 \\pi i \\xi x}',
      '    \\,d\\xi',
      '$$',
      '',
      '## You Tube',
      '!(https://www.youtube.com/watch?v=8TQIvdFl4aU)',
    ].join('\n')

    this.state = {
      processor: null,
      mdContents: initialContent,
      isError: false,
      isImageOpen: false,
      errMsg: "",
      images: []
    }
  }

  componentDidMount = () => {
    Prism.highlightAll()

    const processor = unified()
      .use(markdown)
      .use(toc)
      .use(math)
      .use(emoji)
      .use(github, {
        repository: 'https://github.com/rhysd/rehype-react'
      })
      .use(iframe, {
       'www.youtube.com': {
          tag: 'iframe',
          width: 560,
          height: 315,
          disabled: false,
          replace: [
            ['watch?v=', 'embed/'],
            ['http://', 'https://'],
          ],
          thumbnail: {
            format: 'http://img.youtube.com/vi/{id}/0.jpg',
            id: '.+/(.+)$'
          },
          removeAfter: '&'
        }
      })
      .use(remark2rehype)
      .use(katex, {
        throwOnError: false,
        errorColor: '#FF0000',
        inlineDoubleDisplay: false
      })
      .use(highlightCode)
      .use(stringify)
      .use(rehype2react, {
        createElement: React.createElement
      });

    this.setState({ processor })
  }

  changeClipboard = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeTextarea = e => {
    this.setState({
      mdContents: e.target.value
    })
  }

  closeError = () => {
    this.setState({ isError: false })
  }

  toggleImages = () => {
    this.setState({ isImageOpen: !this.state.isImageOpen })
  }

  addImageSyntax = url => {
    return `![test_alt](${url})`
  }

  compileCodeSyntax = () => {
    try {
      return this.state.processor
        .processSync(this.state.mdContents)
        .contents
    } catch(e) {
      return (
        <div className="notification is-danger">
          <p>{e.message}</p>
          <p>
            {e.message.split('`')[1] === 'react' && (<span>try "jsx"</span>)}
          </p>
        </div>
      )
    }
  }

  onSuccess = () => {
    this.toggleImages()
  }

  onUploadFileCompleted = info => {
    const { cdnUrl, count } = info

    const numbers = [...Array(count)]
    numbers.map((_, i) => {
      this.setState({
        images: this.state.images.concat({
          url: `${cdnUrl}/nth/${i}/`,
          md: `![image-${i + 1}](${cdnUrl}/nth/${i}/)`
        })
      })
    })
  }

  render () {
    return (
      <React.Fragment>
        <section className="modal-card-body u-txt-gray" style={{ height: "100vh", margin: 0 }}>
          <div className="columns is-gapless">
            <div className="column is-half" style={{ position: "relative" }}>
              <textarea
                className="textarea"
                style={{ height: "100vh", width: "100%", borderRadius: 0, margin: "10px", position: "relative" }}
                value={this.state.mdContents}
                placeholder="Markdown Here"
                onChange={this.changeTextarea}
              />
              <p style={{ marginLeft: "10px" }}>
                {`入力文字数：${this.state.mdContents.trim().length}`}
              </p>
              <button
                className="button is-primary is-small"
              　style={{
                  position: "absolute",
                  top: 10,
                  right: 0,
                  borderRadius: 0
                }}
                onClick={this.toggleImages}
              >
                Images
              </button>
            </div>
            <div className="column">
              <div className="content" style={{ padding: "20px" }}>
                {this.state.processor && this.compileCodeSyntax()}
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot u-no-br">
          <div
            className="button is-success u-no-br"
            onClick={() => {
              this.props.setMdContents(this.state.mdContents)
              this.props.switchModal()
            }}
          >SUBMIT</div>
          <div
            className="button u-no-br"
            onClick={this.props.switchModal}
          >CANCEL</div>
        </footer>
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'Write an article',
    size: '',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "100%"
    },
  })
)(MarkdownEditor)