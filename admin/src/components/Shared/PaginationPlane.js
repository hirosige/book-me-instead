import React from 'react'
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PageItems from './PageItems';


const PaginationPlane = (props) => (
  <nav className="level" style={{
    background: "rgb(218, 234, 237)",
    padding: "10px",
    marginBottom: 0,
  }}>
    <div className="level-left">
      <div className="level-item">
        <nav className="pagination is-centered is-small">
          <PreviousButton
            current={props.currentPage}
            previousPage={props.previousPage}
          />
          <NextButton
            lastPage={props.lastPage}
            current={props.currentPage}
            nextPage={props.nextPage}
          />
          <PageItems
            current={props.currentPage}
            lastPage={props.lastPage}
            movePage={props.movePage}
          />
        </nav>
      </div>
    </div>

    <div className="level-right">
      <div className="level-item">
        <div style={{ marginRight: "10px" }}>Record per page</div>
        <div className="select is-rounded">
          <select
            onChange={props.changeRecordPerPage}
            defaultValue={props.recordPerPage}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
            <option key={20}>20</option>
            <option key={30}>30</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
)

export default PaginationPlane