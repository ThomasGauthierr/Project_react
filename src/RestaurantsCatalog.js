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
            editCuisine: "",
            displayNumber: 10,
            currentPage: 0,
            elementCount: null,
            cRestaurants: null
        }

        this.handleChangeDisplayNumber = this.handleChangeDisplayNumber.bind(this);
        this.handleChangeEditID = this.handleChangeEditID.bind(this);
        this.handleChangeEditCuisine = this.handleChangeEditCuisine.bind(this);
    }

    componentWillMount() {
        console.log('Component will mount');
        this.countRestaurants();
        this.getDataFromServer();
    }

    componentWillUnmount() {

    }

    countRestaurants(){
        let url = "http://localhost:8080/api/restaurants/count";
        fetch(url)
            .then(response => {
                response.json().then(res=>{
                    let nb = Math.ceil(res.data / this.state.displayNumber);
                    this.setState({
                        elementCount: res.data,
                        cRestaurants: nb
                    });
                    //console.log("nb : " + this.state.elementCount)
                    //console.log("nb pages : " + this.state.cRestaurants)
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    getDataFromServer() {
        console.log('--- GETTING DATA ---');
        fetch('http://localhost:8080/api/restaurants?page='+this.state.currentPage+'&pagesize='+this.state.displayNumber)
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
            this.getDataFromServer();
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    showCreateFormRestaurant() {
        this.hideEditFormRestaurant();

        document.querySelector('#form1').hidden = false;
        this.setState({
            showAdd: true
        })
    }

    showEditFormRestaurant(id, name, cuisine) {
        this.hideCreateFormRestaurant();

        document.querySelector('#form2').hidden = false;

        this.setState({
            showEdit: true,
            editID: id,
            editName: name,
            editCuisine: cuisine
        })
    }

    hideCreateFormRestaurant() {
        document.querySelector('#form1').hidden = true;
        this.setState({
            showAdd: false
        })
    }

    hideEditFormRestaurant() {
        document.querySelector('#form2').hidden = true;

        this.setState({
            showEdit: false,
            editID: null,
            editName: null,
            editCuisine: null
        })
    }
    

    hideForms() {
        document.querySelector('#form1').hidden = false;
        document.querySelector('#form2').hidden = false;

        this.setState({
            showAdd: false,
            showEdit: false
        })
    }

    navigate(element) {
        let cnumber = parseInt(element.target.innerHTML)-1;

        this.setState({
            currentPage: cnumber
        })

        this.countRestaurants();

        let url = '/api/restaurants?page='+this.state.currentPage+'&pagesize='+this.state.displayNumber
        this.getDataFromServer(url)

        if(element.target.id === 'thirdButton' || element.target.id === 'firstButton'){
            if(this.state.currentPage === 0 || this.state.currentPage === Math.ceil(this.state.elementCount/this.state.displayNumber)){
                console.log('exit')
                return;
            }
            console.log('changing')
            document.querySelector('#firstButton').innerHTML = cnumber;
            document.querySelector('#secondButton').innerHTML = cnumber+1;
            document.querySelector('#thirdButton').innerHTML = cnumber + 2;
        }
    }

    handleChangeDisplayNumber(event) {
        this.setState({
            displayNumber: event.target.value
        });

        //console.log(event.target.value)
        let url = '/api/restaurants?page='+this.state.currentPage+'&pagesize='+event.target.value
        this.getDataFromServer(url)
        //console.log(this.state.displayNumber);        
    }

    handleChangeEditID(event) {
        this.setState({
            editID: event.target.value
        })
    }

    handleChangeEditCuisine(event) {
        this.setState({
            editCuisine: event.target.value
        })
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

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="elementPageDropDown">Elements par page</label>
                    </div>
                    <select value={this.state.displayNumber} class="custom-select" id="elementPageDropDown" onChange={this.handleChangeDisplayNumber}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div id="form1" hidden="true">
                { this.state.showAdd ? <CustomForm type="Create" hide={this.hideCreateFormRestaurant.bind(this)} reload={this.getDataFromServer.bind(this)}/> : null }                
                </div>
                <div id="form2" hidden="true">
                { this.state.showEdit ? <CustomForm type="Edit"  hide={this.hideEditFormRestaurant.bind(this)} reload={this.getDataFromServer.bind(this)} name={this.state.editName} cuisine={this.state.editCuisine} editID={this.state.editID} /> : null }
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

                <div class="navigation">
                    <button type="button" class="btn btn-dark" id="firstButton" onClick={(e) => this.navigate(e)}>1</button>
                    <button type="button" class="btn btn-dark" id="secondButton" onClick={(e) => this.navigate(e)}>2</button>
                    <button type="button" class="btn btn-dark" id="thirdButton" onClick={(e) => this.navigate(e)}>3</button>
                    ............
                    <button type="button" class="btn btn-dark" id="lastPageButton" onClick={(e) => this.navigate(e)} > {this.state.cRestaurants} </button>
                </div>

            </div>

        );
    }
} 

export default RestaurantsCatalog;