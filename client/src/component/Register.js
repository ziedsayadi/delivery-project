import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }
  return <div>
   <div className="container ">
    <div className="d-flex justify-content-center">
      <div className="card h-100">
        <div className="card-header ">
          <h3 className ='text-center'>Create you account</h3>
       
          <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={submitHandler} >
          <div className="input-group form-group mt-4">
              <div className="input-group-prepend ml-5">
                <span className="input-group-text"><i className="fas fa-user ml-3"></i></span>
              </div>
              
              <input type="name" name="name" placeholder='enter your name' id="name" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="input-group form-group ">
              <div className="input-group-prepend ml-5">
                <span className="input-group-text"><i className="fas fa-envelope ml-3"></i></span>
              </div>
              
              <input type="email" name="email" placeholder='enter your mail' id="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend ml-5" >
                <span className="input-group-text"><i className="fas fa-key ml-3"></i></span>
              </div>
              
          <input type="password" id="password" placeholder='enter your password' name="password" onChange={(e) => setPassword(e.target.value)}/>
         
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend ml-5" >
                <span className="input-group-text"><i className="fas fa-key ml-3"></i></span>
              </div>
              
              <input type="password" id="rePassword" placeholder='verify your password' name="rePassword" onChange={(e) => setRePassword(e.target.value)}/>         
            </div>
          
            <div className="form-group">
              <input type="submit" value="Submit" className="butone btn float-right login_btn btn-block mt-5 p-3"/>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            Already have an account ?
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}  >Login up</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
}
export default RegisterScreen;