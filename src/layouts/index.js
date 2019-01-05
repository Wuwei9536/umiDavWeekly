import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { renderRoutes } from 'dva-router-config';
import { Layout, Menu, Icon } from 'antd';
import style from './index.less';
import 'antd/dist/antd.less';
import 'ant-design-pro/dist/ant-design-pro.css';

const {
    Header, Content, Sider
} = Layout;

class LayoutView extends React.Component {
    static propTypes = {
        siderList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        route: PropTypes.shape({
            routes: PropTypes.arrayOf(PropTypes.shape({}))
        }).isRequired
    }

    dealRoute = (path) => {
        const { history } = this.props;
        history.push(path);
    }

    render() {
        const { siderList, children } = this.props;
        return (
            <Layout className={style.height100}>
                <Sider style={{
                    overflow: 'auto', height: '100vh', position: 'fixed', left: 0
                }}
                >
                    <div className="logo"><Icon type="calendar" /></div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
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
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '12px 12px 0', overflow: 'initial' }}>
                    {children}
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }} /> */}
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ layOut }) => ({
    siderList: layOut
});


export default connect(mapStateToProps)(LayoutView);
