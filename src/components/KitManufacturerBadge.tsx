import { Badge } from "@mantine/core";

type Props = {
  name: string;
  size?: string;
};

export function KitManufacturerBadge({ name, size = "md" }: Props) {
  const lower = name.toLowerCase();
  const hasRevell = lower.includes("revell");
  const hasZvezda = lower.includes("zvezda");

  if (hasRevell && hasZvezda) {
    return (
      <Badge
        variant="gradient"
        gradient={{ from: "blue", to: "red" }}
        size={size}
      >
        {name}
      </Badge>
    );
  }
  if (hasRevell) {
    return (
      <Badge color="blue" variant="light" size={size}>
        {name}
      </Badge>
    );
  }
  if (hasZvezda) {
    return (
      <Badge color="red" variant="light" size={size}>
        {name}
      </Badge>
    );
  }
  return (
    <Badge color="gray" variant="light" size={size}>
      {name}
    </Badge>
  );
}
