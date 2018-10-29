import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

let Valid = null;

class AuthRoute extends React.PureComponent {
  static setValid = v => Valid = v

  static propTypes = {
    valid: PropTypes.func,
  }

  static defaultProps = {
    valid: null,
  }

  render() {
    const { valid, component, children, ...rest } = this.props
      , validX = valid || Valid;

    return (
      <Route {...rest} render={({ staticContext, ...props }) => {
        let validatedResult = !validX ? true : validX(props, this.props);

        if (!validatedResult) {
          return null;
        } else if (validatedResult === true) {
          if (component) {
            return React.createElement(component, props);
          } else if (children) {
            return React.cloneElement(children, props);
          } else {
            throw new Error('The component and children must be have one.');
          }
        } else {
          return validatedResult;
        }
      }} />
    );
  }
}

export default AuthRoute;
