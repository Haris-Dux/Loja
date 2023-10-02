import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../features/ProductSlics";
import { toast } from "react-toastify";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { getCategoriesAsync, getCategoriesTypeAsync, getsubCategoriesAsync} from "../../features/CategoriesSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.AllCategories);
  const subCategories = useSelector((state)=>state.categories.subCategories);
  const categoryType = useSelector((state)=>state.categories.getCategoriesTypes);
  const [formData, setFormData] = useState({
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
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
  };
  const handleCategoryTypeChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, categoryType: '' });
    dispatch(getCategoriesTypeAsync({category:selectedCategory}));  
};
 const handleSubCategoryChange = (e,selectedCategory) => {
  const selectedCategoryType = e.target.value;
  setFormData({...formData,categoryType:selectedCategoryType,subCategory:''});
  dispatch(getsubCategoriesAsync({category:selectedCategory,categoryType:selectedCategoryType}))
 }
  const filterdSubCategory = subCategories.filter(type=>type.categoryType === formData.categoryType);
  console.log(filterdSubCategory);
  const filteredCategoryTypes = categoryType.filter(type => type.category === formData.category);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData))
      .then(() => {
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
        });})
  };

  useEffect(()=>{
    dispatch(getCategoriesAsync())
  },[dispatch])

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className=" font-bold text-4xl leading-7 flex justify-center items-center text-gray-900">
            Add Product
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
                    src={formData.image}
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
                    onChange={handleCategoryTypeChange}
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
                  <select
                    type="text"
                    id="categoryType"
                    name="categoryType"
                    value={formData.categoryType}
                    onChange={handleSubCategoryChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="">-- choose categoryType --</option>
                    {filteredCategoryTypes.map((category)=>(
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                      
                    }
                    </select>
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
                  <select
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value={''}>-- choose subCategory --</option>
                    {filterdSubCategory.map((category)=>(
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                    </select>
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
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
