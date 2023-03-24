import React, { useEffect, useState } from "react";
import Title from "../../components/common-components/Title";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Toolbar from "../../components/main-page-components/Toolbar";
import TableUsers from "../../components/main-page-components/TableUsers";
import { IData, IUser } from "../../type/type";
import { useNavigate } from "react-router";
import { URL } from "../../sevices/url";

const MainPage = () => {
    const [users, setUsers] = useState([] as IUser[]);
    const [authUser, setAuthUser] = useState({} as IUser);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/login`);
    }

    useEffect(() => {
        fetch(`${ URL }/main`,{
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": "https://server-node-js-production.up.railway.app",}
        })
            .then(response => response.json())
            .then(json => setUsers(json));

        setAuthUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }, []);

    const check = (value: number) => {
        setUsers(prevState =>
            prevState.map(item =>
                item.id === value
                    ? {...item, isCheck: !item.isCheck}
                    : item
            )
        )
    }

    const checkStatusUser = (users: IUser[], user: IUser) => {
        users.map(item => {
            if (user.id === item.id && (item.status === "deleted" || item.status === "blocked")) {
                localStorage.removeItem("user");
                redirect();
            }
        })
    }

    const send = (data: IData[]) => {
        try {
            setIsLoading(true);
            fetch(`${ URL }/main`, {
                method: "PUT",
                body: JSON.stringify(data),
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
                .then((users) => {
                    setUsers(users);
                    checkStatusUser(users, authUser);
                })
        } catch (e: any) {
            setErrorMessage(e.message as string);
        } finally {
            setIsLoading(false);
        }
    }

    const onBlock = () => {
        const usersIsChecked = users.filter(user => user.isCheck);
        const data = usersIsChecked.reduce((acc: { id: number, isBlock: boolean }[], item: IUser) => {
            const el = { id: item.id, isBlock: true };
            acc.push(el);
            return acc;
        }, []);
        send(data);
    }

    const onUnblock = () => {
        const usersIsChecked = users.filter(user => user.isCheck);
        const data = usersIsChecked.reduce((acc: { id: number, isBlock: boolean }[], item: IUser) => {
            const el = { id: item.id, isBlock: false };
            acc.push(el);
            return acc;
        }, []);
        send(data);
    }

    const onDelete = () => {
        const usersIsChecked = users.filter(user => user.isCheck);
        const data = usersIsChecked.reduce((acc: { id: number, isDelete: boolean }[], item: IUser) => {
            const el = { id: item.id, isDelete: true };
            acc.push(el);
            return acc;
        }, []);
        send(data);
    }
console.log({users});
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <Title text="Users"/>
                    <Toolbar block={ onBlock } unblock={ onUnblock } del={ onDelete }/>
                    { errorMessage && <Alert variant="danger">{ errorMessage }</Alert> }
                    { !isLoading ?
                        (<TableUsers users={ users } check={ check } />) : <div>Loading...</div> }
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;