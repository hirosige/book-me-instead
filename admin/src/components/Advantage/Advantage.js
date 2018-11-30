import React from 'react'
import AdvantageDeleteMutation from './AdvantageDeleteMutation';
import AdvantageEditMutation from './AdvantageEditMutation';

const Advantage = ({ advantage }) => (
  <tr>
    <td>{advantage.name}</td>
    <td>
      {advantage.icon ? (
        <div>
          <figure class="image is-32x32">
            <img
              src={advantage.icon.cdnUrl}
              alt={advantage.icon.name}
            />
          </figure>
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
          <AdvantageDeleteMutation deleteId={advantage.id} />
        </div>
      </div>
    </td>
  </tr>
)

export default Advantage