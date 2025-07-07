
import React from 'react';
import { useEffect, useState } from "react";
import {ClaySelect} from '@clayui/form';
import ClayForm, {ClayInput} from '@clayui/form';
import ClayButton from '@clayui/button';



const {Liferay, themeDisplay} = window;


function AppClay(props) {
	const [account, setAccount] = useState("");
	const [accounts, setAccounts] = useState([]);
    const [skuERC, setSkuERC] = useState("");
    const [units, setUnits] = useState("");
    const [numberOfOrders, setNumberOfOrders] = useState("");
	const [price, setPrice] = useState("");
	const [orderTotalSum, setOrderTotalSum] = useState(0);
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


	

	const addOrderItems = (newOrderId,skuERC,units) => {
		Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/"+skuERC)
			    .then((response) => response.json())
			    .then((data) => {
				
			//	data.items.forEach((element) => {
					Liferay.Util.fetch("/o/headless-commerce-admin-order/v1.0/orders/"+newOrderId+"/orderItems", {
						body: JSON.stringify({
							decimalQuantity: units,
							externalReferenceCode: "item-from-app-"+generateUniqueCode(),
							finalPrice : data.price * units,
							finalPriceWithTaxAmount : data.price * units,
							orderId: newOrderId,
							quantity : units,
							sku : data.sku,
							skuExternalReferenceCode : skuERC,
							unitPrice: data.price,
							unitPriceWithTaxAmount: data.price
						  }),
						method: 'POST',
						headers: [
							['Content-type', 'application/json'],
							['Accept', 'application/json']
						],
					})
				//});
			});
	}


	const addRandomOrderItems = (newOrderId,skuERC,units) => {
		Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/skus")
			    .then((response) => response.json())
			    .then((data) => {
				for (let i = 0; i < 3 ; i++) {
					let randomSku = data.items.get(getRandomNumber(1,data.length));
				
			//	data.items.forEach((element) => {
					Liferay.Util.fetch("/o/headless-commerce-admin-order/v1.0/orders/"+newOrderId+"/orderItems", {
						body: JSON.stringify({
							decimalQuantity: units,
							externalReferenceCode: "item-from-app-"+generateUniqueCode(),
							finalPrice : randomSku.price * units,
							finalPriceWithTaxAmount : randomSku.price * units,
							orderId: newOrderId,
							quantity : units,
							sku : randomSku.sku,
							skuExternalReferenceCode : randomSku.externalReferenceCode,
							unitPrice: randomSku.price,
							unitPriceWithTaxAmount: randomSku.price
						  }),
						method: 'POST',
						headers: [
							['Content-type', 'application/json'],
							['Accept', 'application/json']
						],
					})
				//});
				}
			});
	}

	async function setOrderTotal() {
		try {
		  const response = await Liferay.Util.fetch(`/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${skuERC}`);
		  const data = await response.json();
		  if (response.status === 200) {
		  setOrderTotalSum(data.price * units);
		  createOrders();
		  }  else {
			setMessage("Some error occured");
  }
		} catch (error) {
		  console.error("Error fetching SKU data:", error);
		}
	  }


	async function createOrders() {
		try {
			for (let i = 0; i < numberOfOrders ; i++) {
			let res = await Liferay.Util.fetch("/o/headless-commerce-admin-order/v1.0/orders", {
			body: JSON.stringify({
				accountId: account,
				channelId: props.channelId,
				createDate:getPastDate(),
				currencyCode: "EUR",
				externalReferenceCode:  "order-from-app-"+generateUniqueCode(),
				orderDate:getPastDate(),
				orderStatus : 0,
				paymentStatus : 0,
				total: orderTotalSum
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
		let resJson = await res.json();
      			if (res.status === 200) {
					addOrderItems(resJson.id,skuERC,units);
					addRandomOrderItems(resJson.id,skuERC,units);
        			setMessage("Orders created successfully");
     			 } else {
       				 setMessage("Some error occured");
    		  }
			}
    } catch (err) {
      console.log(err);
    }
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await setOrderTotal();
		// Aquí puedes llamar a otra función después de que setOrderTotal haya terminado
		//await createOrders();
	  }

/*
	let handleSubmit = async (e) => {
		e.preventDefault();
		await setOrderTotal();
		try {
			for (let i = 0; i < numberOfOrders ; i++) {
			let res = await Liferay.Util.fetch("/o/headless-commerce-admin-order/v1.0/orders", {
			body: JSON.stringify({
				accountId: account,
				channelId: props.channelId,
				createDate:getPastDate(),
				currencyCode: "EUR",
				externalReferenceCode:  "order-from-app-"+generateUniqueCode(),
				orderDate:getPastDate(),
				orderStatus : 0,
				paymentStatus : 0,
				total: orderTotalSum
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
		let resJson = await res.json();
      			if (res.status === 200) {
					addOrderItems(resJson.id,skuERC,units);
        			setMessage("Orders created successfully");
     			 } else {
       				 setMessage("Some error occured");
    		  }
			}
    } catch (err) {
      console.log(err);
    }
  };

*/
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
			<ClayInput.Group>
			<ClayInput.GroupItem>
			  <label htmlFor="model">SKU ERC</label>
			  <ClayInput 
			  	id="skuERC" 
			  	placeholder="skuERC" 
				type="text" 
				onChange={(e) => setSkuERC(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			<ClayInput.GroupItem>
			  <label htmlFor="serialNumber">No Units</label>
			  <ClayInput 
			  	id="units" 
				placeholder="units" 
				type="text"
				onChange={(e) => setUnits(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			
			</ClayInput.Group>
			</ClayForm.Group>
			
			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			<ClayInput.GroupItem>
			<label htmlFor="account">Account</label>
			<ClaySelect 
				aria-label="Account" 
				id="account"
				onChange={(e) => setAccount(e.target.value)}>
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
