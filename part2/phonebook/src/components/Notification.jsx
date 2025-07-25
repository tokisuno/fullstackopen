const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={error ? 'notif-neg' : 'notif-pos'}>
      {message}
    </div>
  )
}

export default Notification
