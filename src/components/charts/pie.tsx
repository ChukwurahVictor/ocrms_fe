import { ChartPropType } from "@/types/chart";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = ["#59D3E9", "#001866", "#E20000", "#FFBF00"];


const CustomPieChart = ({ w, h, title, data }: ChartPropType) => {
    const renderLegend = () => {
        return (
            <Flex gap={2} flexDir="column">
                {data?.map((entry, index) => (
                    <Flex key={`item-${index}`} gap={2} alignItems="center">
                        <Flex
                            h="20px"
                            w="20px"
                            bg={COLORS[index % COLORS.length]}
                            // mr={1}
                        />{' '}
                        <Flex gap={1} alignItems="center" textColor="black">
                            <span>{entry?.name}</span>
                            <span>{entry?.count}</span>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        );
    };

    return (
        <Box p={4} bg="#F4F4F4" w={w || 500} h={h || 350} pos="relative">
            {title && (
                <Text mb={2}>
                    {title}
                </Text>
            )}
            <PieChart width={285} height={300}>
                <Pie
                    data={data}
                    cx={120}
                    cy={140}
                    innerRadius={85}
                    outerRadius={110}
                    dataKey="count"
                >
                    {data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="middle" content={renderLegend} height={100}
                    wrapperStyle={{
                        left: "90%",
                    }} />
            </PieChart>
        </Box>
    );
}

export default CustomPieChart;