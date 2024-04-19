'use client';
import { Box, Card, Center, Container, Grid, Group, Paper, RingProgress, Text, Title, rem } from '@mantine/core';
import { IconCheck, IconMessage, IconShirt, IconShoppingCart, IconUser } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import LineChart from '../LineChart';

const data = [
  {
    "country": "AD",
    "hot dog": 17,
    "hot dogColor": "hsl(318, 70%, 50%)",
    "burger": 121,
    "burgerColor": "hsl(113, 70%, 50%)",
    "sandwich": 40,
    "sandwichColor": "hsl(248, 70%, 50%)",
    "kebab": 47,
    "kebabColor": "hsl(211, 70%, 50%)",
    "fries": 22,
    "friesColor": "hsl(198, 70%, 50%)",
    "donut": 30,
    "donutColor": "hsl(248, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 6,
    "hot dogColor": "hsl(331, 70%, 50%)",
    "burger": 53,
    "burgerColor": "hsl(221, 70%, 50%)",
    "sandwich": 56,
    "sandwichColor": "hsl(153, 70%, 50%)",
    "kebab": 166,
    "kebabColor": "hsl(150, 70%, 50%)",
    "fries": 151,
    "friesColor": "hsl(318, 70%, 50%)",
    "donut": 126,
    "donutColor": "hsl(174, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 83,
    "hot dogColor": "hsl(139, 70%, 50%)",
    "burger": 150,
    "burgerColor": "hsl(10, 70%, 50%)",
    "sandwich": 189,
    "sandwichColor": "hsl(327, 70%, 50%)",
    "kebab": 30,
    "kebabColor": "hsl(19, 70%, 50%)",
    "fries": 27,
    "friesColor": "hsl(205, 70%, 50%)",
    "donut": 193,
    "donutColor": "hsl(10, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 131,
    "hot dogColor": "hsl(152, 70%, 50%)",
    "burger": 141,
    "burgerColor": "hsl(167, 70%, 50%)",
    "sandwich": 27,
    "sandwichColor": "hsl(96, 70%, 50%)",
    "kebab": 155,
    "kebabColor": "hsl(132, 70%, 50%)",
    "fries": 167,
    "friesColor": "hsl(228, 70%, 50%)",
    "donut": 118,
    "donutColor": "hsl(210, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 48,
    "hot dogColor": "hsl(106, 70%, 50%)",
    "burger": 143,
    "burgerColor": "hsl(173, 70%, 50%)",
    "sandwich": 168,
    "sandwichColor": "hsl(298, 70%, 50%)",
    "kebab": 111,
    "kebabColor": "hsl(283, 70%, 50%)",
    "fries": 88,
    "friesColor": "hsl(104, 70%, 50%)",
    "donut": 191,
    "donutColor": "hsl(259, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 69,
    "hot dogColor": "hsl(242, 70%, 50%)",
    "burger": 25,
    "burgerColor": "hsl(40, 70%, 50%)",
    "sandwich": 131,
    "sandwichColor": "hsl(191, 70%, 50%)",
    "kebab": 102,
    "kebabColor": "hsl(124, 70%, 50%)",
    "fries": 175,
    "friesColor": "hsl(194, 70%, 50%)",
    "donut": 160,
    "donutColor": "hsl(143, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 92,
    "hot dogColor": "hsl(165, 70%, 50%)",
    "burger": 177,
    "burgerColor": "hsl(92, 70%, 50%)",
    "sandwich": 47,
    "sandwichColor": "hsl(34, 70%, 50%)",
    "kebab": 142,
    "kebabColor": "hsl(59, 70%, 50%)",
    "fries": 28,
    "friesColor": "hsl(256, 70%, 50%)",
    "donut": 133,
    "donutColor": "hsl(0, 70%, 50%)"
  }
]

