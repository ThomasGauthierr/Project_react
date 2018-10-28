
import React, { Component } from 'react';

class CustomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type || 'Create',
            name: props.name || '',
            cuisine: props.cuisine || '',
            editID: props.editID || ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCuisine = this.handleChangeCuisine.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeCuisine(event) {
        this.setState({cuisine: event.target.value});
    }

    handleSubmit(event) {
        let url = "http://localhost:8080/api/restaurants";
        console.log
        let data = new FormData();
        data.append("id", this.state.editID);
        data.append("nom", this.state.name);
        data.append("cuisine", this.state.cuisine);


        if (this.state.type === "Edit") {
            alert("Restaurant edited : " + this.state.name);
            if (!this.state.name || !this.state.cuisine) {
                return;
            }

            fetch(url, {
                method: 'PUT',
                body: data
            })
            alert("Restaurant edited : " + this.state.name);
        } else {
            fetch(url, {
                method: 'POST',
                body:data
            });
            alert("Restaurant added : " + this.state.name);
        }
        this.props.hide;
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name :
                </label>
                <input  type="text"
                        value={this.state.name} 
                        onChange={this.handleChangeName} 
                        id="name"
                        name="name"/>
                <label>
                    Cuisine :
                    <input  type="text" 
                            value={this.state.cuisine} 
                            onChange={this.handleChangeCuisine}
                            id="cuisine"
                            name="cusine" />
                </label>
                <input type="submit" value={this.state.type} />  
            </form>
          );
    }
}

export default CustomForm;