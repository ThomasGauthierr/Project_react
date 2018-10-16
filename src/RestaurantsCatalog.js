import React, {Component} from 'react'

import Restaurant from './components/Restaurant';

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: ['McDonalds', 'Kfc']
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
            .then(data => {
                let restaurants = [];
                data.data.forEach((e1) => {
                    restaurants.push(e1);
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

    render() {
        let list = this.state.restaurants.map(
            (el) => {
                return <Restaurant name={el.name} cuisine={el.name}/>
            }
        );
        
        return (
            <div className="App">
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