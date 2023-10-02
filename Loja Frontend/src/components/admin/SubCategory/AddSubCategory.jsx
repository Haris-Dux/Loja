
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategoryAsync, getCategoriesTypeAsync } from '../../../features/CategoriesSlice';

const AddSubCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.AllCategories);
    const categoryType = useSelector((state)=>state.categories.getCategoriesTypes);
    
    const [formData, setFormData] = useState({
        categoryType:'',
        name: "",
        category: "",
      });
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === "checkbox") {
          setFormData({ ...formData, [name]: checked });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
      const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormData({ ...formData, category: selectedCategory, categoryType: '' });
        dispatch(getCategoriesTypeAsync({category:selectedCategory})); 
    };

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addSubCategoryAsync(formData))
        .then(()=>{
          setFormData({
            categoryType:'',
            name: "",
            category: "",
          })
        })
      }
      const filteredCategoryTypes = categoryType.filter(type => type.category === formData.category);
  return (
    <form onSubmit={handleSubmit}>
    <div className="space-y-12 bg-white p-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h1 className=" font-bold text-4xl leading-7 flex justify-center items-center text-gray-900">
          Create SubCategory
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full flex justify-center items-center">
            
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
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
                  onChange={handleCategoryChange}
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
              categoryType
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <select
                  type="text"
                  id="categoryType"
                  name="categoryType"
                  value={formData.categoryType}
                  onChange={handleInputChange}
                  required
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                >
                  <option value="">-- choose categoryType --</option>
                  {filteredCategoryTypes.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className=" flex justify-center items-center ">
        <button
          type="submit"
          className="rounded-md bg-[#B9A79C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#754224] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754224]"
        >
          create
        </button>
      </div>
    </div>
  </form>
  )
}

export default AddSubCategory
