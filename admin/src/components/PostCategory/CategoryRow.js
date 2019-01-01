import React from 'react'
import AddCategoryButton from './AddCategoryButton';
import PostCategoryDeleteMutation from './PostCategoryDeleteMutation';

const CategoryRow = ({
  post,
  type,
  hierarchy,
  parent,
  grandParent,
  notifyUser,
  indexVariables,
}) => (
  <tr key={post.id}>
    <td>
      {hierarchy && (
        <React.Fragment>
          {[...Array(hierarchy)].map((_, i) => <i key={i} className="fas fa-angle-double-right"></i>)}
          &nbsp;
        </React.Fragment>
      )}

      <span className={`tag is-small ${type}`}>
        {post.name}
        {post.posts.length === 0 && (
          <PostCategoryDeleteMutation
            postCategory={post}
            notifyUser={notifyUser}
            indexVariables={indexVariables}
          />
        )}
      </span>
    </td>
    <td>
      <span className="tags has-addons">
        <span className="tag is-dark">Posts</span>
        <span className="tag is-info">{post.posts.length}</span>
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
      <nav className="breadcrumb" aria-label="breadcrumbs" style={{ fontSize: "0.8rem" }}>
        <ul>
          <li><a href="/#">Book Me Instead</a></li>
          <li><a href="/#">Blog</a></li>
          {grandParent && (<li><a href="/#">{grandParent.name}</a></li>)}
          {parent && (<li><a href="/#">{parent.name}</a></li>)}
          <li className="is-active"><a href="/#" aria-current="page">{post.name}</a></li>
        </ul>
      </nav>
    </td>
  </tr>
)

export default CategoryRow
