
import React from 'react';
import { useEffect, useState } from "react";
import ClayTable from '@clayui/table';
import ClayLabel from '@clayui/label';
import ClayLink from '@clayui/link';
import ClayIcon from '@clayui/icon';
import ClayUpperToolbar from '@clayui/upper-toolbar';
import {ClaySelect} from '@clayui/form';
import {ClayCheckbox} from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';
import ClayForm, {ClayInput} from '@clayui/form';
import ClaySlider from '@clayui/slider';
import ClayButton from '@clayui/button';



const {Liferay, themeDisplay} = window;


function AppClay(props) {
	const [manufacturer, setManufacturer] = useState("");
	const [manufacturers, setManufacturers] = useState([]);
    const [model, setModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
	const [description, setDescription] = useState("");
    const [localization, setLocalization] = useState("");
	const [price, setPrice] = useState("");
	const [year, setYear] = useState("");
	const [hours, setHours] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [picture, setPicture] = useState({});
	const [postImage, setPostImage] = useState({
		myFile: "",
	  });

	
	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;
	
	  function getBase64NoMetadata(file) {
		return new Promise((resolve, reject) => {
		  const reader = new FileReader();
		  reader.readAsDataURL(file);
		  reader.onload = () => {
			let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
			if ((encoded.length % 4) > 0) {
			  encoded += '='.repeat(4 - (encoded.length % 4));
			}
			resolve(encoded);
		  };
		  reader.onerror = error => reject(error);
		});
	  }


	  const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		const base64 = await getBase64NoMetadata(file);
		setPostImage({ ...postImage, myFile: base64 });
	  };


	  const addProductSpecificationLocalization = (productId,localization) => {
		Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/products/"+productId+"/productSpecifications", {
			body: JSON.stringify({
				specificationKey: "localization",
				value: {en_US : localization}
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
	}

	const addProductSpecificationYear = (productId,year) => {
		Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/products/"+productId+"/productSpecifications", {
			body: JSON.stringify({
				specificationKey: "year",
				value: {en_US : year}
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
	}

	const addProductSpecificationHours = (productId,hours) => {
		Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/products/"+productId+"/productSpecifications", {
			body: JSON.stringify({
				specificationKey: "hours",
				value: {en_US : hours}
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
	}


	let handleSubmit = async (e) => {
		e.preventDefault();
		try {
		let res = await Liferay.Util.fetch("/o/headless-commerce-admin-catalog/v1.0/products", {
			body: JSON.stringify({
				active: "true",
				catalogId: props.catalogId,
				description: {en_US : description},
				name: {en_US : model},
				productType: "simple",
				externalReferenceCode: serialNumber,
				images: [{src: "string",externalReferenceCode: "IMAGE-FROM-REACT"+serialNumber, title:{en_US : "base64 image"}, type: 0, attachment: postImage.myFile}],
				categories: [{id: manufacturer}],
				productChannelFilter: "true",
				productChannels : [{channelId:props.channelId, id: props.channelId}]
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
		let resJson = await res.json();
      			if (res.status === 200) {
					addProductSpecificationHours(resJson.id,hours);
					addProductSpecificationLocalization(resJson.id,localization);
					addProductSpecificationYear(resJson.id,year);
        			setMessage("Product created successfully");
     			 } else {
       				 setMessage("Some error occured");
    		  }
    } catch (err) {
      console.log(err);
    }
  };

		
	
	const fetchManufacturers = () => {
		let availableManufacturers = [];
		Liferay.Util.fetch("/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/"+props.manufacturerCategoryId+"/taxonomy-categories")
			    .then((response) => response.json())
			    .then((data) => {
				
				data.items.forEach((element) => {
					if (element.parentTaxonomyVocabulary.name === "Manufacturer") {
						console.log(element);	
						availableManufacturers.push(element);
					}
				});
			});
			setManufacturers(availableManufacturers);
			console.log(manufacturers);	
	}
	
		useEffect(() => {
			fetchManufacturers();
		},[]);

		
		return (
			<div class="form-group-autofit">
			<ClayForm id="create-product-form" onSubmit={handleSubmit}>
			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			<ClayInput.GroupItem>
			  <label htmlFor="model">Model</label>
			  <ClayInput 
			  	id="model" 
			  	placeholder="Model" 
				type="text" 
				onChange={(e) => setModel(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			<ClayInput.GroupItem>
			  <label htmlFor="serialNumber">Serial Number</label>
			  <ClayInput 
			  	id="serialNumber" 
				placeholder="serialNumber" 
				type="text"
				onChange={(e) => setSerialNumber(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			
			</ClayInput.Group>
			</ClayForm.Group>
			
			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			<ClayInput.GroupItem>
			<label htmlFor="manufacturer">Manufacturer</label>
			<ClaySelect 
				aria-label="Manufacturer" 
				id="manufacturer"
				onChange={(e) => setManufacturer(e.target.value)}>
						{
						manufacturers.map((opts,i)=>
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
			  <label htmlFor="description">Description</label>
			  <ClayInput
        			component="textarea"
        			id="description"
        			placeholder="Insert your description here"
       				type="text"
					onChange={(e) => setDescription(e.target.value)}
      			/>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			
			<ClayInput.GroupItem>
			  <label htmlFor="localization">Localization</label>
			  <ClayInput 
			  	id="localization" 
				placeholder="localization" 
				type="text"
				onChange={(e) => setLocalization(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			<ClayInput.GroupItem>
			  <label htmlFor="year">Year</label>
			  <ClayInput id="year" placeholder="year" type="text" onChange={(e) => setYear(e.target.value)}></ClayInput>
			</ClayInput.GroupItem>
			<ClayInput.GroupItem>
			  <label htmlFor="hours">Hours</label>
			  <ClayInput 
			  	id="hours" 
				placeholder="hours" 
				type="text"
				onChange={(e) => setHours(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			</ClayInput.Group>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			<ClayInput.Group>
			
			<ClayInput.GroupItem>
			  <label htmlFor="email">Email</label>
			  <ClayInput 
			  	id="email" 
				placeholder="email" 
				type="text"
				onChange={(e) => setEmail(e.target.value)}>
			   </ClayInput>
			</ClayInput.GroupItem>
			<ClayInput.GroupItem>
			  <label htmlFor="name">Name</label>
			  <ClayInput id="name" placeholder="name" type="text" onChange={(e) => setName(e.target.value)}></ClayInput>
			</ClayInput.GroupItem>
			</ClayInput.Group>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			  <label htmlFor="price">Price</label>
			  <ClaySlider defaultValue={10000} id="price" max={2000000} step={100} onChange={(e) => setPrice(e.value)}/>
			  <h3>{price}€</h3>
			</ClayForm.Group>

			<ClayForm.Group className="form-group-sm">
			  <label htmlFor="postImage">Picture</label>
			  <ClayInput id="postImage" placeholder="postImage" type="file" onChange={(e) => handleFileUpload(e)}></ClayInput>
			</ClayForm.Group>
			
			<ClayButton form="create-product-form" type="submit">
					{Liferay.Language.get('create')}
			</ClayButton>
		  </ClayForm>
		</div>
			);
}



export default AppClay;
