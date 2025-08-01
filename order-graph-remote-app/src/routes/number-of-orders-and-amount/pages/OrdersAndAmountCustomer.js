import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const {Liferay, themeDisplay} = window;


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

class OrdersAndAmountCustomer extends React.Component {
	
	
    constructor(props) {
        super(props)
          this.state = {
            ordersamount: [],
            numberoforders:[]
                  }
          }
     
      componentDidMount(){
        //Get all chart details
		var openOrders=0;
		var pendingOrders=0;
		var processingOrders=0;
		var shippedOrders=0;
		var selectedAccountId = 0;
		var selectedChannelId = 0;
		if (Liferay.CommerceContext) {
			console.log(Liferay.CommerceContext);
			selectedAccountId = Liferay.CommerceContext.account.accountId;
			selectedChannelId = Liferay.CommerceContext.commerceChannelId;
		  } else {
			console.error('The JavaScript Liferay.CommerceContext object not found.');
			//return;
		}
			Liferay.Util.fetch(
	'/o/headless-commerce-delivery-order/v1.0/channels/'+selectedChannelId+"/accounts/"+selectedAccountId+"/placed-orders"
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
	var numberofordersValues = [0,0,0,0,0,0,0,0,0,0,0,0];
	orders.forEach((order) => {
					//var dateStr = JSON.parse(order.orderDate);
					if (order.orderStatusInfo.code !== '2') {
					var date = new Date(order.modifiedDate);
					console.log(date);
					console.log(order.total);
					ordersamountValues[date.getUTCMonth()] = ordersamountValues[date.getUTCMonth()] + order.summary.total;
					numberofordersValues[date.getUTCMonth()] = numberofordersValues[date.getUTCMonth()]+1;
					}
				});
			console.log (ordersamountValues);
			console.log (numberofordersValues);
			this.setState({ordersamount: ordersamountValues});
			this.setState({numberoforders: numberofordersValues});

});
	  }
    
 
  render() {
   
    return (     
            <Line
                data={{
					  labels,
					  datasets: [
						{
						  label: 'Number of Orders',
						  data: this.state.numberoforders,
						  borderColor: 'rgb(255, 99, 132)',
						  backgroundColor: 'rgba(255, 99, 132, 0.5)',
						  yAxisID: 'y',
						},
						{
						  label: 'Total Amount',
						  data: this.state.ordersamount,
						  borderColor: 'rgb(53, 162, 235)',
						  backgroundColor: 'rgba(53, 162, 235, 0.5)',
						  yAxisID: 'y1',
						}
					  ],
					}} 
                options={{
						  responsive: true,
						  interaction: {
							mode: 'index',
							intersect: false,
						  },
						  stacked: false,
						  plugins: {
							title: {
							  display: true,
							  text: 'Number of Placed Orders and Total Amounts',
							},
						  },
						  scales: {
							y: {
							  type: 'linear',
							  display: true,
							  position: 'left',
							},
							y1: {
							  type: 'linear',
							  display: true,
							  position: 'right',
							  grid: {
								drawOnChartArea: false,
							  },
							},
						  },
						}}
                />
)
};
}
export default OrdersAndAmountCustomer;
