import React from 'react';

const Description = () => {
  return (
    <div className='notelst-description col-md-6 col-lg-6 hidden-xs hidden-sm'>
      <img src='/logo-full.svg' alt='notelst'/>
      <div className='short-desc'>
        <p><i className="material-icons">insert_chart</i>Track your tasks</p>
        <p><i className="material-icons">chat</i>Connect with other people</p>
        <p><i className="material-icons">share</i>Share notes with your group</p>
      </div>
    </div>
  )
};

export default Description;
