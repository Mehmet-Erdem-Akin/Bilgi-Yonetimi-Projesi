import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { Field, Form, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/default.jpg";
import { gql, useQuery, useMutation} from "@apollo/client";

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
const CREATE_ORDER = gql`
  mutation createOrder(
    $userId: Int!
    $productId: Int!
    $order_status: String!
    $order_started_date: String!
  ) {
    createOrder(
      userId: $userId
      productId: $productId
      order_status: $order_status
      order_started_date: $order_started_date
    ){
      order_status
      order_started_date
      user{
        id 
        firstName
        lastName
        adress
      }
      product{
        name
        description
        price
      }
    }
  }
`;


const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [adet, adediAta] = useState();

  
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );


 const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCTS);

  
  if (productLoading) return "Loading...";
  if (productError) return `Error! ${error.message}`;

  const initialValues = {
    order_status: 'sipariş alındı',
    order_started_date: '',
    //image: '',
    userId: '',
    productId: '',
    
  };
  const [createOrder] = useMutation(CREATE_ORDER,{
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  var userId = localStorage.getItem('id');

  const submitFunction = async (values,{ setSubmitting }) => {
    const { error, data } = await createOrder({
      variables: {
        order_status: 'sipariş alındı' || '',
        order_started_date: new Date() || '',
        //image: values.image || '',
        userId: parseInt(userId) || '',
        productId: parseInt(adet) || '',
      },
    });      

    if (error) {
      console.log(error);
      alert('Lütfen tekrar deneyin!');
    } else {
      setOpen(false);
    }
    setSubmitting(false);
  };
  
  //console.log(document.getElementById().innerHTML)
  /*async function handleOrder() {
    const { error, datas } = await createOrder();
    if (datas.createOrder) {
      setSuccessAlert(true);
    } else {
      setErrorAlert(true);
    }
  }*/

  /*const productsData = productData?.getProducts?.map((item) => [
    item.id,
    item.name,
    item.description,
    item.price,
  ]);*/


  return (
    <div className={classes.section}>
      
      <h2 className={classes.title}>Ürünlerimiz</h2>
      <div>
      <Formik  initialValues={initialValues}   onSubmit={submitFunction}>
         {(formik) => (
           <Form>
        <GridContainer>
        {productData?.getProducts?.map((item,index) =>(
          <GridItem xs={12} sm={12} md={4} key={index}>
            <Card className={classes.card} plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  style={{ marginLeft: "90px", border: "8px solid white" }}
                  src={team1}
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <span className={classes.description} id={item.id} name='itemId'>{item.id}</span>

              <h4 style={{textTransform: 'uppercase'}} className={classes.cardTitle}>
                {item.name}
                <br />
                <small className={classes.smallTitle}>{item.price} {" tl"}</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  {item.description}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              <Button
                  style={{ width: "60px",height: '30px', borderRadius: "7px", fontSize: '12px' }}
                  justIcon
                  color="primary"
                  className={classes.margin5}
                  id={item.id}
                  //disabled={createLoading}
                  //onClick={submitFunction}
                  type="submit" disabled={formik.isSubmitting}
                  name="btn"
                  onClick={() => adediAta(item.id)}
                >
                  Getir
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
         
        )
          
        )}
          
        </GridContainer>
        </Form>
        )}
        
        </Formik>
      </div>
    </div>
  );
}
