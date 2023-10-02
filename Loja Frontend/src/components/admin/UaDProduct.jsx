
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { getCategoriesAsync } from "../../features/CategoriesSlice";
import { useParams , Navigate} from "react-router-dom";
import {  deleteProductAsync, getProductByIdAsync, updateProductAsync } from "../../features/ProductSlics";
import Modal from "../../pages/modal/Modal";

const UaDProduct = () => {
    const params = useParams();
    const {id} = params;
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
      name: "",
      description: "",
      image: null,
      colors: "",
      category: "",
      categoryType: "",
      subCategory: "",
      price: 0,
      discount: 0,
      availableQuantity: 0,
      featured: false,
    });

    useEffect(()=>{
      dispatch(getCategoriesAsync());
      dispatch(getProductByIdAsync(id));
    },[dispatch,id]);

    const [openModal,setOpenModal] = useState(null);
    const categories = useSelector((state) => state.categories.AllCategories);
    const product = useSelector((state)=>state.product.productById);
    const deletedProduct = useSelector((state)=>state.product.deletedProduct)
    console.log(product);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
          setFormData({ ...formData, [name]: checked });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
      const handleFileUpload = (e) => {
        const file = e.target.files[0] ;
        setFileToBase(file);
      };
      const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
      };
      
      useEffect(() => {
        if (product) {
          setFormData({
            image: product.image ,
            id:product.id,
            name: product.name,
            description: product.description,
            colors: product.colors,
            category: product.category,
            categoryType: product.categoryType,
            subCategory: product.subCategory,
            price: product.price,
            discount: product.discount,
            availableQuantity: product.availableQuantity,
            featured: product.featured,
          });
        }
      }, [product]);

      const clearForm = () => {
          setFormData({
            image: null,
            name: "",
            description: "",
            colors: [],
            category: "",
            categoryType: "",
            subCategory: "",
            price: "",
            discount: "",
            availableQuantity: "",
            featured: false,
          })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      if (formData.image instanceof Object) {
        const base64Image = null;
        console.log(base64Image)
        setFormData((prev) => ({
        ...prev,
          image: base64Image,
       }));
       dispatch(updateProductAsync({ ...formData, image: base64Image }))
       .then(()=>{
        clearForm();
      })
      }
       else{
        dispatch(updateProductAsync(formData))
        .then(()=>{
          clearForm();
        })
      }
    }
      const handleDelete = () => {
        dispatch(deleteProductAsync(id))
      };

  return (
    <>
     {deletedProduct  &&(
      <Navigate
        to={'/'}
        replace={true}
      ></Navigate>
    )}
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className=" font-bold text-4xl leading-7 flex justify-center items-center text-gray-900">
            Update Product
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex justify-center items-center">
              <div className="text-center">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>

                {formData.image && (
                  <img
                    src={ formData.image.secure_url || formData.image }
                    alt="Selected"
                    className="max-h-40 mx-auto mt-2"
                  />
                )}

                {!formData.image ? (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300 mt-4"
                    aria-hidden="true"
                  />
                ) : null}

                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[#B9A79C] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#754224] focus-within:ring-offset-2 hover:text-[#754224]"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                  </label>

                  <p className="pl-1">or drag and drop</p>
                </div>

                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-3">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* <div className="col-span-full">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              {...register("category", {
                required: "category is required",
              })}
            >
              <option value="">--choose category--</option>
              {categories.map((category) => (
                <option key={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
        </div> */}

            <div className="sm:col-span-2">
              <label
                htmlFor="colors"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Colors
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    id="colors"
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <select
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="">-- choose category --</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="categoryType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category Type
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    id="categoryType"
                    name="categoryType"
                    value={formData.categoryType}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="subCategory"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sub Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="discount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="availableQuantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Available Quantity
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    id="availableQuantity"
                    name="availableQuantity"
                    value={formData.availableQuantity}
                    onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="featured"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Featured
              </label>
              <div className="mt-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center ">
          <button
            type="submit"
            className="rounded-md bg-[#B9A79C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#754224] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754224]"
          >
            Update
          </button>
          <button
            onClick={(e)=>{e.preventDefault();setOpenModal(true)}}
            className="rounded-md bg-[#F7001F] ml-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#e34646] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7001F]"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
      {product && <Modal
        message="Are you sure you want to delete this Product ?"
        dangerOption="Delete"
        cancelOption="Cancel"
        dangerAction={handleDelete}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal}
      ></Modal>}
      </>
  );
};

export default UaDProduct;
