import { Button, Form, Input } from "antd";
import type { FormProps } from 'antd';
import { FC } from "react";
import './AuthStyles.scss';

type FieldType = {
    emailAddress?: string;
    password?: string;
};

const LoginPage: FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (params) => {
        console.log(params);
    };

    return (
        <div className="mainLayout">
            <Form
                name="loginForm"
                onFinish={onFinish}
                className="authForm"
            >
                <h1>Login</h1>
                <Form.Item
                    label="Email Address"
                    name="emailAddress"
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
                >
                    <Input placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            // validator: validatePasswordPattern,
                        },
                    ]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item className="submitButton" >
                    <Button key="loginUser" type="primary" htmlType="submit" > Log in </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default LoginPage;