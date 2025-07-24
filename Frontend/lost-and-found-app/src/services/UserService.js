import axios from "axios";

class UserService{

    static async register(formData) {
        try {
            console.log("Sending Data:", formData);

            const response = await axios.post(`http://localhost:8080/LostAndFoundSystem/User/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return response.data;
        } catch (err) {
            console.error("Error Registering User:", err.response?.data || err.message);
            throw err;
        }
    }

    static async login(email, password) {

        try {
            const response = await axios.post("http://localhost:8080/LostAndFoundSystem/User/login", { email, password });

            if (response.data.isLogin) {
                return response.data;
            } else {
                throw new Error(response.data.message || "Invalid credentials"); 
        }
        } catch (err) {
            throw err;
        }
    }

    static async getAllUsers(token){
        try {
            const response = await axios.get(`http://localhost:8080/LostAndFoundSystem/User/admin`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        } catch (err) {
            throw err;
        }
    };

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`http://localhost:8080/LostAndFoundSystem/User/admin/${userId}`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        }

        catch(err){
            throw err;
        }
    }

    static async profile(userId, token) {
        try {
            const response = await axios.get(`http://localhost:8080/LostAndFoundSystem/User/adminUserStaff/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}


export default UserService;
