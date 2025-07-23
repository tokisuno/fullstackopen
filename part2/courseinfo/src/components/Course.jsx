import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = (props) => {
  return (
    <>
      <Header text={props.course} />
      <Content parts={props.course.parts} />
      <Total ex={props.course.parts} />
    </>
  )
}

export default Course
