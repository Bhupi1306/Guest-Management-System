import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


export default function EntryForm() {

    const navigate = useNavigate()
    const inputClassName = "block mt-1 w-full px-5 py-3 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300";

    useEffect(() => {

             const apiLoad = async (token) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/verify`,{
                  method: "POST",
                  headers: {
                    'content-type':'application/json'
                  },
                body: JSON.stringify({ token })
              });
                const data = await response.json();

                if(!data.success) {
                    console.error("User verification failed:", data.message);
                    navigate("/login");
                }

            } catch (error) {
                console.error("Error fetching visitor data:", error);
                navigate("/login");
            }
        }


        if (localStorage.getItem("token")) {
            apiLoad(localStorage.getItem("token"));
        } else {
            navigate("/login");
        }

   
    }, []);

    const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: "",
    meetWith: "",
    purpose: "",
    inTime: "",
    outTime: ""
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here (e.g., API call)
    };

    return (
        <>
    <Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Visitor Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            // className="w-full mt-1 p-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            // className="block mt-1 w-full px-5 py-3 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            className={inputClassName}
            value={formData.name}
            placeholder="Guest Name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            className={inputClassName}
            value={formData.mobile}
            placeholder="Your Mobile Number"
            pattern="[0-9]{10}"
            onChange={handleChange}
            required
          />
        </div>

        {/* Visitor's City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Visitor's City</label>
          <input
            type="text"
            name="city"
            className={inputClassName}
            value={formData.city}
            placeholder="Visitor's City"
            onChange={handleChange}
            required
          />
        </div>

        {/* Meet With */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Meet With Whom</label>
          <input
            type="text"
            name="meetWith"
            className={inputClassName}
            placeholder="Person to meet"
            value={formData.meetWith}
            onChange={handleChange}
            required
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Purpose</label>
          <input
            type="text"
            name="purpose"
            className={inputClassName}
            value={formData.purpose}
            placeholder="Purpose of Visit"
            onChange={handleChange}
            required
          />
        </div>

        {/* Timing */}
        <div>
          <label className="block text-sm font-medium text-gray-700">In Time</label>
          <input
            type="text"
            name="inTime"
            className={inputClassName}
            value={formData.inTime}
            placeholder="In Time"
            onChange={handleChange}
            required
          />
        </div>

        {/* Timing */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Out Time</label>
          <input
            type="text"
            name="outTime"
            className={inputClassName}
            value={formData.outTime}
            placeholder="Out Time"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
}
