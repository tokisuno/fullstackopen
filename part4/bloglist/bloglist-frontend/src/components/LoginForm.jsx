import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: Prototypes.func.isRequired,
  handleUsernameChange: Prototypes.func.isRequired,
  handlePasswordChange: Prototypes.func.isRequired,
  username: Prototypes.string.isRequired,
  password: Prototypes.string.isRequired
}

export default LoginForm;
