import { useState, useEffect } from "react"
import {getYields} from "./api"
import {Container, Typography, Box, Stack} from "@mui/material"
import Curve, {Treasury} from "./Curve"
import OrderDialog from "./OrderDialog"
import OrderTable from "./OrderTable"

export interface Order {
  term: string;
  amount: number;
  createdAt: Date;
}

function App() {
  const [treasuries, setTreasuries] = useState<Treasury[] | null>(null)
  const [terms, setTerms] = useState<string[] | null>(null)
  const [yieldsDate, setYieldsDate] = useState<Date | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = (order: Order) => {
    setOrders([
      order,
      ...orders
    ])
  }

  useEffect(() => {
    const fetchYields = async () => {
      const yieldsData = await getYields()
      setTerms(yieldsData.Terms)
      setYieldsDate(new Date(yieldsData.Date))
      const treasuriesData = yieldsData.Terms.map((t, i) => ({
        term: t,
        yield: yieldsData.Yields[i]
      })) as Treasury[]
      setTreasuries(treasuriesData)
    }
    fetchYields()
  }, [])

  return (
    <Container maxWidth="md">
      <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Treasury App
        </Typography>
        <OrderDialog disabled={terms === null} terms={terms === null ? [] : terms} addOrder={addOrder} />
      </Stack>
      <Box>
        {treasuries === null || yieldsDate === null ?
          <Typography variant="body1">Loading treasuries...</Typography> :
          <Stack>
            <Typography variant="h4" component="h2" gutterBottom>
              Treasury yields for {yieldsDate.toDateString()}
            </Typography>
            <Curve treasuries={treasuries} />
          </Stack>
        }
        <Stack>
          <Typography variant="h4" component="h2" gutterBottom>
            My orders
          </Typography>
          {orders.length === 0 ?
            <Typography variant="body1">No orders placed yet.</Typography> :
            <OrderTable orders={orders} />
          }
        </Stack>
      </Box> 
    </Container>
  )
}

export default App
