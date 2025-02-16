import React, { useEffect, useState } from "react";
import Sidebar from "../../components/ui-components/sidebar/Sidebar";
import GetAllProducts from "../../components/functional-components/GetAllProducts";
import { useParams } from "react-router-dom";
import GetUsers from "../../components/functional-components/GetUsers";
import Navbar from "../../components/ui-components/Navbar";

function Dashboard() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const authId = params.authId;
  const role = "Admin";
  const category = "null";
  const subCategory = "null";

  useEffect(() => {
    const fetchProducts = async () => {
      let response = await GetAllProducts(authId, role, category, subCategory);
      setProducts(response);
    }
    fetchProducts();
  },[authId, role, category, subCategory]);

  console.log("products : ",products);

  let token = localStorage.getItem(authId);

  useEffect(() => {
    const fetchUsers = async () => {
      let response = await GetUsers(token);
      setUsers(response);
    }
    fetchUsers();
  },[token]);

  console.log("users : ",users);

  return (
    <div className="bg-slate-300 flex">
      <Sidebar />
      <div className="w-full overflow-auto">
        <Navbar />
        <div className="p-10">
          <div class="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 justify-center items-center">
            <div class="border rounded-xl p-3">Orders</div>
            <div class="border rounded-xl p-3">Profit</div>
            <div class="border rounded-xl p-3">Costomers</div>
            <div class="border rounded-xl p-3">Sellers</div>
            <div class="border rounded-xl p-3">Products</div>
            <div class="border rounded-xl p-3">Staffs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
