import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User LoggedOut !!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/auth/product/products";
      const resp = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const res = await resp.json();
      const { success, data, message } = res;
      if (success) {
        setProducts(data);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products?.map(({ _id: id, name, price }) => (
          <ul key={id}>
            <span>
              {name} : {price}
            </span>
          </ul>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
