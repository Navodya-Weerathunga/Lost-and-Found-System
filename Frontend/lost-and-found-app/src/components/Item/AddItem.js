import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemService from "../../services/ItemService";

function AddItem() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        location: '',
        status: '',
    });

    const { userId } = useParams();
    const token = localStorage.getItem("token");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await ItemService.reportItem(formData, userId, token);

            setFormData({
                itemName: '',
                description: '',
                location: '',
                status: '',
            });

            alert("Item Reported Successfully");
            navigate('/ItemList');
        } catch (error) {
            console.error('Error Reporting Item: ', error);
            alert("An Error Occurred While Reporting Item");
        }
    };

return (
    <div className='Body1' style={{marginTop: '5%'}}>
        <div className='col-sm-5 py-2 px-5 offset-3 shadow' id='Body2'>
            <h1 className="heading" style={{ textAlign: 'center', color: '#618cd2ff' }}>Lost & Found Form</h1><br />
            <form onSubmit={handleSubmit}>
                <div>

                    <div className="row">
                        <div className="input-group mb-5">
                            <label htmlFor="itemName" className="input-group-text">Item Name</label>
                            <input type="text" className="form-control" id="itemName" name="itemName" value={formData.itemName} onChange={handleInputChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-5">
                                <label htmlFor="description" className="input-group-text">Description</label>
                                <input type="textArea" className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-5">
                                <label htmlFor="location" className="input-group-text">Location</label>
                                <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleInputChange}/>
                            </div>
                        </div>

                        <div className="col">
                            <div className="input-group mb-5">
                                <select id="status" className="form-select" name="status" value={formData.status} onChange={handleInputChange} required>
                                    <option value="" disabled>Item Status</option>
                                    <option value="LOST">LOST</option>
                                    <option value="FOUND">FOUND</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>

                <div className="input-group mb-5" style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="button1"
                        style={{
                            backgroundColor: 'cadetblue',
                            borderColor: 'cadetblue',
                            fontSize: 'large',
                            width: '25%',
                            padding: '1%',
                            borderRadius: '10px',
                            color: 'black',
                            fontWeight: 'bold'
                        }}>
                    Report
                    </button>
                </div>

            </div>
        </form>
    </div>
    </div>
  );
}

export default AddItem;