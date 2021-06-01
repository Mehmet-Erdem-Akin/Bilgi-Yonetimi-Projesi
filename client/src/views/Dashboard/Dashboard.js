import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import PeopleIcon from "@material-ui/icons/People";
import ExtensionIcon from "@material-ui/icons/Extension";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
    }
  }
`;
const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id   
    }
  }
`;
const GET_USERS_2 = gql`
  query getUsers {
    getUsers {
      id
      firstName
      lastName
      email
      username
      age
      city
      country
      adress
    }
  }
`;
const GET_PRODUCTS_2 = gql`
  query getProducts {
    getProducts {
      id
      name
      description
      price
      
    }
  }
`;

const ALL_ORDERS = gql`
  query allOrders {
    allOrders {
      id
      product{
        price
      }
    }
  }
`;
const ALL_ORDERS_2 = gql`
  query allOrders {
    allOrders {
      id
      order_status
      order_started_date
      user {
        id
        firstName
        lastName
        username
        adress
      }     
      product {
        id
        name
        price
      }
    }
  }
`;

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const { data } = useQuery(GET_USERS);
  const {
   
    data: productData,
  } = useQuery(GET_PRODUCTS);
  const {
  
    data: orderData,
  } = useQuery(ALL_ORDERS);

  const { loading: user2Loading,
    error: user2Error,
    data: user2Data, } = useQuery(GET_USERS_2);
  const {
    loading: product2Loading,
    error: product2Error,
    data: product2Data,
  } = useQuery(GET_PRODUCTS_2);
  const {
    loading: order2Loading,
    error: order2Error,
    data: order2Data,
  } = useQuery(ALL_ORDERS_2);

  if (user2Loading) return "Loading...";
  if (user2Error) return `Error! ${error.message}`;

  const users2Data = user2Data?.getUsers?.map((item) => [
    item.id,
    item.firstName,
    item.lastName,
    item.username,
    item.email,
    item.age,
    item.city,
    item.country,
    item.adress,
  ]);

  
  if (product2Loading) return "Loading...";
  if (product2Error) return `Error! ${error.message}`;

  const products2Data = product2Data?.getProducts?.map((item) => [
    item.id,
    item.name,
    item.description,
    item.price,
  ]);

  if (order2Loading) return "Loading...";
  if (order2Error) return `Error! ${error.message}`;

  const orders2Data = order2Data?.allOrders?.map((item) => [
    item.id,
    item.order_status,
    item.order_started_date,
    item.user.id,
    item.user.firstName,
    item.user.lastName,
    item.user.adress,
    item.product.id,
    item.product.name,
    item.product.price,
  ]);

  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Kullanıcılar</p>
              <h3 className={classes.cardTitle}>
              {data?.getUsers.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
                  Sistemde kayıtlı toplam kullanıcı sayısı
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <ExtensionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Ürünler</p>
              <h3 className={classes.cardTitle}>{productData?.getProducts.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              Sistemde kayıtlı toplam ürün sayısı
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ShoppingCartIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Siparişler</p>
              <h3 className={classes.cardTitle}>{orderData?.allOrders.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Sistemde kayıtlı toplam sipariş sayısı
                              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <MonetizationOnIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Hasılat</p>
              <h3 className={classes.cardTitle}>100</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                Sipariş edilen ürünlerin toplam fiyatı
                              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            //title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Kullanıcılar",
                tabIcon: PeopleIcon,
                tabContent: (
                  <Table
                  tableHeaderColor="primary"
                  tableHead={["Id",
                  "Adı",
                  "Soyadı",
                  "Kullanıcı Adı",
                  "Email",
                  "Yaşı",
                  "Şehir",
                  "Ülke",
                  "Adresi",]}
                  tableData={users2Data}
                />
                ),
              },
              {
                tabName: "Ürünler",
                tabIcon: ExtensionIcon,
                tabContent: (
                  <Table
                  tableHeaderColor="primary"
                  tableHead={["Id",
                  "Ürün Adı",
                  "Açıklama",
                  "Fiyat",]}
                  tableData={products2Data}
                />
                ),
              },
              {
                tabName: "Siparişler",
                tabIcon: ShoppingCartIcon,
                tabContent: (
                  <Table
                tableHeaderColor="primary"
                tableHead={["Id",
                "Sipariş Durumu",
                "Sipariş Tarihi",
                "Alıcı Id",
                "Alıcı Adı",
                "Alıcı Soyadı",
                "Alıcı Adresi",
                "Ürün Id",
                "Ürün Adı",
                "Ürün Fiyatı",]}
                tableData={orders2Data}
              />
                ),
              },
            ]}
          />
        </GridItem>
       
      </GridContainer>
    </div>
  );
}
