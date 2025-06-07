import { IListing } from "@/interfaces/IListing";

interface props {
  values: IListing;
  image: string[];
  cords: { lat: any; long: any };
}
export function listAddingData({ cords, image, values }: props) {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("price", values.price);
  formData.append("message", values.description);
  formData.append("categoryId", values.category);

  for (const img of image) {
    const filename = img.split("/").pop() || `image_${Date.now()}.jpg`;
    const fileType = filename.split(".").pop() || "jpg";

    formData.append("images", {
      uri: img,
      name: filename,
      type: `image/${fileType}`,
    } as any);
  }

  if (values.category) {
    formData.append("location", JSON.stringify(cords));
  }
  return formData;
}
