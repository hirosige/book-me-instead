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
        {advantage.icon ? (
          <div>
            <figure className="image is-32x32 u-disp-ib">
              <img
                src={advantage.icon.cdnUrl}
                alt={advantage.icon.name}
              />
            </figure>
            <div className="u-mls u-disp-ib"/>
            <ImageModal
              className="u-disp-ib"
              url={advantage.icon.cdnUrl}
              alt={advantage.icon.name}
            />
          </div>
        ) : (
          <div>画像なし</div>
        )}
      </td>
      <td>
        <div className="field has-addons">
          <div className="control">
            <AdvantageEditMutation editItem={advantage} />
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