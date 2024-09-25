import React from 'react'
import { Button, Form, Input, Select } from 'antd';

import { validateNameLength, validatePasswordPattern, validateUserNameLength } from '../../../../helpers/validators.js';
import { useRegisterUserMutation } from '../../../../features/apis/usersApis.js';
import { decodeToken } from '../../../../helpers/token.js';
import { interceptor } from '../../../../services/Interceptor.js';

const New_User = () => {
    const [form] = Form.useForm();
    const [register, { isLoading: registeringUser }] = useRegisterUserMutation();

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

    const onFinish = async (value) => {
        if (user?.userId, value) {
            const response = interceptor({ params: await register({ editorId: user?.userId, user: value }), type: 'Mutation' });
            if (response) {
                form.resetFields();
            };
        };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Register A New Account</h1>
            <Form
                onFinish={(e) => onFinish(e)}
                form={form}
                layout='vertical'
                style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}
                initialValues={false}
            >
                <Form.Item
                    name="userRole"
                    label='User Role'
                    style={{
                        width: '50%',
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
                    label='First Name'
                    style={{
                        width: '50%',
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
                    label='Last Name'
                    style={{
                        width: '50%',
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
                    label='Surname'
                    style={{
                        width: '50%',
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
                    label='Location'
                    style={{
                        width: '50%',
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
                    label='Username'
                    style={{
                        width: '50%',
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
                    label='Email Address'
                    style={{
                        width: '50%',
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
                    label='Password'
                    style={{
                        width: '50%',
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

            </Form>
            <Button type="primary" style={{width: '150px'}} disabled={registeringUser} loading={registeringUser} htmlType="submit"> Sign Up </Button>
        </div>
    )
}

export default New_User;