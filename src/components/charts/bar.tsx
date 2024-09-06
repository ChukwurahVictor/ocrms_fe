import { ChartPropType } from "@/types/chart";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";

const CustomBarChart = ({ w, h, title, data }: ChartPropType) => {
  const maxValue = Math.max(...data?.map(item => item?.count));

  const CustomizedLabel = (props: any) => {
    const { x, y, width, height, value, name } = props;
    const isMax = value === maxValue;
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill={isMax ? "#FFFFFF" : "#000000CC"}
        textAnchor="middle"
        transform={`rotate(270, ${x + width / 2}, ${y + height / 2})`}
        fontSize="14"
      >
        {name}
      </text>
    );
  };

  const CustomizedBar = (props: any) => {
    const { fill, x, y, width, height, value } = props;
    const isMax = value === maxValue;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isMax ? "#0F62FE" : fill}
      />
    );
  };

  return (
    <Box p={4} bg="#F4F4F4" w={w || 300} h={h || 350}>
      {title && <Text mb={2}>{title}</Text>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={150}
          height={40}
          data={data}
          barSize={40}
          margin={{ top: 10, bottom: 30 }}
        >
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#D9D9D9"
            shape={<CustomizedBar />}
            label={<CustomizedLabel />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
