import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const {Liferay, themeDisplay} = window;


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

class ShipmentsAmount extends React.Component {
	
	
    constructor(props) {
        super(props)
          this.state = {
            ordersamount: []
                  }
          }
     
      componentDidMount(){
        //Get all chart details
			Liferay.Util.fetch(
	'/o/headless-commerce-admin-order/v1.0/orders'
).then(
	response => {
		const {status} = response;

		const responseContentType = response.headers.get('content-type');

		if (status === 204) {
			return {status};
		}
		else if (response.ok && responseContentType === 'application/json') {
			return response.json();
		}
		else {
			return response.text();
		}
	}
).then(response => {
	console.log('response', response);
	const orders = response.items;
	var ordersamountValues = [0,0,0,0,0,0,0,0,0,0,0,0];
	orders.forEach((order) => {
					if (order.orderStatus != '2') {
					var date = new Date(order.orderDate);
					console.log(date);
					ordersamountValues[date.getUTCMonth()] = ordersamountValues[date.getUTCMonth()] + order.totalAmount;
					}
				});
			console.log (ordersamountValues);
			this.setState({ordersamount: ordersamountValues});

});
	  }
    
 
  render() {
   
    return (     
            <Bar
                data={{
					  labels,
					  datasets: [
						{
						  label: 'Total Amount in Placed Orders',
						  data: this.state.ordersamount,
						  backgroundColor: 'rgb(75, 192, 192)',
						}
					  ],
					}}
                options={{
						  plugins: {
							title: {
							  display: true,
							  text: 'Orders - Total Amount',
							},
						  },
						  responsive: true,
						  scales: {
							x: {
							  stacked: true,
							},
							y: {
							  stacked: true,
							},
						  },
						}}
                />
)
};
}
export default ShipmentsAmount;
