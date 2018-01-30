import React from 'react'

const ValueComponent = (props) => {
  const {data, date, user} = props

  return (
    <div className="value">
      <input className="value__data" value={data} />
      <span className="value__date">{`Date: ${date}`}</span>
      <span className="value__user">{`User: ${user}`}</span>
    </div>
  )
}

export default ValueComponent
