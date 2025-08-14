import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import { useProduct } from "../hooks/useProduct";
import type { ProductType } from "../type/Product";
import { IoCloseSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import api from "../app/api/api";
import type { ProductsResponse } from "../type/Product";
import type { Category } from "../type/Category";
import { IoMdAdd } from "react-icons/io";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState<Category[]>([]);
  const [SearchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const { Products, dispatch } = useProduct();
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setSearchProduct(Products);
  }, [Products]);

  const handleDisplay = (product: ProductType) => {
    setDetails(true);
    setSelectedProduct(product);
  };

  const handleSearch = async () => {
    if (!input.trim()) {
      setSearchProduct(Products);
      return;
    }

    try {
      const res = await api.get<ProductsResponse>(
        `/products/search?q=${encodeURIComponent(input)}`
      );
      setSearchProduct(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<ProductType>("/products/add", form);
      dispatch({
        type: "Add Product",
        payload: res.data,
      });
      setOpen(false);
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

  useEffect(() => {
    const handleSelect = async () => {
      try {
        const Select = await api.get<Category[]>("/products/categories");

        setSelect(Select.data);
      } catch (error) {
        console.error(error);
      }
    };

    handleSelect();
  }, []);

  const handleSelectCategory = async (categoryName: string) => {
    try {
      if (categoryName === "all") {
        const res = await api.get<ProductsResponse>("/products");
        setSearchProduct(res.data.products);
      } else {
        const res = await api.get<ProductsResponse>(
          `/products/category/${encodeURIComponent(categoryName)}`
        );
        setSearchProduct(res.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      dispatch({
        type: "Remove Product",
        payload: { id: id },
      });
      setDetails(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* form  */}

      {open && (
        <div className="absolute">
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
      )}
      {/* form  */}

      <div>
        <div className="flex gap-7">
          <div className=" justify-center border w-[626px] ml-[19%] rounded-2xl mt-[50px]">
            <input
              className="border-none focus:outline-none w-[550px] py-2  px-6 rounded-xl "
              type="text"
              placeholder="Search Product"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              onClick={handleSearch}
              className="border bg-red-400 text-white font-bold py-2 px-3 rounded-2xl cursor-pointer"
            >
              search
            </button>
          </div>

          <div className="mt-[50px]">
            <select
              onChange={(e) => {
                handleSelectCategory(e.target.value);
              }}
              className="px-[25px] border py-2"
            >
              {select.map((sele) => (
                <option value={sele.name}>{sele.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-[50px] ml-[20px] cursor-pointer">
            <IoMdAdd onClick={() => setOpen(true)} className="text-4xl" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mx-[40px] my-[40px]">
          {SearchProduct.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              description={product.description}
              thumbnail={product.thumbnail}
              price={product.price}
              discountPercentage={product.discountPercentage}
              onClick={() => handleDisplay(product)}
            />
          ))}
        </div>

        <div>
          {details && selectedProduct && (
            <div className=" absolute top-0 left-[10%] h-[750px] bg-gray-200 w-[80%] border-gray-100 shadow-lg rounded-md">
              <div className="float-right mr-[45px]">
                <IoCloseSharp
                  onClick={() => {
                    setDetails(false);
                  }}
                  className="text-5xl font-bold text-gray-500 absolute cursor-pointer"
                />
              </div>

              <div className="flex gap-[190px]">
                <div className="pl-[40px] py-[10px]">
                  <div className="border-none ">
                    <img
                      className="w-[350px]"
                      src={selectedProduct.thumbnail}
                    />
                  </div>

                  <div className="flex mt-6 gap-2">
                    {selectedProduct.images?.map((image, index) => (
                      <div
                        key={index}
                        className="border border-amber-400 cursor-pointer"
                      >
                        <img className="w-[100px]" src={image} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className=" mr-12 pt-10">
                  <div className="flex gap-2">
                    <div className="text-amber-400 flex">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <h1>{selectedProduct.rating}</h1> <h1>Star Rating </h1>
                  </div>

                  <div>
                    <h1 className="font-bold text-blue-950 text-lg py-6">
                      {selectedProduct.title}
                    </h1>

                    <div className="flex gap-[50px]">
                      <div>
                        <p className="text-sm py-3 ">
                          Sku:{selectedProduct.sku}
                        </p>
                        <p className="text-sm ">
                          brand:{selectedProduct.brand}
                        </p>
                      </div>
                      <div>
                        <p className="py-3">
                          Category:{selectedProduct.category}
                        </p>
                        <p>
                          Availability:
                          <span className="text-green-600">
                            {selectedProduct.availabilityStatus}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-amber-400 ">
                        ${selectedProduct.price}
                      </h1>
                    </div>

                    <div className="flex gap-10 my-7">
                      <h1 className="text-sm py-4">
                        depth:{selectedProduct.dimensions?.depth}
                      </h1>
                      <h1 className="text-sm py-4">
                        height:{selectedProduct.dimensions?.height}
                      </h1>
                      <h1 className="text-sm py-4">
                        width:{selectedProduct.dimensions?.width}
                      </h1>
                    </div>

                    <div className="my-6">
                      <p className="text-[15px] py-3">
                        {" "}
                        Warrant Information:
                        {selectedProduct.warrantyInformation}
                      </p>
                      <p className="text-[15px] py-3">
                        Ahipping Information:
                        {selectedProduct.shippingInformation}
                      </p>
                      <p className="text-[15px] py-3 text-green-500">
                        Minimum OrderQuantity:
                        {selectedProduct.minimumOrderQuantity}
                      </p>
                    </div>

                    <div className="grid grid-cols-2">
                      {selectedProduct.reviews?.map((review) => (
                        <div>
                          <p className="text-md py text-amber-300">
                            rating: {review.rating}
                          </p>
                          <p className="text-md py">comment:{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between py-[50px]">
                      <button
                        onClick={() => handleDelete(selectedProduct.id!)}
                        className="bg-red-500 text-white px-12 py-3 cursor-pointer rounded-md"
                      >
                        Delete
                      </button>
                      <button className="rounded-md bg-green-500 text-white px-10 py-3 cursor-pointer">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
