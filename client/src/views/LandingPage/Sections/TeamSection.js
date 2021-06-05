import React from "react";
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

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/default.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";
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


const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
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
                >
                  Getir
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
         
        )
          
        )}
          
        </GridContainer>
      </div>
    </div>
  );
}
