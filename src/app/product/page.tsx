import type { Metadata } from "next";

import ProductPageClient from "./ProductPageClient";

export const metadata: Metadata = {
  title: "Product",
  description: "Overview of the Milemend product and implementation approach.",
};

export default function ProductPage() {
  return <ProductPageClient />;
}
