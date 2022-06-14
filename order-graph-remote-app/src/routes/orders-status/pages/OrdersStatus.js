import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const {Liferay, themeDisplay} = window;


class OrdersStatus extends React.Component {
    constructor(props) {
        super(props)
          this.state = {
            orderstatus: [],
            numberoforders:[]
                  }
          }
     
      componentDidMount(){
        //Get all chart details
		var openOrders=0;
		var pendingOrders=0;
		var processingOrders=0;
		var shippedOrders=0;
		var completedOrders=0;
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
				//Storing users detail in state array object
				this.setState({orderstatus: ['Open', 'Pending', 'Processing','Shipped','Completed']});
				var orderStatusSumValues = new Array(5);
				const orders = response.items;
				orders.forEach((order) => {
					if (order.orderStatus == '2') {openOrders = openOrders+1; console.log('Current Open Orders:' + openOrders);}
					else if (order.orderStatus == '1') {pendingOrders = pendingOrders+1; console.log('Current Pending Orders:' + pendingOrders);}
					else if (order.orderStatus == '10') {processingOrders = processingOrders + 1; console.log('Current Processing Orders:' + processingOrders);}
					else if (order.orderStatus == '15') {shippedOrders = shippedOrders + 1; console.log('Current Shipped Orders:' + shippedOrders);}
					else if (order.orderStatus == '0') {completedOrders = completedOrders + 1; console.log('Current Completed Orders:' + completedOrders);}
				});
				orderStatusSumValues[0] = openOrders;
				orderStatusSumValues[1] = pendingOrders;
				orderStatusSumValues[2] = processingOrders;
				orderStatusSumValues[3] = shippedOrders;
				orderStatusSumValues[4] = completedOrders;
				this.setState({numberoforders: orderStatusSumValues});
			});
	  }
    
 
  render() {
   
    return (     
            <Doughnut
                data={{
                    labels: this.state.orderstatus,
                    datasets: [
                      {
                        label: 'Order Status',
                       backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(0,128,0, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(0,128,0, 1)',
						],
                        borderWidth: 1,
                        data: this.state.numberoforders
                      }
                    ]
                  }}
                options={{
                    plugins: {
						title: {
						  display: true,
						  text: 'Orders - Status',
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
export default OrdersStatus;
