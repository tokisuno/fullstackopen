const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  // last 3 chars
  const code = message.slice(-3);

  console.log(code);

  if (code === "200") {
    return (
      <div className="ok">
      {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification;
