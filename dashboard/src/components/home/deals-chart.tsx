import { DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "@/;graphql/queries";
import React from "react";
import { mapDealsData } from "@/;utilities/helpers";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/;graphql/types";

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: "dealStages", 
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["WON", "LOST"],
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });

  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data || []); // Ensure data is defined before mapping
  }, [data?.data]);

  const config: AreaConfig = {
    data: dealData || [],
    xField: "timeText",
    yField: "value",
    stack: false,
    seriesField: "state",
    shapeField: "state",
    colorField: "state",
  };

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: {
          padding: "8px 16px",
        },
        body: {
          padding: "24px 24px 0 24px",
        },
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DollarOutlined />
          <Text
            size="sm"
            style={{
              marginLeft: "0.7rem",
            }}
          >
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
