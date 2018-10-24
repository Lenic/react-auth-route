import React from 'react';
import PropTypes from 'prop-types';

class AsyncComponent extends React.PureComponent {
  static Delay = 200
  static Loading = null

  static propTypes = {
    delay: PropTypes.number,
    component: PropTypes.func.isRequired,
    loading: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    delay: null,
    loading: null,
  }

  constructor(props) {
    super(props);

    this.$isUnmount = false;
    this.state = {
      Component: null,
      isExpired: false,
    };
  }

  componentDidMount() {
    const { delay, component } = this.props
      , token = setTimeout(() => !this.$isUnmount && this.setState({
        isExpired: true,
      }), delay || this.constructor.Delay);

    component().then(v => {
      clearTimeout(token);

      if (this.$isUnmount) {
        return;
      }

      this.setState({
        Component: v.__esModule ? v.default : v,
      });
    });
  }

  componentWillUnmount() {
    this.$isUnmount = true;
  }

  render() {
    const { loading, ...rest } = this.props
      , { Component } = this.state
      , Loading = loading || AsyncComponent.Loading;

    if (Component) {
      return React.createElement(Component, rest);
    } else if (this.state.isExpired) {
      return Loading ? <Loading /> : null;
    } else {
      return null;
    }
  }
}

export default AsyncComponent;
