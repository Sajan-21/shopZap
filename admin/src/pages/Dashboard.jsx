import React, { useEffect, useState } from 'react'
import Sidebar from '../components/ui-components/Sidebar'
import Navbar from '../components/ui-components/Navbar'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faShoppingBag, faUserGroup, faUsers, faUserTie, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import GetAllProducts from '../components/functional-components/GetAllProducts'
import GetUsers from '../components/functional-components/GetUsers'
import GetOrders from '../components/functional-components/GetOrders'

function Dashboard() {

  const params = useParams();

  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] =useState([]);
  const [staffs, setStaffs] = useState([]);
  const [orders, setOrders] = useState([]);

  const authId = params.authId;
  const subCategory = "null";
  const category = "null";

  const token = localStorage.getItem(authId);

  useEffect(() => {
    const fetchProducts = async function() {
      let response = await GetAllProducts(authId, category, subCategory);
      setProducts(response)
    };
    fetchProducts();
  }, [authId, category, subCategory]);

  useEffect(() => {
    const fetchUsers = async function() {
      let response = await GetUsers(token);

      const sellerList = response.filter(user => user.role === "Seller");
      let userList = response.filter(user => user.role === "Seller") || response.filter(user => user.role === "Buyer");
      const staffList = response.filter(user => user.role === "Staff");

      setSellers(sellerList);
      setStaffs(staffList);
      setUsers(userList);
    }
    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchOrdersList = async() => {
      let response = await GetOrders(token);
      setOrders(response);
    }
    fetchOrdersList();
  }, [token]);

  return (
    <div>
        <div className="flex font-serif">
            <div className="flex-none max-md:hidden"> <Sidebar authId = {params.authId} /> </div>
            <div className="grow">
               <Navbar authId = {params.authId} />
               <div className='p-5 bg-slate-200'>
                  <div className='border border-slate-400 rounded-2xl p-5 space-y-5 bg-white'>
                    <h1 className='text-3xl font-serif'>Short Analysis</h1>
                    <div className='grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                      <div className="bg-blue-100 rounded-lg p-5 flex flex-col gap-3">
                        <h1 className='text-2xl font-extrabold flex items-center gap-3 font-sans'><FontAwesomeIcon icon={faShoppingBag} />PRODUCTS  </h1>
                        <p>{products.length} live products</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-5 flex flex-col gap-3">
                        <h1 className='text-2xl font-extrabold flex items-center gap-3 font-sans'><FontAwesomeIcon icon={faCheckCircle} />ORDERS  </h1>
                        <p>{orders.length} trades</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-5 flex flex-col gap-3">
                        <h1 className='text-2xl font-extrabold flex items-center gap-3 font-sans'><FontAwesomeIcon icon={faUsers} />USERS  </h1>
                        <p>{users.length} live users</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-5 flex flex-col gap-3">
                        <h1 className='text-2xl font-extrabold flex items-center gap-3 font-sans'><FontAwesomeIcon icon={faUserTie} />STAFFS  </h1>
                        <p>{staffs.length} Staffs working under different section</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-5 flex flex-col gap-3">
                        <h1 className='text-2xl font-extrabold flex items-center gap-3 font-sans'><FontAwesomeIcon icon={faUserGroup} />SELLERS  </h1>
                        <p>{sellers.length} total live sellers</p>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-5 flex flex-col gap-3">
                        <h1 className='text-2xl font-extrabold flex items-center gap-3 font-sans'><FontAwesomeIcon icon={faCalendarDays} /> CURRENT EVENTS </h1>
                        <p>big billion days</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
