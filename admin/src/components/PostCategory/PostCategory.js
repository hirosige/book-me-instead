import React from 'react'
import CategoryRow from './CategoryRow';

const PostCategory = ({
  postCategory,
  notifyUser,
  indexVariables,
  onedayTodoHere,
}) => {

  return (
    <React.Fragment>
      <CategoryRow
        post={postCategory}
        type="is-primary"
        notifyUser={notifyUser}
        indexVariables={indexVariables}
      />
      {postCategory.children.map(child => (
        <React.Fragment key={child.id}>
          <CategoryRow
            post={child}
            parent={postCategory}
            type="is-warning"
            hierarchy={1}
            notifyUser={notifyUser}
            indexVariables={indexVariables}
          />
          {child.children.map(grandChild => (
            <React.Fragment key={grandChild.id}>
              {!grandChild.isRoot && (
                <CategoryRow
                  post={grandChild}
                  parent={child}
                  grandParent={postCategory}
                  type="is-danger"
                  hierarchy={2}
                  notifyUser={notifyUser}
                  indexVariables={indexVariables}
                />
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default PostCategory
