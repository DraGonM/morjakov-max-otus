import React, { Component } from 'react'
import CitiesList from './components/CitiesList'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './App.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
              <Typography variant="h5" color="inherit">
                  Weather
              </Typography>
          </Toolbar>
        </AppBar>
        <CitiesList />
      </div>
    );
  }
}

export default App;
