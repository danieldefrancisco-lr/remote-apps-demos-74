
import React from 'react';
import { useEffect, useState } from "react";
import {ClaySelect} from '@clayui/form';
import ClayForm, {ClayInput} from '@clayui/form';
import ClayButton from '@clayui/button';

const {Liferay, themeDisplay} = window;

function AppClay(props) {
	console.log(props);
	const [account, setAccount] = useState("");
	const [accounts, setAccounts] = useState([]);
    const [numberOfOrders, setNumberOfOrders] = useState("");
	const [orderStatus, setOrderStatus] = useState("");
	const [shipmentStatus, setShipmentStatus] = useState("");
	const [message, setMessage] = useState("");

	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;

	function generateUniqueCode() {
		// Get current timestamp
		const timestamp = new Date().getTime().toString(36).substring(2, 8).toUpperCase();
	
		return '00' + timestamp;
	}

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }

	function getPastDate() {
		let orderDate = new Date();
		orderDate.setDate(orderDate.getDate() - getRandomNumber(1,200));
		let formattedDate = orderDate.toISOString();
		return formattedDate;
	}

	async function createAddress() {
		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-account/v1.0/accounts/" + account + "/accountAddresses", {
			body: JSON.stringify({
				city: 'address-' + generateUniqueCode(),
				countryISOCode: 'US',
				defaultBilling: true,
				defaultShipping: true,
				description: 'description-' + generateUniqueCode(),
				latitude: 0,
				longitude: 0,
				name: 'name-' + generateUniqueCode(),
				regionISOCode: '',
				street1: 'street1-' + generateUniqueCode(),
				street2: 'street2-' + generateUniqueCode(),
				street3: 'street3-' + generateUniqueCode(),
				type: 2,
				zip: getRandomNumber(10000, 100000),
			}),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		});

		return await response.json();
	}

	async function getSkus() {
		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/skus");

		return await response.json();
	}

	async function getWarehouses() {
		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-inventory/v1.0/warehouses");

		return await response.json();
	}

	async function setShipmentStatusDelivered(shipment) {
		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-shipment/v1.0/shipments/" + shipment.id + "/status-delivered", {
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			]
		});

		return await response.json();
	}

	async function setShipmentStatusShipped(shipment) {
		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-shipment/v1.0/shipments/" + shipment.id + "/status-shipped", {
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			]
		});

		return await response.json();
	}

	async function setShipmentStatusFinishProcessing(shipment) {
		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-shipment/v1.0/shipments/" + shipment.id + "/status-finish-processing", {
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			]
		});

		return await response.json();
	}

	async function createOrder(address, skus) {
		let orderItems = [];
		let orderTotal = 0;

		for (let i = 0; i < 3 ; i++) {
			let randomSku = skus.items.at(getRandomNumber(0, skus.items.length-1));
			let quantity = getRandomNumber(1, 2);

			let orderItemTotal = randomSku.price * quantity;

			orderItems.push(
				{
					finalPrice: orderItemTotal,
					unitPrice: randomSku.price,
					quantity: quantity,
					skuId: randomSku.id
				}
			);

			orderTotal+=orderItemTotal;
		}

		let shippingAmount = 15.00;

		var response = await Liferay.Util.fetch("/o/headless-commerce-admin-order/v1.0/orders?nestedFields=orderItems", {
			body: JSON.stringify({
				accountId: account,
				billingAddressId: address.id,
				channelId: props.channelId,
				createDate:getPastDate(),
				currencyCode: "USD",
				externalReferenceCode:  "order-from-app-"+generateUniqueCode(),
				orderDate:getPastDate(),
				orderItems: orderItems,
				orderStatus : orderStatus == 14 ? 10 : orderStatus,
				paymentStatus : 0,
				shippingAddressId: address.id,
				shippingAmount: shippingAmount,
				shippingMethod: 'fixed',
				shippingOption: 'standard-delivery',
				subtotal: orderTotal,
				total: orderTotal + shippingAmount
			}),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			]
		});

		return await response.json();
	}

	async function createShipment(order) {
		const warehouses = await getWarehouses();

		let shipmentItems = [];

		order.orderItems.forEach((orderItem) => {
			const warehouse = warehouses.items.at(getRandomNumber(0, warehouses.items.length-1));

			shipmentItems.push(
				{
					orderItemId: orderItem.id,
					quantity: orderItem.quantity,
					warehouseId: warehouse.id
				});
		});

		const response = await Liferay.Util.fetch("/o/headless-commerce-admin-shipment/v1.0/shipments", {
			body: JSON.stringify({
				expectedDate: order.orderDate,
				orderId: order.id,
				shipmentItems: shipmentItems,
				shippingAddressId: order.shippingAddressId,
			}),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})

		return await response.json();
	}

	async function createPartialShipment(order) {
		const warehouses = await getWarehouses();

		let shipmentItems = [];

		const warehouse = warehouses.items[getRandomNumber(0, warehouses.items.length-1)];

		shipmentItems.push(
			{
				orderItemId: order.orderItems[0].id,
				quantity: order.orderItems[0].quantity,
				warehouseId: warehouse.id
			});

		const response = await Liferay.Util.fetch("/o/headless-commerce-admin-shipment/v1.0/shipments", {
			body: JSON.stringify({
				expectedDate: order.orderDate,
				orderId: order.id,
				shipmentItems: shipmentItems,
				shippingAddressId: order.shippingAddressId,
			}),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})

		return await response.json();
	}


	async function createOrders() {
		try {
			const address = await createAddress();
			const skus = await getSkus();

			for (let i = 0; i < numberOfOrders ; i++) {
				const order = await createOrder(address, skus);

				if (orderStatus == 0) {
					const shipment = await createShipment(order);

					setShipmentStatusDelivered(shipment);
				}
				else if (orderStatus == 10) {
					const shipment = await createShipment(order);

					if (shipmentStatus == 1) {
						setShipmentStatusFinishProcessing(shipment);
					}
					else if (shipmentStatus == 2) {
						setShipmentStatusShipped(shipment);
					}
					else if (shipmentStatus == 3) {
						setShipmentStatusDelivered(shipment);
					}
				}
				else if (orderStatus == 14) {
					const shipment = await createPartialShipment(order);

					setShipmentStatusDelivered(shipment);
				}
			}
    } catch (err) {
      console.log(err);
    }
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await createOrders();
	  }

	const fetchAccounts = () => {
		let availableAccounts = [];
		Liferay.Util.fetch("/o/headless-admin-user/v1.0/accounts")
			    .then((response) => response.json())
			    .then((data) => {
				
				data.items.forEach((element) => {
					if (element.type === "business") {
						console.log(element);	
						availableAccounts.push(element);
					}
				});
			});
			setAccounts(availableAccounts);
			console.log(availableAccounts);	
	}
	
		useEffect(() => {
			fetchAccounts();
		},[]);

		
		return (
			<div class="form-group-autofit">
			<ClayForm id="create-orders-form" onSubmit={handleSubmit}>
			<ClayForm.Group className="form-group-sm">
			</ClayForm.Group>
			
			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			<ClayInput.GroupItem>
			<label htmlFor="account">Account</label>
			<ClaySelect 
				aria-label="Account" 
				id="account"
				onChange={(e) => setAccount(e.target.value)}>
					<ClaySelect.Option
         					key="0"
          					label="Select an account"
         					value="0"
        					/>
						{
						accounts.map((opts,i)=>
							<ClaySelect.Option
         					key={opts.id}
          					label={opts.name}
         					value={opts.id}
        					/>
						)
						}
			</ClaySelect>
			</ClayInput.GroupItem>
			</ClayInput.Group>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			<ClayInput.GroupItem>
			<label htmlFor="orderStatus">Order Status</label>
			<ClaySelect
				aria-label="Order Status"
				id="orderStatus"
				onChange={(e) => setOrderStatus(e.target.value)}>
					<ClaySelect.Option
						key="10"
						label="Processing"
						value="10"
					/>
					<ClaySelect.Option
						key="1"
						label="Pending"
						value="1"
					/>
					<ClaySelect.Option
						key="8"
						label="Cancel"
						value="8"
					/>
					<ClaySelect.Option
						key="20"
						label="Holding"
						value="20"
					/>
					<ClaySelect.Option
						key="14"
						label="Partially Shipped"
						value="14"
					/>
					<ClaySelect.Option
						key="0"
						label="Completed"
						value="0"
					/>
			</ClaySelect>
			</ClayInput.GroupItem>
			</ClayInput.Group>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			<ClayInput.GroupItem>
			<label htmlFor="shipmentStatus">Shipment Status(Only applys for order status Processing)</label>
			<ClaySelect
				aria-label="Shipment Status"
				id="shipmentStatus"
				onChange={(e) => setShipmentStatus(e.target.value)}>
					<ClaySelect.Option
						key="0"
						label="Processing"
						value="0"
					/>
					<ClaySelect.Option
						key="1"
						label="Ready to Ship"
						value="1"
					/>
					<ClaySelect.Option
						key="2"
						label="Shipped"
						value="2"
					/>
					<ClaySelect.Option
						key="3"
						label="Delivered"
						value="3"
					/>
			</ClaySelect>
			</ClayInput.GroupItem>
			</ClayInput.Group>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			
			<ClayInput.GroupItem>
			  <label htmlFor="numberOfOrders">Number of Orders</label>
			  <ClayInput 
			  	id="numberOfOrders" 
				placeholder="numberOfOrders" 
				type="text"
				onChange={(e) => setNumberOfOrders(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			
			
			</ClayInput.Group>
			</ClayForm.Group>
			
			<ClayButton form="create-orders-form" type="submit">
					{Liferay.Language.get('create')}
			</ClayButton>
			<div className="message">{message ? <p>{message}</p> : null}</div>
		  </ClayForm>
		</div>
			);
}



export default AppClay;