import React, {PropTypes} from 'react';
import { Tabs, Tab } from 'material-ui';

const AuthTabs = ({children, tabIndex, signIn, signUp}) => {
  return(
    <div className='auth-tabs col-xs-12 col-sm-12 col-md-6 col-lg-6'>
      <Tabs initialSelectedIndex={tabIndex}>
        <Tab
          label='Sign In'
          icon={<i className="material-icons">person</i>}
          onActive={signIn}
        >
        {children}
        </Tab>
        <Tab
          label='Sign Up'
          icon={<i className="material-icons">person_add</i>}
          onActive={signUp}
        >
        {children}
        </Tab>
      </Tabs>
    </div>
  )
};

AuthTabs.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  signUp: PropTypes.func,
  signIn: PropTypes.func
}

export default AuthTabs;
