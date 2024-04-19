'use client';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Menu,
  Avatar,
  Badge,
} from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {

  IconChevronDown, IconHeart, IconLogout, IconMessage, IconSettings, IconShoppingCart, IconStar, IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import cx from 'clsx';
import useCartContext from '@/context/CartContext';
import useAppContext from '@/context/AppContext';
import CartPage from './user/cartpage/page';

const mockdata = [
  {
    title: 'Shop By Categories',
    link: "/"
  },
  {

    title: ' Chikan Kurtas',
    link: "/browse/women"
  },
  {

    title: 'Chikan Short Tops',
    link: "/browse/women"
  },
  {

    title: ' Chikan Unstitched Kurta',
    link: "/browse/women"
  },
  {

    title: 'Chikan Kurta Sets',
    link: "/browse/women"
  },
  {

    title: 'Chikan Angrakha',
    link: "/browse/women"
  },
  {

    title: 'Slips',
    link: "/browse/women"
  },
];

export const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  // const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const { cartItems } = useCartContext();
  const { loggedIn, setLoggedIn, currentUser, logout } = useAppContext();
  const { cartOpened, toggleCart } = useCartContext();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start" onClick={e => router.push(item.link)}>
        {/* <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon> */}
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const displayLoginOption = () => {
    if (loggedIn) {
      return <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          >
            <Group gap={7}>
              <Avatar src={currentUser.avatar} alt={currentUser.name} radius="xl" size={20} />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {currentUser.name}
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
          onClick={() => router.push('/user/profile')}
            leftSection={
              <IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Profile
          </Menu.Item>
          <Menu.Item
          onClick={() => router.push('/user/order-history')}
            leftSection={
              <IconShoppingCart style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Manage Orders
          </Menu.Item>
         
          <Menu.Item
            color='red'
            onClick={logout}
            leftSection={
              <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    } else {
      return <>
        <Button component={Link} variant="default" href="/authenticate">Log in</Button>
      </>
    }
  }

  return (
    <header className={classes.header}>
      <Drawer size='xl' position='right' opened={cartOpened} onClose={toggleCart.close} title="Shopping Cart">
        <CartPage />
      </Drawer>
      <Box>
        <Group justify="space-between" h="100%">

          <a href="../" className={classes.link}><img src="/logo.png" alt="" width={400} />  </a>

          <Group h="100%" gap={0} visibleFrom="sm">
            {/* <a href="./" className={classes.link}>
              Home
            </a> */}
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Shop For Womens
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor component={Link} href="/browse" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={3} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="/browse/men" className={classes.link}>
              Mens
            </Link>
            <Link href="/browse/kids" className={classes.link}>
              Kids
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Button onClick={toggleCart.open} variant="filled" color='yellow' >
              <IconShoppingCart />
              <Badge variant="filled" color="red" radius="xl">
                {cartItems.length}
              </Badge>
            </Button>
          </Group>

          {displayLoginOption()}

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Menu"
            hiddenFrom="sm"
            zIndex={1000000}
          >
            <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="md">
              <Divider my="sm" />

              <a href="#" className={classes.link}>
                Home
              </a>
              <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                  <Box component="span" mr={5}>
                    Shop For Womens
                  </Box>
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                  />
                </Center>
              </UnstyledButton>
              <Collapse in={linksOpened}>{links}</Collapse>
              <a href="#" className={classes.link}>
                Mens
              </a>
              <a href="#" className={classes.link}>
                Kids
              </a>

              <Divider my="sm" />

              <Group justify="center" grow pb="xl" px="md">
                <Link content={Button} href="/authenticate" variant="default">Log in</Link>
                <Button>Sign Up</Button>
              </Group>
            </ScrollArea>
          </Drawer>
        </Group>

      </Box>
    </header>
  );
}