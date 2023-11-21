export default [
    {
        path: '/purchase-order',
        name: 'PurchaseOrderList',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Purchase Order List',
        }
    },
    {
        path: '/purchase-order/create',
        name:'PurchaseOrderCreate',
        component: () => import("./Create"),
        meta: {
            auth: true,
            title: 'Create Purchase Order',
        }
    },
    {
        path: '/purchase-order/update/:id',
        name:'PurchaseOrderUpdate',
        component: () => import("./Update"),
        meta: {
            auth: true,
            title: 'Update Purchase Order',
        },
    }
]