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

import 'prismjs/themes/prism.css'

class MarkdownPreview extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      processor: null,
      mdContents: props.mdContents,
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

  render () {
    return (
      <React.Fragment>
        <header className="modal-card-head u-no-br u-bk-primary">
          <p className="modal-card-title u-txt-white">Markdown Preview</p>
          <div className="delete" aria-label="close" onClick={this.props.switchModal}></div>
        </header>
        <section className="modal-card-body u-txt-gray">
          {this.state.processor && this.compileCodeSyntax()}
        </section>
      </React.Fragment>
    )
  }
}

export default compose(
  withModal({
    button: 'PREVIEW',
    size: 'is-small',
    color: 'is-primary',
    type: 'card',
    style: {
      width: "80%"
    },
  })
)(MarkdownPreview)