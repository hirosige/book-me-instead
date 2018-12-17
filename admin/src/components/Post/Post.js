import React from 'react'
import DeleteMutation from '../Shared/DeleteMutation'
import { DELETE_A_POST } from '../../queries/Post'
import PostEditMutation from './PostEditMutation';
import ManageTag from './ManageTag';
import MarkdownPreview from './MarkdownPreview';

const Post = ({ post, me }) => (
  <tr>
    <td>{post.title}</td>
    <td>
      <MarkdownPreview mdContents={post.mdContents} />
    </td>
    <td>
      {post.category ? (
        <span className="tag is-primary">{post.category.name}</span>
      ) : (
        <span className="tag is-danger">カテゴリが設定されてません</span>
      )}
    </td>
    <td>
      {post.hero ? (
        <span className="tag is-primary">有り</span>
      ) : (
        <span className="tag is-warning">無し</span>
      )}
    </td>
    <td>
      {post.photos ? (
        <div className="tags has-addons" style={{ marginBottom: 0 }}>
          <span className="tag is-primary">{post.photos.count}</span>
          <span className="tag">Photos</span>
        </div>
      ) : (
        <span className="tag is-warning">No Photos Uploaded</span>
      )}
    </td>
    <td>
      <div className="c-tag-cloud" style={{ marginBottom: "10px" }}>
        {post.tags.map(tag => (
          <span
            key={tag.id}
            className="tag is-danger"
          >{tag.name}</span>
        ))}
      </div>
      <ManageTag post={post} />
    </td>
    <td>
      <div className="field has-addons">
        <div className="control">
          <PostEditMutation
            editItem={post}
            me={me}
          />
        </div>
        <div className="control">
          <DeleteMutation
            deleteId={post.id}
            title="Are you sure to delete ?"
            mutation={DELETE_A_POST}
          />
        </div>
      </div>
    </td>
  </tr>
)

export default Post