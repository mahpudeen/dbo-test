export default [
    {
        path: '/sales-order',
        name: 'SalesOrderList',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Sales Order List',
        }
    },
    {
        path: '/sales-order/create',
        name:'SalesOrderCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Create Sales Order',
        }
    },
    {
        path: '/sales-order/update/:id',
        name:'SalesOrderUpdate',
        component: () => import("./Update"),
        meta: {
            auth: true,
            title: 'Update Sales Order',
        },
    }
]