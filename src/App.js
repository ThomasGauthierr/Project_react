import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import User from './components/User';
import Hobby from './components/Hobby';

class App extends Component {
  constructor(props) {
		super(props);
		   
		this.state = {
			hobbies:['tennis', 'foot'],
		}
	}
	
  addHobby() {
		let oldHobbies = this.state.hobbies;
		this.setState({
			hobbies: oldHobbies.concat(this.input.value)
    });
    
    this.input.value = "";
  }
  
  removeHobby(hobby) {
		/*
		let oldHobbies = this.state.hobbies;
		let pos = this.state.hobbies.indexOf(hobby);
		oldHobbies.splice(pos, 1);
		*/
	const oldHobbies = this.state.hobbies.filter(
      (elem, index) => {
        return (elem !== hobby) ? elem : null;
      }
    );	
		
		this.setState({
			hobbies: oldHobbies
		});
	}
  getDataFromServer() {
    console.log("--- GETTING DATA ---");
     fetch('https://jsonplaceholder.typicode.com/todos')
     .then(response => {
       return response.json(); // transforme le json texte en objet js
     })
     .then(data => { // data c'est le texte json de response ci-dessus
       let newHobbies = [];
       data.forEach((el) => {
         newHobbies.push(el.title);
       });

       this.setState({
        hobbies: newHobbies
      });
       
     }).catch(err => {
       console.log("erreur dans le get : " + err)
     });

  }

  componentWillMount() {
    console.log("Component will mount");
    // on va chercher des donnees sur le Web avec fetch, comme
    // on a fait avec VueJS
    this.getDataFromServer();
  }
     
  render() {
    console.log("render");
    let list = this.state.hobbies.map(
			(el) => {
				return <li onClick={() => this.removeHobby(el)} key={el}>{el}</li>
			}
    );
    
    let listAvecComponent = 
				this.state.hobbies.map((el, index) => {
				return <Hobby 
								 name={el}
								 key={index} 
                 removeHobby={this.removeHobby.bind(this)} 
								 />
			}
    );
    
    return (
      <div className="App">
        <h3>Liste des Hobbies :</h3>
        <input 
					type="text" 
					ref={(input) => this.input = input}
					
					/>
				<button onClick={() => this.addHobby()}>Add Hobby</button>
        <p style={{color: (this.state.hobbies.length < 5) ? 'green' : 'red'}}>
            Nombre de Hobbies : {this.state.hobbies.length}
        </p>
        <ul>
          {listAvecComponent}
        </ul>
        
        <p>Un composant User ci-dessous:</p>
        <User name="Michel Buffa"/>
        <User name="Gabriel Mopolo"/>
      </div>
    );
  }
}

export default App;
