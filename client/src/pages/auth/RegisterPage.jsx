import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';

import { validateNameLength, validatePasswordPattern, validateUserNameLength } from '../../helpers/validators.js';

const genderOptions = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

const RegisterPage = () => {

    const navigate = useNavigate();

    const onFinish = (e) => {
        console.log(e);
        const { firstName, lastName, surName, userName, userEmail, userPassword, userPhoneNumber, userStreet, userLocation } = ''
    };

    return (
        <Form
            onFinish={(e) => onFinish(e)}
            className='authForm'
            initialValues={{
                remember: true,
            }}
        >
            <h1>Register Account</h1>
            <Form.Item
                name="firstName"
                className='formItem'
                rules={[
                    {
                        required: true,
                        validator: validateNameLength,
                    },
                ]}
            >
                <Input placeholder='Enter your first name' className='formInput' />
            </Form.Item>

            <Form.Item
                name="lastName"
                className='formItem'
                rules={[
                    {
                        required: true,
                        validator: validateNameLength,
                    },
                ]}
            >
                <Input placeholder='Enter your last name' className='formInput' />
            </Form.Item>

            <Form.Item
                name="surName"
                className='formItem'
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Input placeholder='Enter your surname (Optional)' className='formInput' />
            </Form.Item>

            <Form.Item
                name="userLocation"
                className='formItem'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your location.',
                    },
                ]}
            >
                <Input placeholder='Enter your email' className='formInput' />
            </Form.Item>

            <Form.Item
                name="userName"
                className='formItem'
                rules={[
                    {
                        required: true,
                        validator: validateUserNameLength,
                    },
                ]}
            >
                <Input placeholder='Enter your username' className='formInput' />
            </Form.Item>

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

            <Form.Item
                className='formButton'
            >
                <Button type="primary" className='submitButton' htmlType="submit"> Sign Up </Button>
            </Form.Item>
            <Form.Item
                className='formItem'
            >
                Or <a href="" onClick={() => navigate("/login", { replace: true })}> login </a>
            </Form.Item>
        </Form>
    )
}

export default RegisterPage;