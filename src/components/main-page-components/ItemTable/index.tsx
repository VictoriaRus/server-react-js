import React from "react";
import Form from "react-bootstrap/Form";
import { IUser } from "../../../type/type";

interface ItemProps {
    key: number;
    user: IUser;
    checked: boolean;
    check: any;
}

const ItemTable = ({ user, check, checked }: ItemProps) => {
    return (
        <tr>
            <td>{ user.id }</td>
            <td>{ user.name }</td>
            <td>{ user.email }</td>
            <td>{ user.dateRegistration }</td>
            <td>{ user.lastLoginDate }</td>
            <td>{ user.status }</td>
            <td>
                <Form.Check type="checkbox" readOnly label="Check me"
                            checked={ checked } onClick={ () => check(user.id) } />
            </td>
        </tr>
    );
};

export default React.memo(ItemTable);