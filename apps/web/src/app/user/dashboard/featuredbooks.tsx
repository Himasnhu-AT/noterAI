import { HoverEffect } from "@/components/ui/card-hover-effect";

export function FeaturedBooks() {
  return (
    <div className="max-w-3xl px-5">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Book1",
    description:
      "Sample book",
    link: "book",
  },
  {
    title: "Netflix",
    description:
      "A streaming service",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
];
