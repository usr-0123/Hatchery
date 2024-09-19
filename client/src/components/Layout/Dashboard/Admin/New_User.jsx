import React from 'react'
import { Button, Form, Input, Select } from 'antd';

import { validateNameLength, validatePasswordPattern, validateUserNameLength } from '../../../../helpers/validators.js';
import { useRegisterUserMutation } from '../../../../features/apis/usersApis.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';

const New_User = () => {
    const [form] = Form.useForm();
    const [register, { isLoading: registeringUser, data: registerUserData }] = useRegisterUserMutation();

    const userRoles = [
        {
            key: 'default', label: 'Select role', value: null
        }, {
            key: 'employee', label: 'Employee', value: 'Employee'
        }, {
            key: 'farmer', label: 'Farmer', value: 'User'
        }, {
            key: 'admin', label: 'Admin', value: 'Admin'
        }
    ];

    const user = decodeToken();

    const onFinish = async (e) => {

        const response = interceptor({ params: await register({ editorId: user?.userId, user: e }), type: 'Mutation' });

        if (response) {
            form.resetFields();
        };
    };

    return (
        <Form
            onFinish={(e) => onFinish(e)}
            form={form}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            initialValues={{
                remember: true,
            }}
        >
            <h1>Register A New Account</h1>
            <Form.Item
                name="userRole"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        message: 'Please select a role.'
                    },
                ]}
            >
                <Select
                    defaultValue='Select role'
                    style={{ minWidth: '300px' }}
                    options={userRoles}
                />
            </Form.Item>
            <Form.Item
                name="firstName"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        validator: validateNameLength,
                    },
                ]}
            >
                <Input placeholder='Enter your first name' style={{ minWidth: '300px' }} />
            </Form.Item>

            <Form.Item
                name="lastName"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        validator: validateNameLength,
                    },
                ]}
            >
                <Input placeholder='Enter your last name' style={{ minWidth: '300px' }} />
            </Form.Item>

            <Form.Item
                name="surName"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Input placeholder='Enter your surname (Optional)' style={{ minWidth: '300px' }} />
            </Form.Item>

            <Form.Item
                name="userLocation"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        message: 'Please enter your location.',
                    },
                ]}
            >
                <Input placeholder='Enter your location' style={{ minWidth: '300px' }} />
            </Form.Item>

            <Form.Item
                name="userName"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        validator: validateUserNameLength,
                    },
                ]}
            >
                <Input placeholder='Enter your username' style={{ minWidth: '300px' }} />
            </Form.Item>

            <Form.Item
                name="userEmail"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email address!',
                    },
                ]}
            >
                <Input placeholder='Enter your email' style={{ minWidth: '300px' }} />
            </Form.Item>


            <Form.Item
                name="userPassword"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                rules={[
                    {
                        required: true,
                        validator: validatePasswordPattern,
                    },
                ]}
            >
                <Input.Password placeholder='Enter password' style={{ minWidth: '300px' }} />
            </Form.Item>

            <Form.Item
                className='formButton'
            >
                <Button type="primary" className='submitButton' disabled={registeringUser} loading={registeringUser} htmlType="submit"> Sign Up </Button>
            </Form.Item>
        </Form>
    )
}

export default New_User;