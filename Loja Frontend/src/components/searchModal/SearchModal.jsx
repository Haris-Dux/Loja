import React from "react";
import "./SearchModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalVisible,
  setModalData,
  setIsSearchModal,
} from "../../features/Modal";

const SearchModal = () => {
  const data = useSelector((state) => state.product.data);
  const searchData = useSelector((state) => state.product.searchData);
  const dispatch = useDispatch();
  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
    dispatch(setIsSearchModal(false));
  };

  const datas = data.filter((ele) => {
    if (searchData.length === 0) {
      return ele;
    } else {
      return ele.name.toLowerCase().includes(searchData.toLowerCase());
    }
  });
  console.log(datas);
  return (
    <div>
      <div className="searchModal">
        <h2>Search Product</h2>
        <div className="body">
          {datas.length > 0
            ? datas.map((ele) => {
                return (
                  <>
                    <div
                      className="card"
                      onClick={() => {
                        viewModalHandler(ele);
                      }}
                    >
                      <img src={ele.image.secure_url} alt="" />
                      <div className="card-body">
                        <div className="title-description">
                          <h4>{ele.name}</h4>
                          <p>{ele.description.slice(0, 40)}...</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : "No Product Match"}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
