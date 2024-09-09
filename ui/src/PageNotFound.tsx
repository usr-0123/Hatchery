import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, Resource not found."
            extra={
                <Button type="primary" onClick={() => navigate('/dashboard')}> Back Home </Button>
            }
        />
    );
};

export default PageNotFound;