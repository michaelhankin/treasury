import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export interface Treasury {
    term: string;
    yield: number;
}

interface CurveProps {
    treasuries: Treasury[];
}

function Curve({ treasuries }: CurveProps) {
    return (
        <LineChart width={800} height={400} data={treasuries}>
            <Line type="monotone" dataKey="yield" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="term" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}

export default Curve