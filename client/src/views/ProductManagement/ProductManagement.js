import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import { Link, Redirect } from 'react-router-dom';

import avatar from "assets/img/faces/marc.jpg";
import { gql, useQuery } from "@apollo/client";

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
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function productManagement() {
  const classes = useStyles();

  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCTS);

  
  if (productLoading) return "Loading...";
  if (productError) return `Error! ${error.message}`;

  const productsData = productData?.getProducts?.map((item) => [
    item.id,
    item.name,
    item.description,
    item.price,
  ]);

  return (
    <div>
            {localStorage.getItem('token') == "" && <Redirect to="/" />}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Ürün Oluştur</h4>
              <p className={classes.cardCategoryWhite}>Formu doldurarak sisteme ürün kaydı oluşturun.</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Ürün Adı"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                   
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Ürün Fiyatı"
                    id="price"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Ürün Açıklaması"
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Ekle</Button>
            </CardFooter>
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
       
      </GridContainer>
    </div>
  );
}
