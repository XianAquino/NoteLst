import React from 'react';
import CreateGroup from '../components/CreateGroup';

const Groups = () => {
  return(
    <div className='container-fluid'>
      <div className='row'>
        <aside className='side-bar col-md-3 col-lg-3 hidden-sm hidden-xs'>
          <CreateGroup/>
        </aside>
        <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9'>
          test groups
        </div>
      </div>
    </div>
  )
};

export default Groups;
