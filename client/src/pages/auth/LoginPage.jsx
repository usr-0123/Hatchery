import React from 'react'
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import './Auth.scss'

import { validatePasswordPattern } from '../../helpers/validators.js';
import { useAuthenticateUserMutation } from '../../features/apis/usersApis.js';
import { interceptor } from '../../services/Interceptor.js';
import { setToken } from '../../helpers/token.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const [authenticate, { isLoading, data }] = useAuthenticateUserMutation();

    const onFinish = async (e) => {

        if (e) {
            const response = interceptor({ params: await authenticate(e), type: 'Mutation' });

            if (response && response.token) {
                setToken(response.token)
                navigate('/dashboard', { replace: true });
            };
        };
    };

    return (
        <Form
            onFinish={(e) => onFinish(e)}
            className="authForm"
            initialValues={{
                remember: true,
            }}
        >
            <h1>Welcome back! Please login</h1>
            <Form.Item
                name="userEmail"
                className='formItem'
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email address!',
                    },
                ]}
            >
                <Input placeholder='Enter your email' className='formInput' />
            </Form.Item>

            <Form.Item
                name="userPassword"
                className='formItem'
                rules={[
                    {
                        required: true,
                        validator: validatePasswordPattern,
                    },
                ]}
            >
                <Input.Password placeholder='Enter password' className='formInput' />
            </Form.Item>

            <Form.Item className='formButton' >
                <Button type="primary" className='submitButton' loading={isLoading} disabled={isLoading} htmlType="submit" > {isLoading ? 'Please wait' : 'Log in'} </Button>
            </Form.Item>

        </Form>
    )
}

export default LoginPage;