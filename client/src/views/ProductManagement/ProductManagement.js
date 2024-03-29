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
import Table from "components/Table/Table.js";
import { Link, Redirect } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import AddAlert from "@material-ui/icons/AddAlert";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//core components
import Snackbar from "components/Snackbar/Snackbar.js";
import avatar from "assets/img/faces/default.jpg";
import { gql, useQuery, useMutation } from "@apollo/client";

import { jsPDF } from "jspdf";
//import 'jspdf-autotable';
import autoTable from "jspdf-autotable";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: String!
    $image: String!
  ) {
    createProduct(name: $name, description: $description, price: $price, image: $image) {
      id
      name
      description
      price
      image
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
  name: {
    marginTop: "5px",
    marginBottom: "25px",
    width: "99%",
    //padding: '10px',
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "14px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    height: "35px",
  },
  name2: {
    height: "150px",
  },
};

const useStyles = makeStyles(styles);

export default function productManagement() {
  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);
  const [adet, adediAta] = useState();
  const [open, setOpen] = React.useState(false);
  /*const [pictures, setPictures] = useState([]);*/
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const initialValues = {
    name: "",
    description: "",
    image: "",
    price: "",
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

  const submitFunction = async (values, { setSubmitting }) => {
    const { error, data } = await createProduct({
      variables: {
        name: values.name || "",
        description: values.description || "",
        image: age || '',
        price: values.price || "",
      },
    });

    if (error) {
      console.log(error);
      alert("Lütfen tekrar deneyin!");
    }
    setSubmitting(false);
  };
  const showNotification = () => {
    setOpen(true);
    setTimeout(function () {
      setOpen(false);
    }, 6000);
  };

  const pdf = () => {
    var doc = new jsPDF("l", "mm", [500, 310]);
    /*doc.autoTable({ html: '#orderTable' })
    doc.save('table.pdf')*/
    /*var elem = document.getElementById("orderTable");
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.save("table.pdf");*/
    //doc.autoTable( { html: '#orderTable' })
    doc.autoTable({
      head: [["Id", "Ürün Adı", "Açıklama", "Fiyat"]],
      body: productsData,
    });
    doc.setFont("times");

    doc.save("table.pdf");

    /*
    const doc = new jsPDF();
    //const { jsPDF } = require("jspdf");
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");*/
  };

  const names = [
    {
      name: 'elma', link: 'http://www.entazem.com/Uploads/UrunResimleri/buyuk/elma-kirmizi-yaz-f85f.jpg'
    },
    {
      name: 'muz', link: 'http://www.sebzemeyvedunyasi.com/Uploads/UrunResimleri/buyuk/Muz-Chiquita-46af.png'
    },
    {
      name: 'cilek', link: 'https://img.pixers.pics/pho_wat(s3:700/FO/48/70/06/60/700_FO48700660_0051fb153cf2e07cae5e2ed337670fc6.jpg,700,699,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,481,650,jpg)/duvar-resimleri-cilek.jpg.jpg'
    },
    {
      name: 'armut', link: 'https://www.verita.com.tr/wp-content/uploads/2014/08/armut.jpg'
    },
    {
      name: 'erik', link: 'http://www.greenada.com/Uploads/UrunResimleri/buyuk/greenadacan-erigi-5855.jpg'
    },
    {
      name: 'ananas', link: 'https://st1.myideasoft.com/idea/ek/90/myassets/products/030/adet-ananas-2135193.jpg?revision=1553251744'
    },
    {
      name: 'portakal', link: 'http://www.canfreshfruits.com.tr/wp-content/uploads/2019/02/portakal-300x300.jpg'
    },
    {
      name: 'karpuz', link: 'https://www.risalehaber.com/d/other/karpuz2.jpg'
    },
    {
      name: 'kiraz', link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvsombPxMzw2hYq_hUTuFklouNjvDM4dynqPetHzmFGiXYSbQne7qydBVjRCTWW6NWeAk&usqp=CAU'
    },
    {
      name: 'mango', link: 'https://st.depositphotos.com/1642482/3698/i/950/depositphotos_36983317-stock-photo-mango.jpg'
    },
    {
      name: 'diger', link: 'https://www.aksismarket.com/assets/corals/images/default_product_image.png'
    },
    
  ];

  return (
    <div>
      {localStorage.getItem("token") == "" && <Redirect to="/" />}

      <GridContainer>
        <Formik initialValues={initialValues} onSubmit={submitFunction}>
          {(formik) => (
            <Form style={{ width: "100%" }}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Ürün Oluştur</h4>
                    <p className={classes.cardCategoryWhite}>
                      Formu doldurarak sisteme ürün kaydı oluşturun.
                    </p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <InputLabel>{"Ürün Adı"}</InputLabel>
                        <Field
                          className={classes.name}
                          name="name"
                          labelText="Ürün Adı"
                          id="name"
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <InputLabel>{"Ürün Fiyatı"}</InputLabel>
                        <Field
                          className={classes.name}
                          name="price"
                          labelText="Ürün Fiyatı"
                          id="price"
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <InputLabel>{"Ürün Açıklaması"}</InputLabel>
                        <Field
                          className={classes.name + " " + classes.name2}
                          name="description"
                          labelText="Ürün Açıklaması"
                          id="description"
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                   
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl style={{width: "100%"}} className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">
                            Ürün Görseli
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="image"
                            value={age}
                            onChange={handleChange}
                          >
                            {names.map((item) => (
                             <MenuItem value={item.link}>{item.name}</MenuItem>
                             ))}
                            
                          </Select>
                        </FormControl>
                      </GridItem>
                    </GridContainer> 
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="primary"
                      onClick={() => showNotification()}
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Ekle
                    </Button>
                  </CardFooter>
                </Card>
                <Snackbar
                  place="bc"
                  color="success"
                  icon={AddAlert}
                  message="Ürün Başarıyla Kaydedilmiştir."
                  open={open}
                  closeNotification={() => setOpen(false)}
                  close
                />
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
              <Button onClick={pdf}>Verileri İndir</Button>

              <Table
                tableHeaderColor="primary"
                tableHead={["Id", "Ürün Adı", "Açıklama", "Fiyat"]}
                tableData={productsData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
