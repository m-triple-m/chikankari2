'use client';
import { Container, Title, Text, Button } from '@mantine/core';
import classes from './about.module.css';

const About = () => {
    return (
        <div className={classes.root}>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Brief About{' '}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: 'pink', to: 'yellow' }}
                            >
                                Chikankari
                            </Text>
                        </Title>

                        <Text className={classes.description} mt={30}>
                            Chikankari is a traditional embroidery style from Lucknow, India. Translated, the word means embroidery (thread or wire), and it is one of Lucknow&apos;s best known textile decoration styles. The main market in Lucknow for Chikankari based products is Chowk.
                        </Text>

                        <Button
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'yellow' }}
                            size="xl"
                            className={classes.control}
                            mt={40}
                        >
                            Get started
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default About;