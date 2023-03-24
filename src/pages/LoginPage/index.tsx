import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Title from "../../components/common-components/Title";
import { Link, Navigate } from "react-router-dom";

const initialLoginForm = { email: "", password: "" };

const Login = () => {
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [isLogin, setIsLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (isLogin) {
        return <Navigate replace to="/main"/>
    }

    const onLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onLoginFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await fetch(`${ URL }/login`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "https://server-node-js-production.up.railway.app",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(error => {
                            throw error
                        });
                    }
                })
                .then(user => localStorage.setItem("user", JSON.stringify(user)));

            setIsLogin(true);
            setLoginForm(initialLoginForm);
        } catch (e: any) {
            setErrorMessage(e.message as string);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container className="d-flex vh-100 align-items-center">
            <Row className="flex-grow-1 justify-content-center">
                <Col md={ 8 } lg={ 6 }>
                    <Title text="Login"/>
                    { errorMessage && <Alert variant="danger">{ errorMessage }</Alert> }
                    { !isLoading ?
                        (<Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={ loginForm.email }
                                              onChange={ onLoginFormChange } name="email"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={ loginForm.password }
                                              onChange={ onLoginFormChange } name="password"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={ onLoginFormSubmit }>
                                Submit
                            </Button>
                        </Form>) : <div>Loading...</div> }
                    <div className="link-wrap">
                        <Link to={ "/registration" }>Go to registration page</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;