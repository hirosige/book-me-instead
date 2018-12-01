import React from 'react'
import { compose } from 'recompose'
import withModal from '../../hocs/WithModal';

const ImageModal = ({ url, alt }) => (
  <p className="image is-4by3">
    <img src={url} alt={alt} />
  </p>
)

export default compose(
  withModal({
    button: 'PREVIEW IMAGE',
    size: 'is-small',
    color: 'is-primary',
    type: 'content',
  })
)(ImageModal)