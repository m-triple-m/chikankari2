'use client';
import useBrowseContext from '@/context/BrowseContext';
import { AppShell, Burger, Checkbox, Group, RangeSlider, Title, ColorPicker, DEFAULT_THEME, ActionIcon, Grid, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import appConfig from '@/utils/constants'
import { Navbar } from '@/app/navbar';
import { IconCheck } from '@tabler/icons-react';
// import checkboxClasses from './checkbox.module.css';

const { minPrice, maxPrice } = appConfig;

const priceMarks = [
    { value: 100, label: '₹100' },
    { value: 2000, label: '₹2000' },
    { value: 5000, label: '₹5000' },
    { value: 10000, label: '₹10000' },
];

const sizeOptions = [
    38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60
]

const availableColors = [
    {
        name: 'Red',
        color: '#FF0000'
    },
    {
        name: 'Green',
        color: '#008000'
    },
    {
        name: 'Blue',
        color: '#0000FF'
    },
    {
        name: 'Yellow',
        color: '#FFFF00'
    },
    {
        name: 'Pink',
        color: '#FFC0CB'
    },
    {

        name: 'LightGreen',
        color: '#90EE90'
    },
    {
        name: 'LightBlue',
        color: '#ADD8E6'
    },
    {
        name: 'LightYellow',
        color: '#FFFFE0'
    },
    {
        name: 'Black',
        color: '#000000'
    },
    {
        name: 'purple',
        color: '#800080'

    },
    {
        name: 'Orange',
        color: '#FFA500'
    },
    {
        name: 'White',
        color: '#FFFFFF'
    },
    {
        name: 'Grey',
        color: '#808080'
    },
    {
        name: 'Brown',
        color: '#A52A2A'
    },
    {
        name: 'Maroon',
        color: '#800000'
    },
    {
        name: 'Navy',
        color: '#000080'
    },
    {
        name: 'Teal',
        color: '#008080'
    },
    {
        name: 'Olive',
        color: '#808000'
    },
    {
        name: 'Lime',
        color: '#00FF00'
    },
    {
        name: 'Aqua',
        color: '#00FFFF'
    },
    {
        name: 'Fuchsia',
        color: '#FF00FF'
    },
    {
        name: 'Silver',
        color: '#C0C0C0'
    },
    {
        name: 'Gold',
        color: '#FFD700'
    },
    {
        name: 'Beige',
        color: '#F5F5DC'
    },
    {
        name: 'Tan',
        color: '#D2B48C'
    },
    {
        name: 'Cyan',
        color: '#00FFFF'
    },
    {
        name: 'Magenta',
        color: '#FF00FF'
    },
    {
        name: 'Indigo',
        color: '#4B0082'
    },
    {
        name: 'Violet',
        color: '#8A2BE2'
    },
    {
        name: 'Turquoise',
        color: '#40E0D0'
    },
    {
        name: 'Salmon',
        color: '#FA8072'
    },
    {
        name: 'Plum',
        color: '#DDA0DD'
    },
    {
        name: 'Khaki',
        color: '#F0E68C'
    },
    {
        name: 'Ivory',
        color: '#FFFFF0'
    },
    {
        name: 'Coral',
        color: '#FF7F50'
    },
    {
        name: 'Crimson',
        color: '#DC143C'
    },


]

const Layout = ({ children }) => {

    const {
        setSelPriceRange,
        filterBySize,
        filterByColor,
        setProductList,
    } = useBrowseContext();
    const [value, onChange] = useState('#fff');

    const [selColor, setSelColor] = useState(null);
    const [selSizes, setSelSizes] = useState([]);

    useEffect(() => {
        if (selSizes.length > 0)
            filterBySize(selSizes);
    }, [selSizes])


    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 400,
                breakpoint: 'sm',
                collapsed: { mobile: false },
            }}
            padding="md"
        // layout="alt"
        >
            <AppShell.Header>
                <Navbar />
            </AppShell.Header>

            <AppShell.Navbar p="xl" >
                <Title order={1}>Filter Options</Title>

                <Title order={4}>Price</Title>
                <RangeSlider
                    min={minPrice}
                    max={maxPrice}
                    marks={priceMarks}
                    defaultValue={[minPrice, maxPrice]}
                    onChangeEnd={v => setSelPriceRange([...v])}

                />

                <Title order={4} mt={30}>Category</Title>
                <Checkbox.Group
                    defaultValue={['react']}
                    // label="Select your favorite frameworks/libraries"
                    // description="This is anonymous"
                    withAsterisk
                >
                    <Group mt="xs">
                        <Checkbox value="react" label="Khadi Cotton" />
                        <Checkbox value="svelte" label="Shiffon" />
                        <Checkbox value="ng" label="Cotton" />
                        <Checkbox value="vue" label="Vescose" />
                        <Checkbox value="vue" label="Premium" />
                    </Group>
                </Checkbox.Group>
                <Title order={4} mt={20}>Select Color</Title>
                <Grid mt={10}>
                    {
                        availableColors.map((colorOpt, index) => (
                            <Grid.Col key={index} span={{ md: 2 }}>
                                <Tooltip label={colorOpt.name} color={colorOpt.color}>

                                    <ActionIcon variant="filled" color={colorOpt.color} aria-label="Settings" onClick={() => {
                                        setSelColor(colorOpt.name);
                                        setProductList(filterByColor(colorOpt.name));
                                    }}>
                                        {
                                            selColor === colorOpt.name && <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        }
                                    </ActionIcon>
                                </Tooltip>
                            </Grid.Col>
                        ))
                    }
                </Grid>
                <Title order={4} mt={30}>Size</Title>
                <Checkbox.Group
                    defaultValue={['react']}
                    // label="Select your favorite frameworks/libraries"
                    // description="This is anonymous"
                    withAsterisk
                >
                    <Group mt="xs">
                        {
                            sizeOptions.map((size, index) => (
                                <Checkbox key={index} value={size} label={size} checked={selSizes.includes(size)} onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelSizes([...selSizes, size]);
                                    } else {
                                        setSelSizes(selSizes.filter(s => s !== size));
                                    }

                                }} />
                            ))
                        }
                    </Group>
                </Checkbox.Group>
            </AppShell.Navbar>

            <AppShell.Main mt={40}>{children}</AppShell.Main>
        </AppShell>
    )
}

export default Layout