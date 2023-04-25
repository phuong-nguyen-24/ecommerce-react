import { useMutation } from "@tanstack/react-query";
import supabase from "../../../config/supbase";

export default function useAddProduct({options}) {
  const addProductMutation = useMutation({
    mutationFn: (newProduct) => supabase.from("product").insert(newProduct),
    ...options,
  });
  return addProductMutation;
}
