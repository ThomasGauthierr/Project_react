import React, {Component} from 'react'

import Restaurant from './components/Restaurant';
import CustomForm from './components/CustomForm';

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            showAdd: false,
            showUpdate: false,
            updateName: "titi",
            updateCuisine: "tutu"
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
        let url = "http://localhost:8080/api/restaurants/" + id;

        console.log("id : " + id + " | index : " + index)

        fetch(url, {
            method: "DELETE",
        })
        .then((responseJSON) => {
            this.state.restaurants.splice(index,1)
            this.message = 'Ce restaurant a été supprimé'
            this.showMessage = true
            setTimeout(()=>{
                this.showMessage = false
            },3000)
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    showForm() {

    }

    search() {

    }

    render() {
        let list = this.state.restaurants.map((el,index) => {
                return <Restaurant name={el.name} cuisine={el.cuisine} 
                index={index} delete={this.removeRestaurant.bind(el._id, index)}/>
            }
        );
        
        return (
            <div className="Restaurant">
                <h3>Liste des restaurants: </h3>
                <button type="button" class="btn btn-dark mb-3" id="createButton" onClick="#">+</button><br/>
                <input
                    type="text"
                    placeholder = "Chercher par nom"
                    ref={(input) => {this.input = input}}
                /><br/><br/>
                <div id="form1">
                    { this.state.showAdd ? <CustomForm type="Create"/> : null }
                    { this.state.showAdd ? <CustomForm type="Update" name={this.state.updateName} cuisine={this.state.updateCuisine}/> : null }
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