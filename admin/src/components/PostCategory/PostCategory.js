import React from 'react'
import AddCategoryButton from './AddCategoryButton';
import DeleteTagMutation from '../Shared/DeleteTagMutation';
import {
  DELETE_A_POST_CATEGORY,
} from '../../queries/PostCategory'
import CategoryRow from './CategoryRow';

const PostCategory = ({ postCategory, me }) => (
  <React.Fragment>
    <CategoryRow
      post={postCategory}
      type="is-primary"
    />
    {postCategory.children.map(child => (
      <React.Fragment key={child.id}>
        <CategoryRow
          post={child}
          parent={postCategory}
          type="is-warning"
          hierarchy={1}
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
              />
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
  </React.Fragment>
)

export default PostCategory
