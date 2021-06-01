import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Link, Redirect } from 'react-router-dom';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import MaterialTable from 'material-table';


import { gql, useQuery } from "@apollo/client";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const GET_USERS = gql`
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
const GET_PRODUCTS = gql`
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

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_USERS);
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCTS);
  const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
  } = useQuery(ALL_ORDERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const usersData = data?.getUsers?.map((item) => [
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

  
  if (productLoading) return "Loading...";
  if (productError) return `Error! ${error.message}`;

  const productsData = productData?.getProducts?.map((item) => [
    item.id,
    item.name,
    item.description,
    item.price,
  ]);

  if (orderLoading) return "Loading...";
  if (orderError) return `Error! ${error.message}`;

  const ordersData = orderData?.allOrders?.map((item) => [
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
    <GridContainer>
            {localStorage.getItem('token') == "" && <Redirect to="/" />}

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Kullanıcılar</h4>
            <p className={classes.cardCategoryWhite}>
              Sistemde kayıtlı kullanıcı bilgileri
            </p>
          </CardHeader>
          <CardBody>
            <Table
            
              tableHeaderColor="primary"
              tableHead={[
                "Id",
                "Adı",
                "Soyadı",
                "Kullanıcı Adı",
                "Email",
                "Yaşı",
                "Şehir",
                "Ülke",
                "Adresi",
              ]}
              tableData={
                usersData
                
              }
            />

           
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ürünler</h4>
            <p className={classes.cardCategoryWhite}>
              Sistemde kayıtlı ürün bilgileri
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Id",
                "Ürün Adı",
                "Açıklama",
                "Fiyat",
              ]}
              tableData={
                productsData
                
              }
            />

           
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Siparişler</h4>
            <p className={classes.cardCategoryWhite}>
              Sistemde kayıtlı Sipariş bilgileri
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Id",
                "Sipariş Durumu",
                "Sipariş Tarihi",
                "Alıcı Id",
                "Alıcı Adı",
                "Alıcı Soyadı",
                "Alıcı Adresi",
                "Ürün Id",
                "Ürün Adı",
                "Ürün Fiyatı",
              ]}
              tableData={
                ordersData
                
              }
            />

           
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
