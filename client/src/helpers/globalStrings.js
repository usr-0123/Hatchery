export const userRoles = {
    admin: {
        key: 'admin',
        name: 'Admin',
        value: 'Admin'
    },
    employee: {
        key: 'employee',
        name: 'Employee',
        value: 'Employee'
    },
    user: {
        key: 'user',
        name: 'User',
        value: 'User'
    }
};

export const batchStatus = {
    recieved: {
        key: 'recieved',
        name: 'Recieved',
        value: 'Recieved'
    }
};

export const incubationOptions = [
    {
        value: null,
        text: 'None',
        label: 'Select...'
    }, {
        text: 'Ongoing',
        value: 'Ongoing',
        label: 'Ongoing'
    }, {
        text: 'Hatched',
        value: 'Hatched',
        label: 'Hatched'
    }, {
        text: 'Spoilt',
        value: 'Spoilt',
        label: 'Spoilt'
    },
]