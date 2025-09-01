const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input value={username} onChange={handleUsernameChange} />
          </label>
        </div>
        <div>
          <label>
            password
            <input value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
