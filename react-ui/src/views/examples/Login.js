/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import AuthApi from "../../api/auth";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../auth-context/auth.context";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const mainRef = useRef(0)

  const { user, setUser } = useAuth();
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const setProfile = (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.Login(formData).then((response) => {
      if(response.data.success) {
        return setProfile(response);
      }
      return setError(response.data.msg)
    }).catch((error) => {
      if (error.response) {
        return setError(error.response.data.msg);
      }
      return setError("There has been an error.");
    })
  }

  useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainRef.current.scrollTop = 0;
  }, [])

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-1">
                      Sign IN
                    </div>
                  </CardHeader>
                  {user && user.token ? (
                    <div className="text-center my-5">
                      <p><b>You are already logged in</b></p>
                    </div>
                  ) : (
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>
                          Add Your Credentials
                        </small>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              placeholder="Email" 
                              name="email" 
                              onChange={handleChange} 
                              type="email" 
                              value={formData?.email}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              name="password" 
                              value={formData?.password}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-danger text-center mt-3 mb-1">
                          <small>{ error }</small>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                      <Row className="mt-3">
                        <Col xs="6">
                          <a
                            className="text-dark"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <small>Forgot password?</small>
                          </a>
                        </Col>
                        <Col className="text-right" xs="6">
                          <Link
                            className="text-dark"
                            to="/register-page"
                          >
                            <small>Create new account</small>
                          </Link>
                        </Col>
                      </Row>
                    </CardBody>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Login;
