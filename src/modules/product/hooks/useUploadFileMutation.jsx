import { useMutation } from "@tanstack/react-query";
import supabase from "../../../config/supbase";
import { generateFilePath } from "../helpers/file";

export default function useUploadFileMutation() {
    const uploadFileMutation = useMutation({
        mutationFn: ({ category, file }) => {
          return supabase.storage
            .from("ecommerce")
            .upload(`${category}/${generateFilePath(file.name)}`, file, {
              cacheControl: "3600",
              upsert: false,
            });
        },
      });
  return uploadFileMutation;
}
