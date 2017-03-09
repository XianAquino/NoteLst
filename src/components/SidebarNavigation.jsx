import React from 'react';
import Drawer from 'material-ui/Drawer';
import UserSearch from '../components/UserSearch';
import ProgressMeter from '../components/ProgressMeter';
import TaskChart from '../components/TaskChart';

const SidebarNavigation = ({openDrawer, handleNavigationToggle}) => {
  let content = null;
  const location = window.location.pathname;
  if (location === '/') {
    content = (
      <div>
        <ProgressMeter />
        <TaskChart />
      </div>
    )
  } else if (location.slice(0, 9) === '/messages') {
    content = (
      <UserSearch/>
    )
  }

  return(
    <div>
      <Drawer width={300} open={openDrawer}>
        <p onClick={()=>{handleNavigationToggle()}}>Close</p>
        {content}
      </Drawer>
    </div>
  )
}


export default SidebarNavigation;
