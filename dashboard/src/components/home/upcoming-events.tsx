import { Badge, Card, List } from "antd";
import { Text } from "../text";
import { CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/;utilities/helpers";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/;graphql/queries";
import dayjs from "dayjs";

const UpcomingEvents = () => {
  const [isLoading] = useState(false);

  const { data, isLoading: eventsLoading } = useList({
    resource: "events",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],

    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: {
          padding: "8px 16px",
        },
        body: {
          padding: "0 1rem",
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
          <CalendarOutlined />
          <Text
            size="sm"
            style={{
              marginLeft: "0.7rem",
            }}
          >
            Upcoming Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        ></List>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            const renderDate = getDate(item.startDate, item.endDate);

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
      {!isLoading && data?.data.length === 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220%",
          }}
        ></span>
      )}
    </Card>
  );
};

export default UpcomingEvents;
