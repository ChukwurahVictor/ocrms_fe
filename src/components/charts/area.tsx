import { ChartPropType } from "@/types/chart";
import { Box, Text } from "@chakra-ui/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomAreaChart = ({ w, h, title, data }: ChartPropType) => {
    return (
        <Box p={4} bg="#F4F4F4" w={w || 940} h={h || 350}>
            {title && (
                <Text mb={2}>
                    {title}
                </Text>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={350}
                    data={data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 10,
                    }}
                >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 0 }} 
                    style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "18px",
                        textAlign: "center",
                        color: "#000000CC",
                    }} />
                    <YAxis type="category" axisLine={false} tickLine={false} padding={{ top: 20, bottom: 20 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#0F62FE" strokeWidth={3} fill="#0F62FE33"  />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default CustomAreaChart;
