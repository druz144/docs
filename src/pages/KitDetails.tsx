import {
  ActionIcon,
  Alert,
  Anchor,
  Badge,
  Button,
  Container,
  CopyButton,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconLink,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { getKitImageUrl, kitsById } from "../data/kits";
import { manualLabel, priceFormatter } from "../utils/format";
import classes from "./KitDetails.module.css";

export function KitDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const kit = id ? kitsById[id] : undefined;

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpened, lightbox] = useDisclosure(false);

  const { getAmount, addItem, incrementItem, decrementItem } = useCart();
  const amount = kit ? getAmount(kit.id) : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const imagesCount = kit?.images.length ?? 0;

  const showImage = useCallback(
    (index: number) => {
      if (imagesCount === 0) return;
      const next = ((index % imagesCount) + imagesCount) % imagesCount;
      setLightboxIndex(next);
    },
    [imagesCount],
  );

  const openLightbox = useCallback(
    (index: number) => {
      showImage(index);
      lightbox.open();
    },
    [showImage, lightbox],
  );

  useEffect(() => {
    if (!lightboxOpened) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(lightboxIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(lightboxIndex - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpened, lightboxIndex, showImage]);

  if (!kit) {
    return (
      <Container size="md" py="xl">
        <Stack gap="md" align="flex-start">
          <Alert color="yellow" variant="light">
            Kit not found.
          </Alert>
          <Button
            component={Link}
            to="/products"
            variant="light"
            leftSection={<IconArrowLeft size={16} stroke={1.5} />}
          >
            Back to products
          </Button>
        </Stack>
      </Container>
    );
  }

  const lightboxImage = kit.images[lightboxIndex];
  const lightboxImageUrl = lightboxImage
    ? getKitImageUrl(lightboxImage)
    : undefined;

  return (
    <Container size="lg" py="xl">
      <Group mb="md">
        <Button
          variant="subtle"
          size="xs"
          leftSection={<IconArrowLeft size={16} stroke={1.5} />}
          onClick={() => navigate("/products")}
        >
          Back to products
        </Button>
      </Group>

      <div className={classes.info}>
        <Stack gap="xs">
          <Group gap="xs" wrap="wrap" align="center">
            <Title order={1} size="h2" style={{ lineHeight: 1.2 }}>
              {kit.name}
            </Title>
            {kit.type && (
              <Badge variant="light" radius="sm">
                {kit.type}
              </Badge>
            )}
          </Group>
          <Text c="dimmed">
            {kit.planeManufacturer} · {kit.planeModel}
          </Text>
        </Stack>

        {typeof kit.priceEur === "number" && (
          <Text fw={700} size="xl">
            {priceFormatter.format(kit.priceEur)}
          </Text>
        )}

        <Divider />

        <Stack gap={6}>
          <Group gap="sm" wrap="wrap">
            <Text size="sm" c="dimmed">
              Scale
            </Text>
            <Text size="sm" fw={500}>
              {kit.scale}
            </Text>
          </Group>
          {kit.kitManufacturer && (
            <Group gap="sm" wrap="wrap">
              <Text size="sm" c="dimmed">
                Kit by
              </Text>
              <Text size="sm" fw={500}>
                {kit.kitManufacturer}
              </Text>
            </Group>
          )}
          {kit.type && (
            <Group gap="sm" wrap="wrap">
              <Text size="sm" c="dimmed">
                Type
              </Text>
              <Text size="sm" fw={500}>
                {kit.type}
              </Text>
            </Group>
          )}
        </Stack>

        {kit.manuals && kit.manuals.length > 0 && (
          <Stack gap={6}>
            <Text size="sm" c="dimmed">
              Manuals
            </Text>
            <Stack gap={4} align="flex-start">
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
            </Stack>
          </Stack>
        )}

        <Divider />

        <Group justify="space-between" wrap="nowrap">
          {amount === 0 ? (
            <Button
              leftSection={<IconShoppingCartPlus size={16} stroke={1.5} />}
              onClick={() => addItem(kit.id, 1)}
            >
              Add to cart
            </Button>
          ) : (
            <Group gap={6} wrap="nowrap">
              <ActionIcon
                variant="default"
                size="lg"
                onClick={() => decrementItem(kit.id)}
                aria-label="Decrease amount"
              >
                <IconMinus size={16} stroke={1.5} />
              </ActionIcon>
              <Text
                fw={600}
                size="md"
                ta="center"
                style={{ minWidth: "2rem" }}
                aria-live="polite"
              >
                {amount}
              </Text>
              <ActionIcon
                variant="default"
                size="lg"
                onClick={() => incrementItem(kit.id)}
                aria-label="Increase amount"
              >
                <IconPlus size={16} stroke={1.5} />
              </ActionIcon>
            </Group>
          )}

          <CopyButton
            value={`${window.location.origin}${window.location.pathname}#/products/${kit.id}`}
            timeout={1500}
          >
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Link copied" : "Copy link"}
                withArrow
                position="left"
              >
                <ActionIcon
                  variant="subtle"
                  onClick={copy}
                  aria-label="Copy link to this kit"
                >
                  {copied ? (
                    <IconCheck size={16} stroke={1.5} />
                  ) : (
                    <IconLink size={16} stroke={1.5} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </div>

      {kit.images.length > 0 && (
        <section className={classes.gallerySection}>
          <Title order={3} size="h4" mb="sm">
            Gallery
          </Title>
          <div className={classes.galleryGrid}>
            {kit.images.map((src, index) => (
              <button
                key={src}
                type="button"
                className={classes.galleryItem}
                onClick={() => openLightbox(index)}
                aria-label={`Open ${kit.name} image ${index + 1} of ${kit.images.length}`}
              >
                <img
                  src={getKitImageUrl(src)}
                  alt={`${kit.name} — image ${index + 1}`}
                  loading="lazy"
                  className={classes.galleryImage}
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <Modal
        opened={lightboxOpened}
        onClose={lightbox.close}
        size="xl"
        centered
        withCloseButton
        title={`${kit.name} — image ${lightboxIndex + 1} of ${kit.images.length}`}
        padding="sm"
      >
        <div className={classes.lightboxBody}>
          {lightboxImageUrl && (
            <img
              src={lightboxImageUrl}
              alt={`${kit.name} — image ${lightboxIndex + 1}`}
              className={classes.lightboxImage}
            />
          )}
          {kit.images.length > 1 && (
            <Group justify="space-between" mt="sm">
              <Button
                variant="subtle"
                size="xs"
                leftSection={<IconChevronLeft size={16} stroke={1.5} />}
                onClick={() => showImage(lightboxIndex - 1)}
              >
                Previous
              </Button>
              <Button
                variant="subtle"
                size="xs"
                rightSection={<IconChevronRight size={16} stroke={1.5} />}
                onClick={() => showImage(lightboxIndex + 1)}
              >
                Next
              </Button>
            </Group>
          )}
        </div>
      </Modal>
    </Container>
  );
}
