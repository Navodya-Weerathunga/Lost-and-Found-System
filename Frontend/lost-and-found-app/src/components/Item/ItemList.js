import React,{useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import UserNavbar from "../Navbar/UserNavbar";
import ItemService from "../../services/ItemService";
import RequestService from "../../services/RequestService";


function ItemList() {
    const [ItemInfo, setItemInfo] = useState([]); 
    const [error, setError] = useState();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        
        fetchItemInfo();
    }, []);

    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length !== 3) return "Invalid Date";
        const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return date.toLocaleDateString(); 
    };

    const handleDeleteClick = (itemId) => {
        const confirmed = window.confirm("Do you want to delete this user?");
    
        if (confirmed) {

            ItemService.deleteItem(itemId, token)
                .then(() => {
                    console.log("Item deleted successfully");
                    fetchItemInfo(); // Refresh the list
                })
                .catch((error) => {
                    console.error('Error deleting item:', error.response?.data || error.message);
                });
        }
    };

    const handleRequestClick = (itemId) => {
        const confirmed = window.confirm("Do you want to make request for this item?");
    
        if (confirmed) {
            const requestData = {
                item: itemId,  // selected item ID
                user: userId,  // user ID
            };
            console.log("RequestData", requestData);

            RequestService.requestItem(requestData, token)
                .then(() => {
                    alert("Request sent successfully");
                    fetchItemInfo(); // Refresh the list
                })
                .catch((error) => {
                    console.error('Error sending request:', error.response?.data || error.message);
                });
        }
    };


    const fetchItemInfo = async () => {
        try {
            const response = await ItemService.getAllItems(token);
            console.log("API Response:", response);
            setItemInfo(response);
           
        } catch (err) {
            console.error("Error fetching item information:", err);
            setError(err.message || "An error occurred.");
        }
    };

    return(
        <div>
            {role === 'ADMIN' && <AdminNavbar></AdminNavbar>}
            {role !== 'ADMIN' && <UserNavbar></UserNavbar>}
        <div className="table">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h1 style={{textAlign: 'center', color: '	#3e3530', marginBottom: '2%', fontWeight: 'bold', marginTop: '2%'}}>Items' Details</h1>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%', marginBottom: '3%'}}>
                <Link to={`/ReportItem/${userId}`}><button style={{
                    backgroundColor: '#2f9eb5ff',
                    borderColor: '#2f9eb5ff',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                    width: '100%',
                    fontSize: 'large'
                }}>Report Item</button></Link>
            </div>

            <div className='col-sm-8 py-2 px-5 offset-2 shadow' id='Body2' style={{width: '85%', marginLeft: '5%', marginRight: '5%'}}>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Item ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Location</th>
                    <th scope="col">Reported Date</th>
                    {role === "ADMIN" && <th scope="col">Reported User</th>}
                    <th scope="col">Status</th>
                </tr>
                </thead>

                <tbody>
                {ItemInfo && ItemInfo.length > 0 ? (
                    ItemInfo.map((item, index) => (
                        <tr key={item.itemId || index}>
                            <td scope="row">{item.itemId}</td>
                                <td>{item.itemName}</td>
                                <td>{item.description}</td>
                                <td>{item.location}</td>
                                <td>{formatDate(item.reportedDate)}</td>
                                {role === "ADMIN" && <td>{item.reportedUser}</td>}
                                <td>{item.status}</td>

                                {role === "ADMIN" &&<td>
                                    <button style={{
                                        backgroundColor: '#FF3F33',
                                        borderColor: '#FF3F33',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}onClick={() => handleDeleteClick(item.itemId)}>Delete</button>                                       
                                </td>}

                                {role !== "ADMIN" && item.status === "FOUND" &&<td>
                                    <button style={{
                                        backgroundColor: 'cadetblue',
                                        borderColor: 'cadetblue',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}  
                                    onClick={() => handleRequestClick(item.itemId)}>Request</button>                                       
                                </td>}
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                                No Items Found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}

export default ItemList;