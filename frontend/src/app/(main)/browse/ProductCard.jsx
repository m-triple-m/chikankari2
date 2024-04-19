'use client';

import { Badge, Button, Card, Container, Flex, Grid, Group, Text, useHovered } from "@mantine/core";
import classes from './browse.module.css';
// import Link from "next/link";
// import { IconShoppingCart } from "@tabler/icons-react";
import useCartContext from "@/context/CartContext";
// import useBrowseContext from "@/context/BrowseContext";
import { useRouter } from "next/navigation";

const ProductCard = ({ productData }) => {

  const { cartItems, addItem, checkItemExists } = useCartContext();
  // const { stringSlicer } = useBrowseContext();
  const router = useRouter();

  const stringSlicer = (str, limit) => {
    if (str.length > limit) {
        return str.slice(0, limit) + '...';
    }
    return str;
}

  return (

    <Card withBorder radius="md" className={classes.card}
      onClick={
        () => router.push('/productdetails/' + productData._id)
      }
    >
      <Card.Section className={classes.imageSection}>
        <div className={classes.Container - useHovered}>
          <img className={classes.prodImg} src={`${process.env.NEXT_PUBLIC_API_URL}/${productData.image}`} alt="Tesla Model S" />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>
          {stringSlicer(productData.title, 30)}
          </Text>
          <Text fz="xs" c="dimmed">
            {stringSlicer(productData.description, 40)}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Flex justify="space-between">
          <Text fz="sm" c="dimmed" className={classes.label}>
            {productData.material}
          </Text>
          <Badge color="red" variant="filled">{productData.offer}% off</Badge>
        </Flex>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              ₹{productData.price}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              per piece
            </Text>
          </div>

          {/* <Button disabled={
            checkItemExists(productData._id)
          } fullWidth radius="xl" mt={10} style={{ flex: 1 }} onClick={() => addItem(productData)}>
            <IconShoppingCart /> {
              checkItemExists(productData._id) ? 'Added to cart' : 'Add to cart'
            }
          </Button> */}
        </Group >
      </Card.Section>
    </Card>
  );
}

export default ProductCard;