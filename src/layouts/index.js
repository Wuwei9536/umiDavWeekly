import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { renderRoutes } from 'dva-router-config';
import { Layout, Menu, Icon, Avatar, Dropdown, Button } from 'antd';
import style from './index.less';
import 'antd/dist/antd.less';
import 'ant-design-pro/dist/ant-design-pro.css';

const {
    Header, Content, Sider, Footer
} = Layout;

class LayoutView extends React.Component {
    static propTypes = {
        siderList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        route: PropTypes.shape({
            routes: PropTypes.arrayOf(PropTypes.shape({}))
        }).isRequired
    }
    
    // componentDidMount(){
    //     const {dispatch} =this.props;
    //     dispatch({
    //         type:'userDetails/getUser'
    //     })
    // }

    dealRoute = (path) => {
        const { history } = this.props;
        history.push(path);
    }

    logOut = () => {
        const { dispatch } = this.props;
        dispatch({
            type:'layOut/logOut',
        })
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={this.logOut}>
                    <a>退出登录</a>
                </Menu.Item>
            </Menu>
        );
        const { siderList, children } = this.props;
        return (
            <Layout className={style.height100}>
                <Sider
                    className={style.Sider}
                    breakpoint="sm"
                    collapsedWidth="0"
                // onBreakpoint={(broken) => { this.trigger(broken) }}
                // onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className={style.logo}>
                        <Icon type="calendar" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        {siderList.map((item) => {
                            return (
                                <Menu.Item key={item.to} onClick={(e) => { this.dealRoute(e.key); }}>
                                    <Icon type={item.type} />
                                    <span className="nav-text">{item.name}</span>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'right' }}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Avatar
                                alt="Han Solo"
                                style={{ backgroundColor: "#faad14" }}
                            >
                                吴伟
                        </Avatar>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ layOut }) => ({
    siderList: layOut
});


export default connect(mapStateToProps)(LayoutView);
