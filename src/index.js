import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RestaurantsCatalog from './RestaurantsCatalog';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RestaurantsCatalog />, document.getElementById('root'));

registerServiceWorker();
