import React from "react"

const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Total = ({ sum }) => (
    <b>total of {sum} exercises</b>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((partialSum, item) => partialSum + item.exercises, 0)} />
    </div>
)

export default Course