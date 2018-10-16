import React, {Component} from 'react'

import Restaurant from './components/Restaurant';

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
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

                console.log('Restaurants fetched successfully: ' + restaurants);
            })
            .catch(err => {
                console.log('Error getting the restaurants: ' + err);                
            });
    }

    removeRestaurant(id, index) {
        console.log("delete : " + index);
        let url = "localhost:8080/api/restaurants/" + id;
 
        fetch(url, {
            method: "DELETE",
        })
        .then(response =>
                response.json().then(json  => {
            this.restaurants.splice(index,1)
            this.filteredrestaurants.splice(index,1)
            this.message = 'Ce restaurant a été supprimé'
            this.showMessage = true
            setTimeout(()=>{
                this.showMessage = false
            },3000)
        })
        .catch(function (err) {
            console.log(err);
        }));
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
                <input
                    type="text"
                    ref={(input) => {this.input = input}}
                />
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Cuisine</th>
                        <th>Actions</th>
                    </tr>
                    {list}
                </table>
            </div>
        );
    }
} 

export default RestaurantsCatalog;