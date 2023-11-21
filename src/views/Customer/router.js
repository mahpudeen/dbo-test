export default [
    {
        path: '/customer',
        name: 'CustomerList',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Customer List',
        }
    },
    {
        path: '/customer/create',
        name:'CustomerCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Create Customer',
        }
    },
    {
        path: '/customer/update/:id',
        name:'CustomerUpdate',
        component: () => import("./Update"),
        meta: {
            auth: true,
            title: 'Update Customer',
        },
    }
]