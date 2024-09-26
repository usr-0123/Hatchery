import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Avatar, Typography, Divider, Form, Input, Button, message, DatePicker, Select, Descriptions } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { decodeToken } from "../helpers/token";
import { useGetUserByUserIdQuery, useUpdateUserDetailsMutation } from "../features/apis/usersApis.js";
import { convertDateToUIFormat } from "../helpers/dateConversion.js";
import { interceptor } from "../services/Interceptor.js";

const { Title, Text } = Typography;

const genderOptions = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

const Profile = () => {
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

    const data = decodeToken();

    const { data: userData, refetch } = useGetUserByUserIdQuery(data?.userId);

    const [updateUser, { isLoading }] = useUpdateUserDetailsMutation();

    useEffect(() => {
        if (userData?.data) {
            setUser(userData.data[0]);
        };

        refetch();
    }, [userData, refetch, form]);

    const handleSubmit = async (values) => {
        console.log(values);

        if (user?.userId && user?.userId && values) {

            const response = interceptor({ params: await updateUser({ editorId: user?.userId, userId: user?.userId, editedValues: values }), type: 'Mutation' });

            if (response) {
                form.resetFields();
                refetch();
                setEdit(!edit);
            };

        };
    };

    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName ? firstName.charAt(0) : '';
        const lastInitial = lastName ? lastName.charAt(0) : '';
        return firstInitial + lastInitial;
    };

    const avatarContent = user?.firstName && user?.lastName ? getInitials(user.firstName, user.lastName) : <UserOutlined />;

    return (
        <div style={{ padding: '20px', margin: 'auto' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                            verticalAlign: 'middle',
                        }}
                        size={"large"}
                    >
                        {avatarContent}
                    </Avatar>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Title level={2}>{user.firstName} {user.lastName}</Title>
                    <Title level={3}>Assigned Role: {user.userRole} </Title>
                </div>
            </div>
            <Divider />
            <Form
                form={form}
                layout="vertical"
                disabled={!edit}
                onFinish={handleSubmit}
                style={!edit ? { display: 'none' } : { display: 'flex', flexWrap: 'wrap', gap: '6%' }}
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.firstName || 'Enter first name.'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.lastName || 'Enter your last name.'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="surName"
                    label="Surname"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.surName || 'Enter your surname.'} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="userName"
                    label="User Name"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.userName || 'Enter your username.'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="userEmail"
                    label="Email Address"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.userEmail || 'Enter your email address.'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="userPhoneNumber"
                    label="Phone Number"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.userPhoneNumber || 'Enter your phone number.'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="street"
                    label="Street"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.street || 'Enter street details.'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="userLocation"
                    label="Location"
                    style={{ width: '47%' }}
                >
                    <Input placeholder={user?.userLocation || 'Enter your location.'} style={{ width: '100%' }} />
                </Form.Item>
            </Form>
            <Button type="primary" loading={isLoading} onClick={() => form.submit()} style={!edit && { display: 'none' }} > Update Profile </Button>
            <Button type="primary" onClick={() => setEdit(!edit)} style={{ margin: '0 0 10px 10px' }} >{edit ? "Cancel Edit" : "Edit Details"}</Button>
            <Descriptions column={2} bordered style={edit && { display: 'none' }} >
                <Descriptions.Item label='Names'>{user?.firstName + ' ' + (user?.surName ? user?.surName : ' ') + user?.lastName}</Descriptions.Item>
                <Descriptions.Item label='Surname'>{user?.surName || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label='Username' >{user.userName || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label='Email Address' >{user?.userEmail || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label='Phone Number' >{user?.userPhoneNumber || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label='membershipDate'>{user?.membershipDate ? convertDateToUIFormat(user?.membershipDate) : 'N/A'}</Descriptions.Item>
                <Descriptions.Item label='Street Address'>{user?.userStreet || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label='userLocation'>{user?.userLocation || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default Profile;