import React from "react";
import PropTypes from 'prop-types';
import { connect } from "dva";
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
import style from './index.less';

const { Tab, UserName, Password, Submit } = Login;

class LoginDemo extends React.Component {
  state = {
    notice: '',
    type: 'tab1',
    autoLogin: true
  }

  static propTypes = {
  }

  onSubmit = (err, values) => {
    let username = "";
    //const { autoLogin, type } = this.state;
    const { history } = this.props;
    if (values.username) {
      username = values.username;
    }
    window.localStorage.setItem("weekly-authority", username);
    this.loginIn("/api/support/week/login", { "ldapName": "wei.wu01", "password": "Ww5201314,,,,,," });
    history.push('/');
  }

  loginIn = (api, data) => {
    let opts = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(api, opts)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log("login fail: ", error);
      });
  };

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
    const { type, notice, autoLogin } = this.state;
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

// const mapStateToProps = state => ({
//   authority: state.ReducerLogin.ladp
// });

export default connect()(LoginDemo);
