import Link from "next/link";
import PageHead from "@/components/PageHead";

export default function NotFound() {
  return (
    <PageHead eyebrow="Wrong turn" title="This stop isn’t on the route.">
      <p>The page you were looking for has moved or never existed. The van always ends up at 4301 Page Blvd.</p>
      <Link href="/" className="btn btn-amber mt-8">
        Back home
      </Link>
    </PageHead>
  );
}
