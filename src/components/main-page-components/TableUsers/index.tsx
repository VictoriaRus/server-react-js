import React from "react";
import Table from "react-bootstrap/Table";
import { IUser } from "../../../type/type";
import ItemTable from "../ItemTable";

interface ITableProps {
    users: IUser[];
    check: any;
}

const TableUsers = ({ users, check }: ITableProps) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date of registration</th>
                <th>Last login date</th>
                <th>Status</th>
                <th>Check</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(user => <ItemTable key={ user.id } checked={ user.isCheck } user={ user } check={ check }/>)
            }
            </tbody>
        </Table>
    );
};

export default TableUsers;