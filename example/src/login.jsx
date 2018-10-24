import React from 'react';

class Login extends React.PureComponent {
  submitHandler() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div>User:</div>
        <div>
          <input type="text" name="user" />
        </div>
        <div>Password:</div>
        <div>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Submit" onClick={this.submitHandler.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Login;
