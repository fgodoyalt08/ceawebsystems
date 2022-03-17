import type { NextPage } from 'next'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Form, Input, InputNumber, Button, Row, Col, Typography, Radio, DatePicker, notification, Skeleton } from 'antd';
import Layout from './../components/Layout';
import useUser from './../hooks/useUser';
import { IMemberData } from "./../redux/interfaces/member"
import { addMember } from "../redux/actions/member"
import SickSelect from "../components/SickSelect"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"

const { Text, Title  } = Typography

const Home: NextPage = () => {
  const userData = useUser();
  const dispatch = useAppDispatch();
  const memberData = useAppSelector((state)=> state.member.data);
  const memberDataError = useAppSelector((state)=> state.member.error);
  const memberDataRequest = useAppSelector((state)=> state.member.request);
  const [addMemberForm] = Form.useForm();

  useEffect(()=>{
    
    if(!memberDataError || !memberDataError.message) {
      return;
    }

    notification.open({
      message: 'Information',
      description: memberDataError?.message
    });

  }, [memberDataError])

  useEffect(()=>{
    
    if(!memberData) {
      return;
    }

    addMemberForm.resetFields();

    notification.open({
      message: 'Information',
      description: "New member added!"
    });

  }, [memberData])

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Set a valid email!',
      number: 'Set a valid number!',
    },
    number: {
      range: 'Value must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (data: IMemberData) => {
    
    data.birth_date = data.birth_date.toISOString().slice(0,10);
    data.join_date = data.join_date.toISOString().slice(0,10);
    data.employ_date = data.employ_date.toISOString().slice(0,10);

    dispatch(addMember(data));
  };

  if(!userData?.data){
    return <Skeleton />
  }

  return (
    <Layout>
      <h1 className={styles.title}>
        Add Member
      </h1>

      <Row justify="center" align="middle">
        <Col lg={8} md={16} xs={22}>
          <Form
            form={addMemberForm}
            size='large'
            wrapperCol={{span:24}}
            labelCol={{span:24}}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            layout="horizontal"
          >
            <Row gutter={48}>
              <Col>
                <Title level={4}>Personal Info</Title>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name={'first_name'} label={<Text strong>First Name</Text>} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'last_name'} label={<Text strong>Last Name</Text>} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'social_security_number'} label={<Text strong>Social Security #</Text>} rules={[{ type: "number", required: true, min: 1 }]}>
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'iaff_member_number'} label={<Text strong>IAFF</Text>} rules={[{ type: "number", required: true, min: 1 }]}>
                    <InputNumber />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col>
                <Title level={4}>Member Status</Title>
              </Col>
            </Row>
            
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name={'union_membership_status_id'} rules={[{ required: true }]} label="">
                  <Radio.Group>
                    <Row>
                      <Col span={12}>
                        <Radio value="12"><Text strong>Initiated *</Text></Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value="13"><Text strong>Transferred In *</Text></Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={48}>
              <Col>
                <Title level={4}>Demographics</Title>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name={'birth_date'} label={<Text strong>Date of Birth (date)</Text>} rules={[{ required: true, type: "date" }]}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'join_date'} label={<Text strong>Join Date (date)</Text>} rules={[{ required: true, type: "date" }]}>
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={48}>
              <Col>
                <Title level={4}>Job Info</Title>
              </Col>
            </Row>
            
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name={'employ_date'} label={<Text strong>Employ Date (date)</Text>} rules={[{ required: true, type: "date" }]}>
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'badge_number'} label={<Text strong>Badge #</Text>} rules={[{ type: "number", required: true }]}>
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name={'sick_plan_id'} label={<Text strong>Sick Plan #</Text>} rules={[{ required: true }]}>
                  <SickSelect onChange={(value: any)=> addMemberForm.setFieldsValue({ "user.sick_plan_id": value })} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name={'email'} label={<Text strong>Email Address</Text>} rules={[{ required: true, type: "email" }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            
            <Form.Item>
              <Button disabled={memberDataRequest} loading={memberDataRequest} style={{width: "100%"}} type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </Layout>
  )
}

export default Home