const lineData = [
  {
    "id": "japan",
    "color": "hsl(244, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 177
      },
      {
        "x": "helicopter",
        "y": 178
      },
      {
        "x": "boat",
        "y": 207
      },
      {
        "x": "train",
        "y": 142
      },
      {
        "x": "subway",
        "y": 269
      },
      {
        "x": "bus",
        "y": 96
      },
      {
        "x": "car",
        "y": 197
      },
      {
        "x": "moto",
        "y": 290
      },
      {
        "x": "bicycle",
        "y": 134
      },
      {
        "x": "horse",
        "y": 55
      },
      {
        "x": "skateboard",
        "y": 160
      },
      {
        "x": "others",
        "y": 253
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(244, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 269
      },
      {
        "x": "helicopter",
        "y": 255
      },
      {
        "x": "boat",
        "y": 165
      },
      {
        "x": "train",
        "y": 57
      },
      {
        "x": "subway",
        "y": 55
      },
      {
        "x": "bus",
        "y": 137
      },
      {
        "x": "car",
        "y": 104
      },
      {
        "x": "moto",
        "y": 12
      },
      {
        "x": "bicycle",
        "y": 56
      },
      {
        "x": "horse",
        "y": 209
      },
      {
        "x": "skateboard",
        "y": 20
      },
      {
        "x": "others",
        "y": 102
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(17, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 88
      },
      {
        "x": "helicopter",
        "y": 250
      },
      {
        "x": "boat",
        "y": 69
      },
      {
        "x": "train",
        "y": 277
      },
      {
        "x": "subway",
        "y": 127
      },
      {
        "x": "bus",
        "y": 281
      },
      {
        "x": "car",
        "y": 207
      },
      {
        "x": "moto",
        "y": 37
      },
      {
        "x": "bicycle",
        "y": 127
      },
      {
        "x": "horse",
        "y": 40
      },
      {
        "x": "skateboard",
        "y": 124
      },
      {
        "x": "others",
        "y": 69
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(330, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 298
      },
      {
        "x": "helicopter",
        "y": 70
      },
      {
        "x": "boat",
        "y": 156
      },
      {
        "x": "train",
        "y": 152
      },
      {
        "x": "subway",
        "y": 127
      },
      {
        "x": "bus",
        "y": 229
      },
      {
        "x": "car",
        "y": 217
      },
      {
        "x": "moto",
        "y": 61
      },
      {
        "x": "bicycle",
        "y": 143
      },
      {
        "x": "horse",
        "y": 209
      },
      {
        "x": "skateboard",
        "y": 58
      },
      {
        "x": "others",
        "y": 293
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(203, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 204
      },
      {
        "x": "helicopter",
        "y": 287
      },
      {
        "x": "boat",
        "y": 249
      },
      {
        "x": "train",
        "y": 111
      },
      {
        "x": "subway",
        "y": 20
      },
      {
        "x": "bus",
        "y": 79
      },
      {
        "x": "car",
        "y": 175
      },
      {
        "x": "moto",
        "y": 13
      },
      {
        "x": "bicycle",
        "y": 54
      },
      {
        "x": "horse",
        "y": 2
      },
      {
        "x": "skateboard",
        "y": 63
      },
      {
        "x": "others",
        "y": 277
      }
    ]
  }
]

const StatCard = ({ stat, Icon }) => {
  return <Paper withBorder radius="md" p="md" shadow='md' variant=''>
    <Group>
      <RingProgress
        size={80}
        roundCaps
        thickness={8}
        sections={[{ value: stat.progress, color: stat.color }]}
        label={
          <Center>
            <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </Center>
        }
      />

      <div>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
          {stat.label}
        </Text>
        <Text fw={700} size="xl">
          {stat.stats}
        </Text>
      </div>
    </Group>
  </Paper>
}

const Dashboard = () => {

  const [userList, setUserList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [barChartKeys, setBarChartKeys] = useState([]);

  const formatPieData = (data) => {
    const categoryData = {};
    data.forEach(element => {
      if(Object.keys(categoryData).includes(element.material)){
        categoryData[element.material] += 1;
      }else{
        categoryData[element.material] = 1;
      }
    });
    // console.log(categoryData);
    const chatData = Object.keys(categoryData).map((key) => {
      return {
        id: key,
        label: key,
        value: categoryData[key],
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      }
    })
    // console.log(chatData);
    setPieChartData(chatData);

  }

  const formBarData = (data) => {
      setBarChartData(
        data.map(item => (
          {
            name: item.title,
            stock: item.stock 
          }
        ))
      )

      console.log(data.map(item => (
        {
          name: item.title,
          stock: item.stock 
        }
      )));

      setBarChartKeys(
        data.map(item => (
          item.title
        ))
      )
  }

  const fetchUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
      .then(res => res.json())
      .then(data => {
        setUserList(data);
      })
  }

  const fetchOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/getall`)
    .then(res => res.json())
    .then(data => {
      setOrderList(data);
    })
  }
  
  const fetchProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`)
    .then(res => res.json())
    .then(data => {
      setProductList(data);
      console.log(data);
        formatPieData(data);
        formBarData(data);
      })
  }

  const fetchFeedbacks = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/getall`)
      .then(res => res.json())
      .then(data => {
        setFeedbackList(data);
      })
  }

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchFeedbacks();
  }, [])


  return (
    <div>
      <Box mt={'5vh'}>

        <Grid h={'15vh'}>

          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Users', stats: userList.length, progress: 10, color: 'blue' }} Icon={IconUser} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Orders', stats: orderList.length, progress: 35, color: 'cyan' }} Icon={IconShoppingCart} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Products', stats: productList.length, progress: 60, color: 'pink' }} Icon={IconShirt} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
            <StatCard stat={{ label: 'Total Feedbacks', stats: 0, progress: 0, color: 'yellow' }} Icon={IconMessage} />
          </Grid.Col>
        </Grid>

        <Grid>

          <Grid.Col span={{ base: 12, md: 6 }} h={'40vh'}>
            <Title order={3}>Product Stock Distribution</Title>
            <BarChart data={data} xCol={'name'} keys={[barChartKeys]} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} h={'40vh'}>
            <Title order={3}>Product Material Distribution</Title>
            <PieChart data={pieChartData} />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }} h={'40vh'}>
            <LineChart data={lineData} />
          </Grid.Col>

        </Grid>

      </Box>
    </div>
  )
}

export default Dashboard;