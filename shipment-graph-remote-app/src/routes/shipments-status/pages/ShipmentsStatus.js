import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const {Liferay, themeDisplay} = window;


class ShipmentsStatus extends React.Component {
    constructor(props) {
        super(props)
          this.state = {
            shipmentstatus: [],
            numberofshipments:[]
                  }
          }
     
      componentDidMount(){
        //Get all chart details
		var processingShipment=0;
		var readytoshipShipment=0;
		var shippedShipment=0;
		var deliveredShipment=0;
			Liferay.Util.fetch(
				'/o/headless-commerce-admin-shipment/v1.0/shipments'
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
				//Storing shipment detail in state array object
				this.setState({shipmentstatus: ['Processing', 'Ready to Ship','Shipped','Delivered']});
				var shipmentStatusSumValues = new Array(4);
				const shipments = response.items;
				shipments.forEach((shipment) => {
					if (shipment.status.code == '0') {processingShipment = processingShipment+1; console.log('Current Processing Shipments:' + processingShipment);}
					else if (shipment.status.code == '1') {readytoshipShipment = readytoshipShipment+1; console.log('Current Pending Shipments:' + readytoshipShipment);}
					else if (shipment.status.code == '2') {shippedShipment = shippedShipment + 1; console.log('Current Shipped Shipments:' + shippedShipment);}
					else if (shipment.status.code == '3') {deliveredShipment = deliveredShipment + 1; console.log('Current Delivered Shipments:' + deliveredShipment);}
				});
				shipmentStatusSumValues[0] = processingShipment;
				shipmentStatusSumValues[1] = readytoshipShipment;
				shipmentStatusSumValues[2] = shippedShipment;
				shipmentStatusSumValues[3] = deliveredShipment;
				this.setState({numberofshipments: shipmentStatusSumValues});
			});
	  }
    
 
  render() {
   
    return (     
            <Doughnut
                data={{
                    labels: this.state.orderstatus,
                    datasets: [
                      {
                        label: 'Shipment Status',
                       backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(0,128,0, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(0,128,0, 1)',
						],
                        borderWidth: 1,
                        data: this.state.numberofshipments
                      }
                    ]
                  }}
                options={{
                    plugins: {
						title: {
						  display: true,
						  text: 'Shipments - Status',
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
export default ShipmentsStatus;
