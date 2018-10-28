import React, {Component} from 'react'

import Restaurant from './components/Restaurant';
import CustomForm from './components/CustomForm';

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            showAdd: false,
            showEdit: false,
            editID: "",
            editName: "",
            editCuisine: ""
        }
    }

    componentWillMount() {
        console.log('Component will mount');
        this.getDataFromServer();
    }

    componentWillUnmount() {

    }

    getDataFromServer() {
        console.log('--- GETTING DATA ---');
        fetch('http://localhost:8080/api/restaurants')
            .then(response => {
                return response.json();
            })
            .then(results => {
                let restaurants = [];
                results.data.forEach((el) => {
                    restaurants.push(el);
                }); 
                
                this.setState({
                    restaurants: restaurants
                });

                console.log('Restaurants fetched successfully');
            })
            .catch(err => {
                console.log('Error getting the restaurants: ' + err);                
            });
    }

    removeRestaurant(id,index){
        let url = "http://localhost:8080/api/restaurants/" + id.toString();

        console.log("id : " + id + " | index : " + index)

        fetch(url, {
            method: "DELETE",
        })
        .then((responseJSON) => {
            //console.log("restaurant removed at index : " + index)
            //console.log("Before : " + this.state.restaurants.length)
            this.state.restaurants.splice(index,1)
            //console.log("After : " + this.state.restaurants.length)
            //window.location.reload();
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    showEditFormRestaurant(id, name, cuisine) {
        this.setState({
            showEdit: true,
            editID: id,
            editName: name,
            editCuisine: cuisine
        })
    }

    showCreateFormRestaurant() {
        this.state.showAdd = true;
    }

    hideForms() {
        this.setState({
            showAdd: false,
            showEdit: false
        })
    }

    showForm() {

    }

    search() {

    }

    render() {
        let list = this.state.restaurants.map((el,index) => {
                return <Restaurant
                            name={el.name} 
                            cuisine={el.cuisine}
                            index={index} 
                            edit={this.showEditFormRestaurant.bind(this, el._id, el.name, el.cuisine)}
                            delete={this.removeRestaurant.bind(this, el._id, index)}/>
            }
        );
        
        return (
            <div className="Restaurant">
                <h3>Liste des restaurants: </h3>
                <button type="button" class="btn btn-dark mb-3" id="createButton" onClick={this.showCreateFormRestaurant.bind(this)}>+</button><br/>
                <input
                    type="text"
                    placeholder = "Chercher par nom"
                    ref={(input) => {this.input = input}}
                /><br/><br/>
                <div id="form1">
                    { this.state.showAdd ? <CustomForm type="Create" hide={this.hideForms.bind()}/> : null }
                    { this.state.showEdit ? <CustomForm type="Edit"  hide={this.hideForms.bind()} name={this.state.editName} cuisine={this.state.editCuisine} editID={this.state.editID} /> : null }
                </div><br/>

                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Cuisine</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        );
    }
} 

export default RestaurantsCatalog;