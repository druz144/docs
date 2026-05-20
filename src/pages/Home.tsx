import { Anchor, Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconBrandInstagram } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

export function HomePage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" className={classes.hero} ta="center" pt={48} pb={32}>
        <Stack gap="xs">
          <Title order={1} size="h1" className={classes.heroTitle}>
            Aftermarket parts
            <br />
            for airliner scale models
          </Title>
          <Text size="lg" c="dimmed" maw={520} mx="auto">
            Molded and hand-crafted detail parts for airliner plastic kits.
            Designed to fit Revell, Zvezda, and other major manufacturers.
          </Text>
        </Stack>
        <Group justify="center">
          <Button component={Link} to="/products" size="md" radius="md">
            Browse products
          </Button>
        </Group>

        <Group justify="center" gap="md">
          <Group gap={6} align="center">
            <IconBrandInstagram size={20} stroke={1.5} />
            <Anchor
              href="https://www.instagram.com/druz144/"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              c="dimmed"
              underline="hover"
            >
              @druz144
            </Anchor>
          </Group>
        </Group>
      </Stack>
    </Container>
  );
}
