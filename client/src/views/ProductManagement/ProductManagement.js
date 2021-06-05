import React,{useState,useEffect} from "react";
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
import { Field, Form, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';

import avatar from "assets/img/faces/default.jpg";
import { gql, useQuery , useMutation} from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: String!
    
  ) {
    createProduct(
    name: $name
    description: $description
    price: $price
    ){
      id
      name
      description
      price
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
  },
  name: {
    marginTop: '5px',
    marginBottom: '25px',
    width: '99%',
    //padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    fontSize: "14px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    height: '35px',
  },
  name2:{
    height: '150px'
  }
};

const useStyles = makeStyles(styles);

export default function productManagement() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

 const initialValues = {
    name: '',
    description: '',
    //image: '',
    price: '',
    
  };

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

  const submitFunction = async (values,{ setSubmitting }) => {
    const { error, data } =await createProduct({
      variables: {
        name: values.name || '',
        description: values.description || '',
        //image: values.image || '',
        price: values.price || '',
       
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

  return (
    <div>
            {localStorage.getItem('token') == "" && <Redirect to="/" />}

      <GridContainer>
       <Formik  initialValues={initialValues}   onSubmit={submitFunction}>
         {(formik) => (
        <Form style={{width: '100%'}}>
        <GridItem xs={12} sm={12} md={12}>
        
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Ürün Oluştur</h4>
              <p className={classes.cardCategoryWhite}>Formu doldurarak sisteme ürün kaydı oluşturun.</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <InputLabel
                  
                >
                  {'Ürün Adı'}
                </InputLabel>
                  <Field 
                    className={classes.name}
                    name="name"
                    labelText="Ürün Adı"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                   
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={6}>
                <InputLabel
                  
                  >
                    {'Ürün Fiyatı'}
                  </InputLabel>
                  <Field
                    className={classes.name}
                    name="price"
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
                <InputLabel
                  
                  >
                    {'Ürün Açıklaması'}
                  </InputLabel>
                  <Field
                    className={classes.name+ " " + classes.name2}
                    name="description"
                    labelText="Ürün Açıklaması"
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    
                  />
                </GridItem>
              </GridContainer>

              
            </CardBody>
            <CardFooter>
              <Button color="primary"  type="submit" disabled={formik.isSubmitting}>Ekle</Button>
            </CardFooter>
          </Card>
        </GridItem>
       </Form>
         )}
        </Formik>

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
