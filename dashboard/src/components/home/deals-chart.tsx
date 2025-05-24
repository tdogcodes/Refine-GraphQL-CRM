import { CalendarOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import { Text } from '../text'
import { useState } from 'react'

const DealsChart = () => {

  const [isLoading, setIsLoading] = useState(false)
  
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
        <div style={{ 
          display: "flex",
          alignItems: "center",
          gap: "8px" }}>
            <CalendarOutlined/>
            <Text 
             size="sm"
             style={{
              marginLeft: "0.7rem",
             }}>
              Deals Chart
             </Text>
        </div>
      }
    >
      {isLoading ? 
        (<List>

        </List>
        ) : (
        <List>

        </List>)
      }
    </Card>
  )
}

export default DealsChart