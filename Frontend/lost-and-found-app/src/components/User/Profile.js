import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";

function UserProfile() {
    const { userId } = useParams();
    const token = localStorage.getItem('token');

    const [details, setDetails] = useState({
        name: '',
        email: '',
        department: '',
        role: '',   
        registeredDate: '',   
    });
    const [error, setError] = useState('');


    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    const fetchUserDetails = async () => {
        try {
            const response = await UserService.profile(userId, token)
            console.log("API Response:", response);
    
            if (response) {
                setDetails({
                    name: response.name,
                    email: response.email,
                    department: response.department,
                    role: response.role,
                    registeredDate: response.registeredDate,
                });
            } else {
                setError('Empty or invalid response');
            }
        } catch (error) {
            setError('Failed to fetch data');
            console.error('Fetch error:', error);
        }

    };

    
return (
    <div className='Body1' style={{marginTop: '5%'}}>
        <div className='col-sm-5 py-2 px-5 offset-3 shadow' id='Body2'>
            <h1 className="heading" style={{ textAlign: 'center', color: '#618cd2ff' }}>User Profile</h1><br />
            <form>
                <div>

                    <div className="row">
                        <div className="input-group mb-5">
                            <label htmlFor="name" className="input-group-text">Full Name</label>
                            <input type="text" className="form-control" id="name"  value={details.name} readOnly/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-5">
                            <label htmlFor="department" className="input-group-text">Department</label>
                            <input type="text" className="form-control" id="department" name="department" value={details.department} readOnly/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-5">
                                <label htmlFor="email" className="input-group-text">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={details.email} readOnly/>
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-5">
                                <label htmlFor="role" className="input-group-text">User Type</label>
                                <input type="text" className="form-control" id="role" name="role" value={details.role} readOnly/>
                            </div>
                        </div>

                        <div className="col">
                            <div className="input-group mb-5">
                                <label htmlFor="registeredDate" className="input-group-text">Registered Date</label>
                                <input type="text" className="form-control" id="registeredDate" name="registeredDate" value={details.registeredDate} readOnly/>
                            </div>
                        </div>
                    </div>
            </div>
        </form>
    </div>
    </div>
  );
}

export default UserProfile;