import React from 'react';

var Login = () => (
	  <div className="wrapper">
	    <form className="form-signin" method="post" action="/login">       
	      <h2 className="form-signin-heading">Please login</h2>
	      <input type="text" className="form-control" name="username" placeholder="User Name" required=""/>
	      <input type="password" className="form-control" name="password" placeholder="Password" required=""/>      
	      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
	      <p className="message">Not registered? <a href="#/signup">Create an account</a></p>
	    </form>
	  </div>
	);

export default Login;