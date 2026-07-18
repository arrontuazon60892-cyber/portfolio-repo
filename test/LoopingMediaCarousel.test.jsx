import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import LoopingMediaCarousel from "../src/components/LoopingMediaCarousel";

const items = Array.from({ length: 8 }, (_, index) => ({
  id: `design-${index + 1}`,
  title: `Design ${index + 1}`,
  src: `/assets/GRAPHIC_DESIGN_V2/design-${index + 1}.png`,
  type: "image",
}));

const originalIntersectionObserver = globalThis.IntersectionObserver;

beforeAll(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }

    observe() {
      this.callback([{ isIntersecting: true }]);
    }

    disconnect() {}
  };
});

afterAll(() => {
  globalThis.IntersectionObserver = originalIntersectionObserver;
});

describe("LoopingMediaCarousel", () => {
  it("renders all eight creative images in each loop without visibility animation", async () => {
    const { container } = render(
      <LoopingMediaCarousel items={items} direction="left" variant="creative" />
    );

    const sets = container.querySelectorAll(".media-loop__set");
    expect(sets).toHaveLength(2);
    expect(sets[0].querySelectorAll(".media-loop-card")).toHaveLength(8);
    expect(sets[1].querySelectorAll(".media-loop-card")).toHaveLength(8);

    expect(screen.getAllByRole("img")).toHaveLength(8);
    const images = container.querySelectorAll(".media-loop-card img");
    expect(images).toHaveLength(16);
    images.forEach((image) => expect(image).toHaveAttribute("loading", "eager"));
    expect(container.querySelector('[style*="opacity"]')).not.toBeInTheDocument();

    await waitFor(() => expect(container.querySelector(".media-loop")).not.toHaveClass("is-paused"));
    fireEvent.mouseEnter(container.querySelector(".media-loop__viewport"));
    expect(container.querySelector(".media-loop")).toHaveClass("is-paused");
  });

  it("opens the existing media modal when an image card is clicked", async () => {
    render(<LoopingMediaCarousel items={items} variant="creative" />);
    fireEvent.click(screen.getByRole("button", { name: "Open Design 1" }));
    expect(await screen.findByRole("dialog")).toHaveTextContent("Design 1");
  });
});
