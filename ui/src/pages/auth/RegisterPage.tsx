import { Button, Form, Input, type FormProps } from 'antd';
import './AuthStyles.scss';
import { FC } from 'react';

type FieldType = {
    emailAddress?: string;
    password?: string;
};

const RegisterPage: FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (params) => {
        console.log(params);
    };

    return (
        <div className="mainLayout">
            <Form
                name="registerLogin"
                onFinish={onFinish}
                className="authForm"
            >
                <h1>Register</h1>
                <Form.Item
                    label="Email Address"
                    name="emailAddress"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please enter a valid email address!'
                        },
                    ]}
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
                    <Button key="registerUser" type="primary" htmlType="submit" > Register </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default RegisterPage;