import React from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
import style from './index.less';
// import { reloadAuthorized } from '../../utils/Authorized';
// import { dispatch } from "rxjs/internal/observable/pairs";

const { Tab, UserName, Password, Submit } = Login;

class LoginDemo extends React.Component {
  state = {
    type: 'tab1',
    autoLogin: true
  }

  static propTypes = {
  }

  onSubmit = (err, values) => {
    const { username, password } = values
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: { ldapName: username, password }
    })
  }

  onTabChange = (key) => {
    this.setState({
      type: key
    });
    /* eslint-disable */
    console.log(this.props.authority)
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked
    });
  }

  render() {
    const { type, autoLogin } = this.state;
    const { notice } = this.props;
    return (
      <div className={style.loginBackground}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
          className={style.login}
        >
          <Tab key="tab1" tab="Account">
            {
              notice
              && <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />
            }
            <UserName name="username" />
            <Password name="password" />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin} className={style.colorWhite}>Keep me logged in</Checkbox>
            <a style={{ float: 'right' }} href="##">Forgot password</a>
          </div>
          <Submit>Login</Submit>
          <div>
            <span className={style.colorWhite}>Other login methods</span>
            <span className="icon icon-alipay" />
            <span className="icon icon-taobao" />
            <span className="icon icon-weibo" />
            <a style={{ float: 'right' }} href="##">Register</a>
          </div>
        </Login>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  notice: login.notice
});

export default connect(mapStateToProps)(LoginDemo);
