import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

function UserLogin () {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log('Form submitted'); // Add this line for debugging

        try {
            const userData = await UserService.login(email, password);
            if(userData.role === "ADMIN"){
                navigate("/AdminHome");
                localStorage.setItem("userId", userData.userId); 
                localStorage.setItem("email", userData.email);
                localStorage.setItem("token", userData.token);
                localStorage.setItem("role", userData.role);
                localStorage.setItem("isLogin", userData.isLogin);
            }
            else if(userData.role === "USER" || userData.role === "STAFF"){
                navigate("/Home"); 
                localStorage.setItem("userId", userData.userId); 
                localStorage.setItem("email", userData.email);
                localStorage.setItem("token", userData.token);
                localStorage.setItem("role", userData.role);
                localStorage.setItem("isLogin", userData.isLogin);
            }
            else{
                alert("Invalid user type")
            }
                
        } 
        
        catch (err) {
            console.error(err);
            setError(err.message); 
            alert(err.message); 
        }
        
    };
        

return(
    <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card text-dark" style={{backgroundColor: '#cee4f1ff'}}>
                    <div className="card-body p-5 text-center" >
  
                        <div className="mb-md-5 mt-md-4 pb-5">
                            <form onSubmit={handleSubmit} >
                                <h2 className="fw-bold mb-2 text-uppercase">User Login</h2><br></br>
                                <p className="text-black-70 mb-5">Please enter your Email and Password!</p>
  
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <input type="email" id="typeEmail" className="form-control form-control-lg" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
  
                                <div data-mdb-input-init className="form-outline form-white mb-4">
                                    <input type="password" id="typePassword" className="form-control form-control-lg" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>
  
                                <p className="small mb-7 pb-lg-2" ><a className="text-black-80" href="UserRegistration" style={{fontSize: 'large'}}>Sign Up</a></p>
  
                                <button data-mdb-button-init data-mdb-ripple-init className="button" type="submit" style={{
                                    backgroundColor:'cadetblue', 
                                    fontSize: 'large', 
                                    width:'40%',
                                    borderRadius: '10px',
                                    borderColor: 'cadetblue',
                                    padding:'1.5%',
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>Log In</button>
  
                            </form>

                        </div>
  
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>  
);
}

export default UserLogin;