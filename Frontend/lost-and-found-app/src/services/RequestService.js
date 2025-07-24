import axios from "axios";

class RequestService{

    static async getAllRequests(token){
        try {
            const response = await axios.get(`http://localhost:8080/LostAndFoundSystem/Request/admin`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        } catch (err) {
            throw err;
        }
    };

    static async approveRequest(requestId, token){
        try{
            const response = await axios.put(`http://localhost:8080/LostAndFoundSystem/Request/admin/${requestId}`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        }

        catch(err){
            throw err;
        }
    }

    static async rejectRequest(requestId, token){
        try{
            const response = await axios.put(`http://localhost:8080/LostAndFoundSystem/Request/admin/reject/${requestId}`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        }

        catch(err){
            throw err;
        }
    }

    static async requestItem(requestData, token){
        try{
            const response = await axios.post(`http://localhost:8080/LostAndFoundSystem/Request/adminUserStaff`, requestData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data;
        }

        catch (err) {
            console.error("Error Requesting Item:", err.response?.data || err.message);
            throw err;
        }
    }

}

export default RequestService;
