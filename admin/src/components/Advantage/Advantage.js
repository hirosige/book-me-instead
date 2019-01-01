import React from 'react'
import AdvantageEditMutation from './AdvantageEditMutation'
import AdvantageDeleteMutation from './AdvantageDeleteMutation';
import ImageModal from '../Shared/ImageModal';

const Advantage = ({
  advantage,
  notifyUser,
  indexVariables,
  onedayTodoHere,
}) => {

  return (
    <tr>
      <td>{advantage.name}</td>
      <td>
      <div class="tags has-addons">
        <span class="tag is-danger"><i class={`${advantage.iconName}`}></i></span>
        <div class="tag is-warning">{advantage.iconName}</div>
      </div>
      </td>
      <td>
        <div className="field has-addons">
          <div className="control">
            <AdvantageEditMutation
              advantage={advantage}
              notifyUser={notifyUser}
              indexVariables={indexVariables}
            />
          </div>
          <div className="control">
            <AdvantageDeleteMutation
              advantage={advantage}
              notifyUser={notifyUser}
              indexVariables={indexVariables}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Advantage