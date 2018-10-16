
import React, { Component } from 'react';

 function Restaurant(props) {
   
     return (
         <tr>
         <td>{props.name}</td>
         <td>{props.cuisine}</td>
         <td>
            <button class="btn btn-dark">Edit</button>
            <button class="btn btn-dark">Delete</button>
         </td>
         </tr>
     );
   }
 
   export default Restaurant;