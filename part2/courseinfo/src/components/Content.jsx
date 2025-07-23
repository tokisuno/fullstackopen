const Content = (props) => {
  return (
    <div>
      <ul>
        {
          props.parts.map((item, _) => {
            return <li key={item.id}>{item.name} ({item.exercises})</li>
          })
        }
      </ul>
    </div>
  )
}

export default Content
