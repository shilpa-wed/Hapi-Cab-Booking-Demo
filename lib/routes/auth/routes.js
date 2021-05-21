module.exports = [
    {
        method: 'POST',
        path: '/login',
        options: {
            description: 'get one customer by ID',
            notes: 'GET customer API',
            tags: ['api', 'customers'],
            cors: true
        },
        handler: async request =>
            // Todo logic pending
            ({
                token: null
            })
    }
];
