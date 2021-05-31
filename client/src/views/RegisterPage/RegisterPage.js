import React, { useState } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from "@material-ui/core/TextField";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import { gql, useMutation } from "@apollo/client";

const REGİSTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $age: String!
    $city: String!
    $country: String!
    $adress: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      age: $age
      city: $city
      country: $country
      adress: $adress
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      firstName
      lastName
      age
      city
      country
      adress
      username
      email
    }
  }
`;

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [variables, setVariables] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    country: "",
    adress: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGİSTER_USER, {
    update: (_, __) => 
      props.history.push('/login')
    ,
    // onError: (err) => 
    //   setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerUser({ variables });
  };

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(null);
  const style = {
    width: '100%',
    margin: 'auto',
    marginBottom: '30px'
  };
  const { ...rest } = props;
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={submitRegisterForm}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4 className={classes.h4}>Register</h4>
                  </CardHeader>
                  <Link to={{ pathname: "/login-page" }}>
                    <p className={classes.divider}>Or Login</p>
                  </Link>
                  <CardBody>
                    <div className={errors.firstName && "text-danger"}>
                      {errors.firstName ?? "firstName"}
                    </div>
                    <TextField
                      value={variables.firstName}
                      className={errors.firstName && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          firstName: e.target.value,
                        })
                      }style={style}
                      labelText="Firstname..."
                      id="firstName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={errors.lastName && "text-danger"}>
                      {errors.firstName ?? "Lastname"}
                    </div>
                    <TextField
                      value={variables.lastName}
                      className={errors.lastName && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          lastName: e.target.value,
                        })
                      }style={style}
                      labelText="Lastname..."
                      id="lastName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={errors.age && "text-danger"}>
                      {errors.age ?? "Age"}
                    </div>
                    <TextField
                      value={variables.age}
                      className={errors.age && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          age: e.target.value,
                        })
                      }style={style}
                      labelText="Age..."
                      id="age"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/*<div className={errors.confirmPassword && "text-danger"}>
                      Gender
                    </div>*/}
                    {/* <Radio
                      checked={selectedValue === "a"}
                      onChange={() => setSelectedValue("a")}
                      value="a"
                      name="radio button demo"
                      aria-label="A"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />{" "}
                    Male
                    <br></br>
                    <Radio
                      checked={selectedValue === "b"}
                      onChange={() => setSelectedValue("b")}
                      value="a"
                      name="radio button demo"
                      aria-label="B"
                      icon={
                        <FiberManualRecord className={classes.radioUnchecked} />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />{" "}
                    Female */}
                    <div className={errors.city && "text-danger"}>
                      {errors.city ?? "City"}
                    </div>
                    <TextField
                      value={variables.city}
                      className={errors.city && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          city: e.target.value,
                        })
                      }style={style}
                      labelText="City..."
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={errors.country && "text-danger"}>
                      {errors.country ?? "Country"}
                    </div>
                    <TextField
                      value={variables.country}
                      className={errors.country && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          country: e.target.value,
                        })
                      }style={style}
                      labelText="Country..."
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={errors.adress && "text-danger"}>
                      {errors.adress ?? "Adress"}
                    </div>
                    <TextField
                      value={variables.adress}
                      className={errors.adress && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          adress: e.target.value,
                        })
                      }style={style}
                      labelText="Adress..."
                      id="adress"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={errors.username && "text-danger"}>
                      {errors.username ?? "Username"}
                    </div>
                    <TextField
                      value={variables.username}
                      className={errors.username && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          username: e.target.value,
                        })
                      }style={style}
                      labelText="Username..."
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                   <div className={errors.email && "text-danger"}>
                      {errors.email ?? "Email"}
                    </div>
                    <TextField
                      value={variables.email}
                      className={errors.email && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          email: e.target.value,
                        })
                      }style={style}
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className={errors.password && "text-danger"}>
                      {errors.password ?? "Password"}
                    </div>
                    <TextField
                      value={variables.password}
                      className={errors.password && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          password: e.target.value,
                        })
                      }style={style}
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <div className={errors.confirmPassword && "text-danger"}>
                      {errors.confirmPassword ?? "Confirm Password"}
                    </div>
                    <TextField
                      value={variables.confirmPassword}
                      className={errors.confirmPassword && "is-invalid"}
                      onChange={(e) =>
                        setVariables({
                          ...variables,
                          confirmPassword: e.target.value,
                        })
                      }style={style}
                      labelText="Confirm Password"
                      id="confirmPassword"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" type="submit" disabled={loading} size="lg">
                    {loading ? "loading.." : "Register"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
