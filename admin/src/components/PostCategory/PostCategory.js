import React from 'react'
import AddCategoryButton from './AddCategoryButton';
import DeleteTagMutation from '../Shared/DeleteTagMutation';
import {
  DELETE_A_POST_CATEGORY,
} from '../../queries/PostCategory'

const PostCategory = ({ postCategory, me }) => (
  <React.Fragment>
    <tr>
      <td>
        <span className="tag is-small is-primary">
          {postCategory.name}
          <DeleteTagMutation
            deleteId={postCategory.id}
            title="Are you sure to delete ?"
            mutation={DELETE_A_POST_CATEGORY}
          />
        </span>
      </td>
      <td><AddCategoryButton category={postCategory} /></td>
      <td>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="#">Book Me Instead</a></li>
            <li><a href="#">Blog</a></li>
            <li class="is-active"><a href="#" aria-current="page">{postCategory.name}</a></li>
          </ul>
        </nav>
      </td>
    </tr>
    {postCategory.children.map(child => (
      <React.Fragment>
        <tr>
          <td>
            <i class="fas fa-angle-double-right"></i>
            &nbsp;
            <span className="tag is-small is-warning">
              {child.name}
              <DeleteTagMutation
                deleteId={child.id}
                title="Are you sure to delete ?"
                mutation={DELETE_A_POST_CATEGORY}
              />
            </span>
          </td>
          <td><AddCategoryButton category={child} /></td>
          <td>
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a href="#">Book Me Instead</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">{postCategory.name}</a></li>
                <li class="is-active"><a href="#" aria-current="page">{child.name}</a></li>
              </ul>
            </nav>
          </td>
        </tr>
        {child.children.map(grandChild => (
          <React.Fragment>
            {!grandChild.isRoot && (
              <tr>
                <td>
                  <i class="fas fa-angle-double-right"></i>
                  <i class="fas fa-angle-double-right"></i>
                  &nbsp;
                  <span className="tag is-small is-danger">
                    {grandChild.name}
                    <DeleteTagMutation
                      deleteId={grandChild.id}
                      title="Are you sure to delete ?"
                      mutation={DELETE_A_POST_CATEGORY}
                    />
                  </span>
                </td>
                <td><span className="tag is-small is-warning">これ以上下にはカテゴリを追加できません</span></td>
                <td>
                  <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                      <li><a href="#">Book Me Instead</a></li>
                      <li><a href="#">Blog</a></li>
                      <li><a href="#">{postCategory.name}</a></li>
                      <li><a href="#">{child.name}</a></li>
                      <li class="is-active"><a href="#" aria-current="page">{grandChild.name}</a></li>
                    </ul>
                  </nav>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
  </React.Fragment>
)

export default PostCategory