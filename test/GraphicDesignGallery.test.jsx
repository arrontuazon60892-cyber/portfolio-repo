import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PortfolioCollectionPage from "../src/components/PortfolioCollectionPage";
import { graphicDesigns } from "../src/data/portfolioContent";

const gymShirtDesigns = [
  ["Gym Shirt Design 01", "/assets/GRAPHIC_DESIGN_V2/gymshirt1.png"],
  ["Gym Shirt Design 02", "/assets/GRAPHIC_DESIGN_V2/gymshirt2.png"],
  ["Gym Shirt Design 03", "/assets/GRAPHIC_DESIGN_V2/gymshirt3.png"],
  ["Oversized Gym Shirt", "/assets/GRAPHIC_DESIGN_V2/Oversized Gym Shirt.png"],
];

describe("Graphic Design gallery", () => {
  it("includes all four gym shirt designs with their exact public paths", () => {
    gymShirtDesigns.forEach(([title, src]) => {
      expect(graphicDesigns).toContainEqual(expect.objectContaining({ title, src }));
    });
  });

  it("opens the existing preview modal when a gym shirt card is clicked", async () => {
    const items = graphicDesigns.filter((item) => gymShirtDesigns.some(([title]) => title === item.title));
    render(<PortfolioCollectionPage kind="design" items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "Open Oversized Gym Shirt design preview" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Oversized Gym Shirt");
    expect(within(dialog).getByRole("img", { name: "Oversized Gym Shirt" })).toHaveAttribute(
      "src",
      expect.stringContaining("Oversized%20Gym%20Shirt.png"),
    );
  });
});
