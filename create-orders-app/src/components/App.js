import '../common/styles/App.css';
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



const {Liferay, themeDisplay} = window;

// query: (r_account_accountEntryId eq '50217') or (startswith(aTA, 'XY')) or (alert eq true)
function App(props) {
	const [manufacturer, setManufacturer] = useState("");
	const [manufacturers, setManufacturers] = useState([]);
    const [model, setModel] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
	const [description, setDescription] = useState("");
    const [localization, setLocalization] = useState("");
	const [price, setPrice] = useState("");
	const [year, setYear] = useState("");
	const [email, setEmail] = useState("");
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
				categories: [{id: manufacturer}]
			  }),
			method: 'POST',
			headers: [
				['Content-type', 'application/json'],
				['Accept', 'application/json']
			],
		})
		let resJson = await res.json();
      			if (res.status === 200) {
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
			  <div className="App">
      			<form onSubmit={handleSubmit}>
        			<input
        		 	 	type="text"
         				value={model}
         			 	placeholder="Model"
         			 	onChange={(e) => setModel(e.target.value)}
       				 />
       				 <input
        				type="text"
         			  	value={serialNumber}
          			  	placeholder="Serial Number"
         				onChange={(e) => setSerialNumber(e.target.value)}
					/>
					<label>
						Manufacturer
					<select onChange={(e) => setManufacturer(e.target.value)}>
						{
						manufacturers.map((opts,i)=>
							<option value={opts.id}>{opts.name}</option>
						)
						}
					</select>
					</label>
        			<input
         				 type="text"
         				 value={description}
         				 placeholder="Description"
         				 onChange={(e) => setDescription(e.target.value)}
        			/>
					<input
         				 type="text"
         				 value={localization}
         				 placeholder="Localization"
         				 onChange={(e) => setLocalization(e.target.value)}
        			/>
					<input
         				 type="text"
         				 value={year}
         				 placeholder="Year"
         				 onChange={(e) => setYear(e.target.value)}
        			/>
					<input
         				 type="file"
         				 placeholder="Picture"
						 onChange={(e) => handleFileUpload(e)}
        			/>

        			<button type="submit">Create Product</button>

        		<div className="message">{message ? <p>{message}</p> : null}</div>
      			</form>
   		 </div>
			);
}



export default App;
