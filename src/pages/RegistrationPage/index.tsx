import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Title from "../../components/common-components/Title";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const initialRegistrationForm = { name: "", email: "", password: "", confirmPassword: "" };

const Registration = () => {
    const [registrationForm, setRegistrationForm] = useState(initialRegistrationForm);
    const [isRegistered, setIsRegistered] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onRegistrationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onRegistrationFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await fetch(`${ URL }/registration`, {
                method: "POST",
                body: JSON.stringify({
                    name: registrationForm.name,
                    email: registrationForm.email,
                    password: registrationForm.password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then(error => { throw error });
                    }
                })
                .then(response => setSuccessMessage(response.message));

            setIsRegistered(true);
            setRegistrationForm(initialRegistrationForm);
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
                    <Title text="Registration"/>
                    { errorMessage && <Alert variant="danger">{ errorMessage }</Alert> }
                    { isRegistered && <Alert variant="success">{ successMessage }</Alert> }
                    { !isLoading ?
                        (<Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={ registrationForm.name }
                                              onChange={ onRegistrationFormChange } name="name"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={ registrationForm.email }
                                              onChange={ onRegistrationFormChange }
                                              name="email"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={ registrationForm.password }
                                              onChange={ onRegistrationFormChange } name="password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password"
                                              value={ registrationForm.confirmPassword }
                                              onChange={ onRegistrationFormChange } name="confirmPassword"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={ onRegistrationFormSubmit }>
                                Submit
                            </Button>
                        </Form>) : <div>Loading...</div> }
                    <div className="link-wrap">
                        <Link to={ "/login" }>Go to login page</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Registration;