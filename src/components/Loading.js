import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';


const Loading = () => (
  <div style={muiStyle.container}>
    <h1>Loading</h1>
    <LinearProgress style={muiStyle.progess} mode='indeterminate' />
  </div>
);

const muiStyle = {
  progess: {
    width: 300,
    margin: '10px auto'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    height: '100vh',
    paddingTop: '40vh',
    textAlign: 'center',
    color: '#008A7D'
  },
};

export default Loading;
