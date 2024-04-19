'use client';
import { Text, SimpleGrid, Container, rem } from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin } from '@tabler/icons-react';
import classes from './features.module.css';

function Feature({ icon: Icon, title, description, className, ...others }) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon style={{ width: rem(38), height: rem(38) }} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: 'Free Worldwide shipping',
    description:
      '',
  },
  {
    icon: IconCertificate,
    title: 'Best Quality Product',
    description:
      '',
  },
  {
    icon: IconCoin,
    title: 'Very Affordable Pricing',
    description:
      '',
  },
];

const Features = () => {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}

export default Features;