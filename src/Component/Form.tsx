import React, { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import api from "../app/api/api";

export default function Form() {
  const { dispatch } = useProduct();

  const [form, setForm] = useState<ProductType>({
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: "",
    sku: "",
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    reviews: [],
    returnPolicy: "",
    minimumOrderQuantity: 1,
    meta: { createdAt: "", updatedAt: "", bardcode: 0, qrCode: "" },
    thumbnail: "",
    images: [],
  });
  const handleNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<ProductType>("/products/add", form);
      dispatch({
        type: "Add Product",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...(prev.images || []), ""] }));
  };

  const handleImagesChange = (index: number, value: string) => {
    const newImages = [...(form.images || [])];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <form
        onSubmit={handleNewProduct}
        className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />
          <input
            name="discountPercentage"
            type="number"
            value={form.discountPercentage}
            onChange={handleChange}
            placeholder="Discount %"
            className="border p-2 rounded"
          />
          <input
            name="rating"
            type="number"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="border p-2 rounded"
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border p-2 rounded"
          />
          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="border p-2 rounded"
          />
          <input
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight"
            className="border p-2 rounded"
          />
          <input
            name="warrantyInformation"
            value={form.warrantyInformation}
            onChange={handleChange}
            placeholder="Warranty Info"
            className="border p-2 rounded"
          />
          <input
            name="shippingInformation"
            value={form.shippingInformation}
            onChange={handleChange}
            placeholder="Shipping Info"
            className="border p-2 rounded"
          />
          <input
            name="availabilityStatus"
            value={form.availabilityStatus}
            onChange={handleChange}
            placeholder="Availability Status"
            className="border p-2 rounded"
          />
          <input
            name="returnPolicy"
            value={form.returnPolicy}
            onChange={handleChange}
            placeholder="Return Policy"
            className="border p-2 rounded"
          />
          <input
            name="minimumOrderQuantity"
            type="number"
            value={form.minimumOrderQuantity}
            onChange={handleChange}
            placeholder="Minimum Order Quantity"
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full"
        />

        {/* <div>
        <label className="block mb-1 font-semibold">Tags</label>
        <select name="tags" multiple value={form.tags} onChange={handleChange} className="border p-2 rounded w-full">
          {TAG_OPTIONS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
      </div> */}

        <div className="grid grid-cols-3 gap-2">
          <input
            name="dimensions.width"
            type="number"
            value={form.dimensions?.width}
            onChange={handleChange}
            placeholder="Width"
            className="border p-2 rounded"
          />
          <input
            name="dimensions.height"
            type="number"
            value={form.dimensions?.height}
            onChange={handleChange}
            placeholder="Height"
            className="border p-2 rounded"
          />
          <input
            name="dimensions.depth"
            type="number"
            value={form.dimensions?.depth}
            onChange={handleChange}
            placeholder="Depth"
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Meta</label>
          <input
            name="meta.createdAt"
            type="date"
            value={form.meta?.createdAt}
            onChange={handleChange}
            className="border p-2 rounded mr-2"
          />
          <input
            name="meta.updatedAt"
            type="date"
            value={form.meta?.updatedAt}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="meta.bardcode"
            type="number"
            value={form.meta?.bardcode}
            onChange={handleChange}
            placeholder="Barcode"
            className="border p-2 rounded mt-2"
          />
          <input
            name="meta.qrCode"
            value={form.meta?.qrCode}
            onChange={handleChange}
            placeholder="QR Code"
            className="border p-2 rounded mt-2"
          />
        </div>

        <input
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          className="border p-2 rounded w-full"
        />

        <div>
          <label className="block mb-1 font-semibold">Images</label>
          {form.images?.map((img, idx) => (
            <input
              key={idx}
              value={img}
              onChange={(e) => handleImagesChange(idx, e.target.value)}
              placeholder={`Image ${idx + 1} URL`}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
