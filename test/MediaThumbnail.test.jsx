import { render, screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { SafeImage } from "../src/components/MediaThumbnail";

const completeDescriptor = Object.getOwnPropertyDescriptor(
  HTMLImageElement.prototype,
  "complete"
);
const naturalWidthDescriptor = Object.getOwnPropertyDescriptor(
  HTMLImageElement.prototype,
  "naturalWidth"
);

beforeAll(() => {
  Object.defineProperty(HTMLImageElement.prototype, "complete", {
    configurable: true,
    get: () => true,
  });
  Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", {
    configurable: true,
    get() {
      return this.getAttribute("src")?.includes("broken") ? 0 : 640;
    },
  });
});

afterAll(() => {
  Object.defineProperty(HTMLImageElement.prototype, "complete", completeDescriptor);
  Object.defineProperty(
    HTMLImageElement.prototype,
    "naturalWidth",
    naturalWidthDescriptor
  );
});

describe("SafeImage", () => {
  it("recognizes a cached image that completed before onLoad was observed", async () => {
    const { container } = render(
      <SafeImage item={{ title: "Cached artwork", src: "/cached-art.png" }} />
    );

    const image = screen.getByRole("img", { name: "Cached artwork preview" });

    await waitFor(() => expect(image).toHaveClass("is-loaded"));
    expect(container.querySelector(".media-card__loader")).not.toBeInTheDocument();
  });

  it("shows a visible fallback for a completed image that failed to decode", async () => {
    render(
      <SafeImage item={{ title: "Broken artwork", src: "/broken-art.png" }} />
    );

    expect(
      await screen.findByRole("img", { name: "Media preview unavailable" })
    ).toHaveTextContent("Preview unavailable");
  });
});
