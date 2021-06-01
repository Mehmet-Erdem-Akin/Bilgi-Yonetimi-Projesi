import React,{ useState, useEffect } from "react";
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

//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import avatar from "assets/img/faces/marc.jpg";
import { gql, useQuery } from "@apollo/client";



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
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  
};
const useStyles = makeStyles(styles);

export default function orderManagement() {
  const classes = useStyles();

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
  } = useQuery(ALL_ORDERS);

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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Sipariş Durumu Güncelle
              </h4>
              <p className={classes.cardCategoryWhite}>
                Formu doldurarak sipariş durumunu güncelleyebilirsiniz.
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Sipariş Id"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    style={{ width: "100%",marginTop: "16px",margin: "27px 0 0 0" }}
                    className={classes.formControl}
                  >
                    <InputLabel id="order_status">Sipariş Durumu</InputLabel>
                    <Select
                      labelId="order_status"
                      id="order_status-select"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value={"Hazırlanıyor"}>Hazırlanıyor</MenuItem>
                      <MenuItem value={"Kargoya Verildi"}>Kargoya Verildi</MenuItem>
                      <MenuItem value={"30"}>Teslim Edildi</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Güncelle</Button>
            </CardFooter>
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
    </div>
  );
}
