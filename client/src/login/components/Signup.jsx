import React from 'react';

var Signup = () => (
	  <div className="wrapper">
	    <form className="form-signin" method="post" action="/signup">       
	      <h2 className="form-signin-heading">Register</h2>
	      <input type="text" className="form-control" name="username" placeholder="User Name" required=""/>
	      <input type="password" className="form-control" name="password" placeholder="Password" required=""/>      
	      <button className="btn btn-lg btn-primary btn-block" type="submit">Signup</button>   
	    </form>
	  </div>
	);

export default Signup;