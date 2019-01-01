import React from 'react'
import ProfileCreateMutation from './ProfileCreateMutation';
import ChangeRole from './ChangeRole';
import UserDeleteMutation from './UserDeleteMutation'
import ProfileEditMutation from './ProfileEditMutation';

const User = ({
  me,
  user,
  notifyUser,
  indexVariables,
  onedayTodoHere,
}) => {

  const { auth0UserId } = user
  const provider = auth0UserId.split('|')[0]
  const clientId = auth0UserId.split('|')[1]

  return (
    <tr>
      <td>
        {user.email} {user.id === me.id && (
          <span className="tag is-primary">It's Me</span>
        )}
      </td>
      <td>
        <div className="tags has-addons">
          <span className="tag is-danger">{provider}</span>
          <span className="tag">{clientId}</span>
        </div>
      </td>
      <td>{user.omiseCustomerId}</td>
      <td>
        <div className="tags has-addons" style={{ marginBottom: 0 }}>
          <span className="tag">Current Role</span>
          <span className="tag is-primary">{user.role}</span>
        </div>
        {me.role === 'ADMIN' && (
          <ChangeRole
            user={user}
            notifyUser={notifyUser}
            indexVariables={indexVariables}
          />
        )}
      </td>
      <td>
        {user.favorites.length !== 0 ? (
          <React.Fragment>
            <div className="tags has-addons" style={{ marginBottom: 0 }}>
              <span className="tag">{user.favorites.length}</span>
              <span className="tag is-primary">Favorites</span>
            </div>
          </React.Fragment>
        ) : (
          <span>無し</span>
        )}
      </td>
      <td>
        <div className="field has-addons">
          {user.profile ? (
            <div className="control">
              <ProfileEditMutation
                user={user}
                notifyUser={notifyUser}
                indexVariables={indexVariables}
              />
            </div>
          ) : (
            <div className="control">
              <ProfileCreateMutation
                user={user}
                notifyUser={notifyUser}
                indexVariables={indexVariables}
              />
            </div>
          )}
          <div className="control">
            <UserDeleteMutation
              user={user}
              notifyUser={notifyUser}
              indexVariables={indexVariables}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default User