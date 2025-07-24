import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

function UserRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        password: '',
        role: '',
    });

    const token = localStorage.getItem("token");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await UserService.register(formData, token);

            setFormData({
                name: '',
                email: '',
                department: '',
                password: '',
                role: '',
            });

            alert("User Registered Successfully");
            navigate('/');
        } catch (error) {
            console.error('Error Registering User: ', error);
            alert("An Error Occurred While Registering User");
        }
    };

return (
    <div className='Body1' style={{marginTop: '5%'}}>
        <div className='col-sm-5 py-2 px-5 offset-3 shadow' id='Body2'>
            <h1 className="heading" style={{ textAlign: 'center', color: '#618cd2ff' }}>User Registration Form</h1><br />
            <form onSubmit={handleSubmit}>
                <div>

                    <div className="row">
                        <div className="input-group mb-5">
                            <label htmlFor="name" className="input-group-text">Full Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-5">
                            <select id="department" className="form-select" name="department" value={formData.department} onChange={handleInputChange} required>
                                <option value="" disabled>Department</option>
                                <option value="Administrative">Administrative</option>
                                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                                <option value="Bio Medical Science">Bio Medical Science</option>
                                <option value="Technology">Technology</option>
                                <option value="Computer Science & Engineering">Management</option>
                                </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-5">
                                <label htmlFor="email" className="input-group-text">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-5">
                                <label htmlFor="password" className="input-group-text">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required/>
                            </div>
                        </div>

                        <div className="col">
                            <div className="input-group mb-5">
                                <select id="role" className="form-select" name="role" value={formData.role} onChange={handleInputChange} required>
                                    <option value="" disabled>Role</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="STAFF">STAFF</option>
                                    <option value="USER">USER</option>
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
                    Register
                    </button>
                </div>

            </div>
        </form>
    </div>
    </div>
  );
}

export default UserRegistration;