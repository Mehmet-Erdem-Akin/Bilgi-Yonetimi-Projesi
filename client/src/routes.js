/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import ProductManagement from "views/ProductManagement/ProductManagement.js";
import OrderManagement from "views/OrderManagement/OrderManagement.js";

import PeopleIcon from "@material-ui/icons/People";
import ExtensionIcon from "@material-ui/icons/Extension";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TableList from "views/TableList/TableList.js";

const dashboardRoutes = [{
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin"
    },
    
    {
        path: "/product-management",
        name: "Product Management",
        rtlName: "ملف تعريفي للمستخدم",
        icon: ExtensionIcon,
        component: ProductManagement,
        layout: "/admin"
    },
    {
        path: "/order-management",
        name: "Order Management",
        rtlName: "ملف تعريفي للمستخدم",
        icon: ShoppingCartIcon,
        component: OrderManagement,
        layout: "/admin"
    },
    {
        path: "/table",
        name: "Table List",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: TableList,
        layout: "/admin"
    },
    {
        path: "/landing-page",
        name: "Sipariş Sayfasına Dön",
        icon: ArrowBackIcon,
        layout: "",
        to: "/landing-page"
    },
    
   
    
    
];

export default dashboardRoutes;