import { Container, Stack } from "@mantine/core";
import { KitCard } from "../components/KitCard/KitCard";
import { kits } from "../data/kits";

export function ProductsPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        {kits.map((kit) => (
          <KitCard key={kit.id} kit={kit} />
        ))}
      </Stack>
    </Container>
  );
}
