import axios from "axios";

class ItemService{

    static async reportItem(formData, userId, token) {
        try {
            const response = await axios.post(`http://localhost:8080/LostAndFoundSystem/Item/adminUserStaff/${userId}`, formData, 
                {
                    headers: { Authorization: `Bearer ${token}`}
                });

            return response.data;
        } catch (err) {
            console.error("Error Reporting Item:", err.response?.data || err.message);
            throw err;
        }
    }

    static async getAllItems(token){
        try {
            const response = await axios.get(`http://localhost:8080/LostAndFoundSystem/Item/adminUserStaff`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        } catch (err) {
            throw err;
        }
    };

    static async deleteItem(itemId, token){
        try{
            const response = await axios.delete(`http://localhost:8080/LostAndFoundSystem/Item/admin/${itemId}`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        }

        catch(err){
            throw err;
        }
    }

}

export default ItemService;
