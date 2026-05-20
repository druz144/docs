import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconExternalLink,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/useCart";
import { getKitImageUrl, type Kit } from "../../data/kits";
import { manualLabel, priceFormatter } from "../../utils/format";
import { KitManufacturerBadge } from "../KitManufacturerBadge";
import classes from "./KitCard.module.css";

type KitCardProps = {
  kit: Kit;
};

export function KitCard({ kit }: KitCardProps) {
  const imageUrl = kit.images[0] ? getKitImageUrl(kit.images[0]) : undefined;
  const [imageFailed, setImageFailed] = useState(false);
  const detailsTo = `/products/${kit.id}`;
  const { getAmount, addItem, incrementItem, decrementItem } = useCart();
  const amount = getAmount(kit.id);

  return (
    <Card
      id={kit.id}
      className={classes.card}
      withBorder
      radius="md"
      padding="md"
    >
      <div className={classes.body}>
        <Link
          to={detailsTo}
          className={classes.imageWrap}
          aria-label={`View details for ${kit.name}`}
        >
          {imageUrl && !imageFailed ? (
            <img
              className={classes.image}
              src={imageUrl}
              alt={kit.name}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className={classes.placeholder}>
              <Text size="sm">No image</Text>
            </div>
          )}
        </Link>

        <div className={classes.info}>
          <Stack gap={4}>
            <Group justify="space-between" align="baseline" wrap="nowrap">
              <Title order={2} style={{ lineHeight: 1.2, minWidth: 0 }}>
                <Anchor
                  component={Link}
                  to={detailsTo}
                  underline="never"
                  inherit
                  c="inherit"
                >
                  {kit.name}
                </Anchor>
              </Title>
              {typeof kit.priceEur === "number" && (
                <Text
                  fw={700}
                  fz="var(--mantine-h2-font-size)"
                  className={classes.priceCol}
                >
                  {priceFormatter.format(kit.priceEur)}
                </Text>
              )}
            </Group>
            <Text c="dimmed" size="md">
              {kit.planeManufacturer} {kit.planeModel}
            </Text>
          </Stack>

          <Group gap="xs" mt="xs" align="center" wrap="wrap">
            {kit.type && (
              <Badge color="gray" variant="light" size="sm" tt="capitalize">
                {kit.type}
              </Badge>
            )}
            <Badge color="gray" variant="light" size="md">
              {kit.scale}
            </Badge>
            {kit.kitManufacturer && (
              <KitManufacturerBadge name={kit.kitManufacturer} />
            )}
          </Group>

          {kit.manuals && kit.manuals.length > 0 && (
            <Group gap="xs" mt="sm" wrap="wrap">
              <Text size="sm" c="dimmed">
                Manuals:
              </Text>
              {kit.manuals.map((manual) => (
                <Anchor
                  key={manual.url}
                  href={manual.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                >
                  <Group gap={4} wrap="nowrap">
                    {manualLabel(manual)}
                    <IconExternalLink size={14} stroke={1.5} />
                  </Group>
                </Anchor>
              ))}
            </Group>
          )}

          <div style={{ marginTop: "var(--mantine-spacing-sm)" }}>
            {amount === 0 ? (
              <Button
                variant="light"
                size="xs"
                leftSection={<IconShoppingCartPlus size={16} stroke={1.5} />}
                onClick={() => addItem(kit.id, 1)}
              >
                Add to cart
              </Button>
            ) : (
              <Group gap={6} wrap="nowrap" className={classes.stepper}>
                <ActionIcon
                  variant="default"
                  onClick={() => decrementItem(kit.id)}
                  aria-label="Decrease amount"
                >
                  <IconMinus size={16} stroke={1.5} />
                </ActionIcon>
                <Text
                  fw={600}
                  size="sm"
                  ta="center"
                  className={classes.stepperCount}
                  aria-live="polite"
                >
                  {amount}
                </Text>
                <ActionIcon
                  variant="default"
                  onClick={() => incrementItem(kit.id)}
                  aria-label="Increase amount"
                >
                  <IconPlus size={16} stroke={1.5} />
                </ActionIcon>
              </Group>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
