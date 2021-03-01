import { MenuItems } from '@app/core';

export default [{
    title: 'dashboard',
    path: 'dashboard',
    icon: 'fa fa-lg fa-home',
},
{
    title: 'Customers',
    icon: 'fa fa-lg fa-users',
    path: 'customers',
    children: [
        {
            title: 'Customer Info',
            path: 'customers/info',
        },
        {
            title: 'user customer management',
            path: 'customer/user-customer-info',
        },
        {
            title: 'customer management',
            path: 'customer/customer-mng',
        },
    ],
},
{
    title: 'Requests',
    icon: 'fa fa-lg fa-mail-bulk',
    children: [
        {
            title: 'View Request Queue',
            path: 'requests',
        },
        {
            title: 'View Services',
            path: 'request/services',
        },
        {
            title: 'View Status',
            path: 'request/status',
        },
        {
            title: 'View Upgraded Request',
            path: 'request/upgraded',
        },
        {
            title: 'New Phone Request',
            path: 'request/phone-req',
        },
        {
            title: 'New Email Request',
            path: 'request/email-req',
        },
        {
            title: 'New Process Request',
            path: 'request/process-req',
        },
        {
            title: 'Search',
            path: 'request/customer'
        },
    ],
},
{
    title: 'Reports',
    icon: 'fa fa-lg fa-chart-line',
    children: [
        {
            title: 'Demo',
            path: 'reports',
        },
        {
            title: 'New',
            path: 'reports/new',
        },
        {
            title: 'Insert Info',
            path: 'reports/insert-info',
        },
    ],
},
{
    title: 'System Management',
    path: 'system-mng',
    icon: 'fa fa-lg fa-wrench',
}
] as MenuItems;
