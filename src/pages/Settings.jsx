import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Settings = ({children}) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
          <Link to='/settings'>General</Link>
          <Link to='/settings/avatar'>Avatar</Link>
          <Link to='/settings/account'>Account</Link>
        </aside>
        <div>
          {children}
        </div>
      </div>
    </div>  );
};

Settings.propTypes = {
  children: PropTypes.node
};

export default Settings;
