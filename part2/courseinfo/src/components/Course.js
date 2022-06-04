const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({total}) => {
  return (
    <strong>
      total of {total} exercises
    </strong>
  )
}

const Content = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      {parts.map(part => (<Part key={part.id} name={part.name} exercises={part.exercises} />))}
      <Total total={total}/>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

export default Course;
