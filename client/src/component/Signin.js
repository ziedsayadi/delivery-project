import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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
    dispatch(signin(email, password));

  }
  return <div classNameName = "signup-cont">
   <div className="container ">
    <div className="d-flex justify-content-center">
      <div className="card">
        <div className="card-header ">
          <h3 className ='text-center'>Sign In</h3>
       
          <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={submitHandler} >
            <div className="input-group form-group mt-4">
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
            <div className="row align-items-center remember ml-4">
              <input type="checkbox"/>Remember Me
            </div>
            <div className="form-group">
              <input type="submit" value="Login" className="butone btn float-right login_btn btn-block mt-5 p-3"/>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            Dont have an account ?
            <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} >Create your account</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
}
export default SigninScreen;