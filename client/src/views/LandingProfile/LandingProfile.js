import React, { useState, useEffect } from "react";
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
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import avatar from "assets/img/faces/marc.jpg";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { gql, useQuery } from "@apollo/client";
import Table from "components/Table/Table.js";
import { Link, Redirect } from "react-router-dom";

const MY_PROFİLE = gql`
  query getUserPublicProfile($id: ID!) {
    getUserPublicProfile(id: $id) {
      id
      firstName
      lastName
      username
      email
      adress
      age
      city
      country
      order {
        id
        order_status
        order_started_date
        product {
          id
          name
          description
          price
        }
      }
    }
  }
`;
/*
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
`;*/
const dashboardRoutes = [];

/*const styles = {
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
};*/

const useStyles = makeStyles(styles);

export default function LandingProfile(props) {
  const { ...rest } = props;
  const myId = localStorage.getItem("id");

  const classes = useStyles();

  /*const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
  } = useQuery(ALL_ORDERS);*/
  const {
    loading: profileLoading,
    error: profileError,
    data: profileData,
  } = useQuery(MY_PROFİLE, {
    variables: { id: myId },
  });
  /*if (orderLoading) return "Loading...";
  if (orderError) return `Error! ${error.message}`;*/
  if (profileLoading) return "Loading...";

  const ordersData = profileData?.getUserPublicProfile?.order?.map((item) => [
    item.id,
    item.order_status,
    new Date(item.order_started_date *1).toLocaleString(),
    item.product.name,
    item.product.price,
  ]);

  //console.log(profileData.getUserPublicProfile);



  //if (profileError) return `Error! ${error.message}`;

  /*const myProfileData = profileData?.getUserPublicProfile?.map((item) => [
    item.id,
    item.firstName,
   
  ]);*/

  return (
    <div className={classes.profileBg}>
      {localStorage.getItem("token") == "" && <Redirect to="/" />}

      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Getir"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <div className={classes.profile}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card className={classes.profileMain}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Company (disabled)"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card profile className={classes.profileMain}>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}></h6>
                <h4 className={classes.cardTitle}>
                  {profileData?.getUserPublicProfile?.firstName +
                    " " +
                    profileData?.getUserPublicProfile?.lastName}
                </h4>
                <p className={classes.description}>
                  {"Email:" + " " + profileData?.getUserPublicProfile?.email}
                </p>
                <p className={classes.description}>
                  {"Yaş:" + " " + profileData?.getUserPublicProfile?.age}
                </p>
                <p className={classes.description}>
                  {"Adres:" +
                    " " +
                    profileData?.getUserPublicProfile?.adress +
                    " " +
                    profileData?.getUserPublicProfile?.city +
                    "/" +
                    profileData?.getUserPublicProfile?.country}
                </p>
                <Button href="/admin" color="primary" round>
                  Panele git
                </Button>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Siparişlerin</h4>
                <p className={classes.cardCategoryWhite}>
                  Sistemde kayıtlı Sipariş bilgilerin
                </p>
              </CardHeader>
              <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={[
                      "Id",
                      "Sipariş Durumu",
                      "Sipariş Tarihi",
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
    </div>
  );
}
