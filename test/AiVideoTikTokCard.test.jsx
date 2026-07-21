import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TikTokPrompt, VideoCard } from "../src/components/PortfolioHome";
import { contactDetails, videos } from "../src/data/portfolioContent";

describe("AI video TikTok project", () => {
  const runningProject = videos.find((item) => item.id === "ai-running");
  const planetProject = videos.find((item) => item.id === "hd-189733-b");

  it("renders the running thumbnail as a secure link to the existing TikTok profile", () => {
    render(<VideoCard item={runningProject} />);

    const link = screen.getByRole("link", { name: "View AI-Generated Running Video on TikTok" });
    expect(link).toHaveAttribute("href", contactDetails.tiktok);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("img", { name: "AI-Generated Running Video thumbnail" })).toHaveAttribute(
      "src",
      expect.stringContaining("running.png"),
    );
    expect(screen.getByText("View on TikTok")).toBeInTheDocument();
  });

  it("links the more-videos message to the same TikTok profile", () => {
    render(<TikTokPrompt />);

    const link = screen.getByRole("link", {
      name: "Want to see more? Explore my other AI-generated videos on TikTok.",
    });
    expect(link).toHaveAttribute("href", contactDetails.tiktok);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the planet thumbnail as a secure link to its TikTok video", () => {
    render(<VideoCard item={planetProject} />);

    const link = screen.getByRole("link", {
      name: "View The Deadly Glass Rain of HD 189733 b on TikTok",
    });
    expect(link).toHaveAttribute("href", contactDetails.tiktok);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("img", { name: "The Deadly Glass Rain of HD 189733 b thumbnail" })).toHaveAttribute(
      "src",
      expect.stringContaining("PLANET.png"),
    );
    expect(screen.getByText("View on TikTok")).toBeInTheDocument();
  });
});
