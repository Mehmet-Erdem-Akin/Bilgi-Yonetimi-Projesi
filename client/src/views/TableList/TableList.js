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

import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
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

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const usersData = data?.getUsers?.map((item) => [
    item.username,
    item.firstName,
    item.lastName,
    item.email,
    item.age,
    item.city,
    item.country,
    item.adress,
  ]);

  
  if (productLoading) return "Loading...";
  if (productError) return `Error! ${error.message}`;

  const productsData = productData?.getProducts?.map((item) => [
    item.name,
    item.description,
    item.price,
  ]);

  return (
    <GridContainer>
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
                "First Name",
                "Last Name",
                "Username",
                "Email",
                "Age",
                "City",
                "Country",
                "Address",
              ]}
              tableData={
                usersData
                /*
                [item.username, item.lastName, item.username, item.email],
                [item.username, item.lastName, item.username, item.email],
                [item.username, item.lastName, item.username, item.email],*/
              }
            />

            {/*data?.getUsers.map((item, index) => (
            <Table 
              tableHeaderColor="primary"
              tableHead={["Name", "Country", "City", "Salary"]}
              tableData={[
                [item.email, item.email, item.email, item.email],
                
              ]}
            />))*/}
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
                "Name",
                "Description",
                "Price",
              ]}
              tableData={
                productsData
                /*
                [item.username, item.lastName, item.username, item.email],
                [item.username, item.lastName, item.username, item.email],
                [item.username, item.lastName, item.username, item.email],*/
              }
            />

            {/*data?.getUsers.map((item, index) => (
            <Table 
              tableHeaderColor="primary"
              tableHead={["Name", "Country", "City", "Salary"]}
              tableData={[
                [item.email, item.email, item.email, item.email],
                
              ]}
            />))*/}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park",
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten",
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
