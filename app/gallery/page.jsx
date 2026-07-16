import { redirect } from "next/navigation";

// Gallery section has been removed. Redirect visitors to the home page.
export default function GalleryPage() {
  redirect("/");
}
