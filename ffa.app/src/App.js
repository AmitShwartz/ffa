import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        data:[]
    };
    this.add=this.add.bind(this);
}

add(item) {
    this.setState(prevState => ({
      data: [
      ...prevState.data,
      {
          academy: item._id,
          totalValue: item.totalValue
      }]
    }));
  }

  componentWillMount(){
    fetch("http://localhost:3000/getAllPlayers")
    .then((res)=> res.json())
    .then((data)=>{
      var self=this;
      console.log(data);
      data.map((data) => {
        self.add(data);
      });
  })
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.props.state.data}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
