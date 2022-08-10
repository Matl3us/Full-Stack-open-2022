import React from "react"

const Person = ({ number, handleDeletion }) => (
  <div>
    {number.name} {number.number}
    <button onClick={handleDeletion}>delete</button>
  </div>
)

export default Person