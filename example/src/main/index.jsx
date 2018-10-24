import React from 'react';
import { Link, Switch } from 'react-router-dom';
import { AuthRoute, AsyncComponent } from '@lenic/react-auth-route';

import Sync from './sync';

class Main extends React.PureComponent {
  logoutHandler() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <div>
          <input type="button" value="logout" onClick={this.logoutHandler.bind(this)} />
        </div>
        <div>
          <div>可点击的菜单项</div>
          <ul>
            <li>
              <Link to="/">回到首页</Link>
            </li>
            <li>
              <Link to="/roles">角色列表：显示没有权限</Link>
            </li>
            <li>
              <Link to="/users">账户列表：直接跳转登录页</Link>
            </li>
            <li>
              <Link to="/list">业务列表：异步加载</Link>
            </li>
            <li>
              <Link to="/edit/1">编辑功能：自定义异步加载组件</Link>
            </li>
            <li>
              <Link to="/sync">同步模块：点击即跳转</Link>
            </li>
          </ul>
        </div>
        <hr />
        <Switch>
          <AuthRoute key="roles" path="/roles">
            <AsyncComponent
              component={() => import('./roles').then(v => new Promise(r => setTimeout(() => r(v), 2000)))}
            />
          </AuthRoute>
          <AuthRoute key="users" path="/users">
            <AsyncComponent
              component={() => import('./users').then(v => new Promise(r => setTimeout(() => r(v), 2000)))}
            />
          </AuthRoute>
          <AuthRoute key="edit" path="/edit/:id">
            <AsyncComponent
              loading={() => <div>自定义加载组件，覆盖缺省加载组件...</div>}
              component={() => import('./edit').then(v => new Promise(r => setTimeout(() => r(v), 2000)))}
            />
          </AuthRoute>
          <AuthRoute key="list" path="/list">
            <AsyncComponent
              component={() => import('./list').then(v => new Promise(r => setTimeout(() => r(v), 2000)))}
            />
          </AuthRoute>
          <AuthRoute key="sync" path="/sync" component={Sync} />
        </Switch>
      </div>
    );
  }
}

export default Main;
