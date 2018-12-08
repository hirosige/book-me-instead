import React from 'react'

const HAS_ICON_LEFT = "has-icons-left"
const HAS_ICON_RIGHT = "has-icons-right"

const checkHasIconLeft = hasIconLeft => {
  if (hasIconLeft) return HAS_ICON_LEFT
  else return ""
}

const checkHasIconRight = hasIconRight => {
  if (hasIconRight) return HAS_ICON_RIGHT
  else return ""
}

const HorizontalDoubleInputBox = ({
  children,
  notice,
  hasIconLeft,
  hasIconRight,
}) => (
  <div className="field is-expanded">
    <div className="field has-addons">
      <div className={`control is-expanded ${checkHasIconLeft(hasIconLeft)} ${checkHasIconRight(hasIconRight)}`}>
        {children}
      </div>
    </div>
    <p className="help">{notice}</p>
  </div>
)

export default HorizontalDoubleInputBox