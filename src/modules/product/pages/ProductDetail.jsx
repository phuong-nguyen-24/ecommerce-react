import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import supabase from "../../../config/supbase";
import ProductLoading from "../components/ProductLoading";

export default function ProductDetail() {
  const { productId } = useParams();

  const {
    isLoading,
    data : product,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      supabase.from("product").select().eq("id", productId).single(),
    select: (res) => res.data,
  });
  console.log(product);

  if (isLoading) return <ProductLoading />;

  return <div>ProductDetail{productId}</div>;
}
