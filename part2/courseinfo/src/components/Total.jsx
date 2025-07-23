const Total = (props) => {
  const total = Object.values(props.ex).reduce((sum, { exercises }) => sum + exercises, 0)

  return (
    <div>
      <h3>
        Total: {total}
      </h3>
    </div>
  )
}

export default Total
