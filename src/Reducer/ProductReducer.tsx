import type { ProductType } from "../type/Product";
import type { Actions } from "../type/Action";

export const ProductReducer = (
  product: ProductType[],
  action: Actions
): ProductType[] => {
  switch (action.type) {
    case "Set Product":
      return action.payload;
    case "Add Product":
      return [
        ...product,
        {
          title: action.payload.title,
          description: action.payload.description,
          category: action.payload.category,
          price: action.payload.price,
          discountPercentage: action.payload.discountPercentage,
          rating: action.payload.rating,
          stock: action.payload.stock,
          tags: action.payload.tags,
          brand: action.payload.brand,
          sku: action.payload.sku,
          weight: action.payload.weight,
          dimensions: action.payload.dimensions,
          warrantyInformation: action.payload.warrantyInformation,
          shippingInformation: action.payload.shippingInformation,
          availabilityStatus: action.payload.availabilityStatus,
          reviews: action.payload.reviews,
          returnPolicy: action.payload.returnPolicy,
          minimumOrderQuantity: action.payload.minimumOrderQuantity,
          meta: action.payload.meta,
          thumbnail: action.payload.thumbnail,
          images: action.payload.images,
        },
      ];

    default:
      return product;
  }
};
