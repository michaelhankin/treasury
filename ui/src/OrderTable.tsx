import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import { Order } from "./App"

interface OrderTableProps {
    orders: Order[]
}

function OrderTable({orders}: OrderTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>Term</TableCell>
                        <TableCell>Amount ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((o) => (
                        <TableRow key={o.createdAt.toISOString()}>
                            <TableCell>
                                {o.createdAt.toISOString()} 
                            </TableCell>
                            <TableCell>
                                {o.term} 
                            </TableCell>
                            <TableCell>
                                {o.amount} 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderTable