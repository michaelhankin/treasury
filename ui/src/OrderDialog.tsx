import {Button, Dialog, DialogTitle, DialogContent, Select, MenuItem, TextField, InputAdornment, DialogActions, FormControl, InputLabel} from "@mui/material"
import { useState } from "react";
import { Order } from "./App";

interface OrderDialogProps {
    disabled: boolean;
    addOrder: (order: Order) => void;
    terms: string[];
}

function OrderDialog({disabled, addOrder, terms}: OrderDialogProps) {
    const [open, setOpen] = useState(false)
    const [amountError, setAmountError] = useState<string | null>(null);
    const handleClose = () => {
        setOpen(false)
        setAmountError(null)
    }
    return (
        <>
            <Button variant="contained" disabled={disabled} sx={{height: "40px"}} onClick={() => {
                setOpen(true)
            }}>New Order</Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const term = formJson.term;
                    let amount = formJson.amount;
                    const amountRegex = /^\d+$/
                    if (!amountRegex.test(amount)) {
                        setAmountError("Please enter a whole dollar amount, minimum $1.")
                        return;
                    }
                    amount = Number(amount)
                    if (amount === 0) {
                        setAmountError("Please enter a whole dollar amount, minimum $1.")
                        return;
                    }
                    const createdAt = new Date()
                    addOrder({ term, amount, createdAt })
                    handleClose();
                },
            }} fullWidth maxWidth="xs">
                <DialogTitle>New Order</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControl fullWidth margin="dense" required>
                        <InputLabel id="term-label">Term</InputLabel>
                        <Select name="term" label="Term" labelId="term-label">
                            {terms.map((t, i) => (
                                <MenuItem value={t} key={i}>{t}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField required name="amount" label="Amount" slotProps={{input: {startAdornment: <InputAdornment position="start">$</InputAdornment>}}} fullWidth margin="dense" error={amountError !== null} helperText={amountError} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderDialog