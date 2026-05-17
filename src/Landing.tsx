import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";

export function LandingPage() {
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
            3D-printed detail parts for airliner plastic kits. Designed to fit
            Revell, Zvezda, and other major manufacturers.
          </Text>
        </Stack>
        <Group justify="center">
          <Button component={Link} to="/products" size="md" radius="md">
            Browse products
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
