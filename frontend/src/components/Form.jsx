import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method == "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        console.log("creds",res)

           // Step 3: Retrieve user info using the access token
           const userInfoRes = await api.get("/api/user-info/", {
            headers: {
              Authorization: `Bearer ${res.data.access}`,
            },
          });
  
          // Step 4: Log the user info to the console or save it
          console.log("User Info:", userInfoRes.data);
  

          if(userInfoRes.data.is_superuser == true){
            navigate("/admin");
          }
          else{
            navigate("/");
          }
       
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container bg-gray-900 border border-gray-800 w-full">
      <h1 className="font-bold text-2xl mb-4">{name}</h1>
      <input
        type="text"
        className="w-full border border-gray-800 bg-gray-950"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="w-full border border-gray-800 bg-gray-950"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password  "
      />

      {loading && <LoadingIndicator/>}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;
