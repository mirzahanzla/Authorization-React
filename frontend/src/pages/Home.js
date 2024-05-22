import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(response.data.email);
        setPassword(response.data.password);
      } catch (error) {
        console.log(error);
        setEmail("Error fetching data");
        setPassword("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default Home;
