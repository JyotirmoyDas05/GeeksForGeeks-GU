import { redirect } from "next/navigation";

export default function Page() {
  // Permanent redirect from /members to /about
  redirect("/about");
}
