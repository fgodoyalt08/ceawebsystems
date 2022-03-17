import type { NextPage } from 'next'
import { useEffect } from 'react'
import { login } from "../redux/actions/user"
import useUser from './../hooks/useUser';
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { IUserLoginData } from '../redux/interfaces/user';
import { Layout, Row, Col, Form, Input, Button, notification } from 'antd';
import Router from 'next/router'
const { Content } = Layout;

const Login: NextPage = () => {
  useUser();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state)=> state.user.data);
  const userDataError = useAppSelector((state)=> state.user.error);
  const userDataRequest = useAppSelector((state)=> state.user.request);
  
  useEffect(()=>{
    
    if(!userDataError || !userDataError.message) {
      return;
    }

    notification.open({
      message: 'Information',
      description: userDataError?.message
    });

  }, [userDataError])

  useEffect(()=>{
    
    if(!userData || !userData.token) {
      return;
    }
    
    Router.push("/");

  }, [userData])
  
  const onFinish = async (values: IUserLoginData) => {
    dispatch(login(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    notification.open({
      message: 'Information',
      description: errorInfo?.message
    });
  };

  return ( <Layout>
      <Content>
        <Row justify="center" align="middle" style={{height: "100vh"}}>
          <Col lg={4} md={8} xs={18}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout='vertical'
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={userDataRequest} disabled={userDataRequest} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          
        </Row>
    </Content>
  </Layout>
  )
}

export default Login
