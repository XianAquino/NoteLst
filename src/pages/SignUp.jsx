import React from 'react';

const SignUp = () => {
  return(
    <div className='SignUp'>
      <h1>Sign Up</h1>
      <form>
        <label>Username:</label>
        <input type='text' />
        <label>Password:</label>
        <input type='password' />
        <label>Email:</label>
        <input type='text' />
        <label>Gender:</label>
        <input type='radio' name='gender' value='male'/>Male
        <input type='radio' name='gender' value='female'/>Female
        <input type='submit'/>
      </form>
    </div>
  );
};

export default SignUp;
