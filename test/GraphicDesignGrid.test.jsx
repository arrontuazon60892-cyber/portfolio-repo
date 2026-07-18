import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GraphicDesignGrid from "../src/components/GraphicDesignGrid";

const items = Array.from({ length: 8 }, (_, index) => ({
  id: `design-${index + 1}`,
  title: `Design ${index + 1}`,
  src: `/assets/GRAPHIC_DESIGN_V2/design-${index + 1}.png`,
}));

describe("GraphicDesignGrid", () => {
  it("renders all eight images without lazy loading or client load state", () => {
    const { container } = render(<GraphicDesignGrid items={items} />);
    const images = screen.getAllByRole("img");

    expect(container.querySelectorAll(".graphic-design-card")).toHaveLength(8);
    expect(images).toHaveLength(8);
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", items[index].src);
      expect(image).toHaveAttribute("loading", "eager");
      expect(image).toHaveAttribute("decoding", "sync");
    });
  });
});
