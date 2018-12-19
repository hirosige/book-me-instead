import React from 'react'
import AddCategoryButton from './AddCategoryButton';
import DeleteTagMutation from '../Shared/DeleteTagMutation';
import {
  DELETE_A_POST_CATEGORY,
} from '../../queries/PostCategory'

const CategoryRow = ({
  post,
  type,
  hierarchy,
  parent,
  grandParent,
}) => (
  <tr key={post.id}>
    <td>
      {hierarchy && (
        <React.Fragment>
          {[...Array(hierarchy)].map((_, i) => <i key={i} class="fas fa-angle-double-right"></i>)}
          &nbsp;
        </React.Fragment>
      )}

      <span className={`tag is-small ${type}`}>
        {post.name}
        {post.posts.length === 0 && (
          <DeleteTagMutation
            deleteId={post.id}
            title="Are you sure to delete ?"
            mutation={DELETE_A_POST_CATEGORY}
          />
        )}
      </span>
    </td>
    <td>
      <span class="tags has-addons">
        <span class="tag is-dark">Posts</span>
        <span class="tag is-info">{post.posts.length}</span>
      </span>
    </td>
    <td>
      {hierarchy >= 2 ? (
        <span className="tag is-warning">これ以上下にはカテゴリを追加できません</span>
      ) : (
        <AddCategoryButton category={post} />
      )}
    </td>
    <td>
      <nav class="breadcrumb" aria-label="breadcrumbs" style={{ fontSize: "0.8rem" }}>
        <ul>
          <li><a href="#">Book Me Instead</a></li>
          <li><a href="#">Blog</a></li>
          {grandParent && (<li><a href="#">{grandParent.name}</a></li>)}
          {parent && (<li><a href="#">{parent.name}</a></li>)}
          <li class="is-active"><a href="#" aria-current="page">{post.name}</a></li>
        </ul>
      </nav>
    </td>
  </tr>
)

export default CategoryRow
