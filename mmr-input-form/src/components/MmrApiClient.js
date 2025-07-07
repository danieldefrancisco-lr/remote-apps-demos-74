import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import ClayForm, {ClayInput} from '@clayui/form';
import ClayButton from '@clayui/button';




const {Liferay, themeDisplay} = window;

// query: (r_account_accountEntryId eq '50217') or (startswith(aTA, 'XY')) or (alert eq true)
function MMRApiClient(props) {
	console.log(props.apiKey);
	
	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;
	const [picture, setPicture] = useState("");
  	const [postImage, setPostImage] = useState({
	  	myFile: "",
	});
			const webcamRef = useRef(null);
			const [imgSrc, setImgSrc] = useState(null);
			const myHeaders = new Headers();
        	//myHeaders.append("Content-Type", "multipart/form-data");
        	myHeaders.append("apikey", "bdf8754910e1046d92575312c7b81b6ecffb268bf28fa5a145e369cd9af68b52");

			const handleFileUpload = async (e) => {
				const file = e.target.files[0];
				setPicture(file);
				//const base64 = await getBase64NoMetadata(file);
				//setPostImage({ ...postImage, myFile: base64 });
			  };
		  
			  let handleSubmit = async (e) => {
				e.preventDefault();
			  
		  
			  // Enviar la imagen a la API
			  const formData = new FormData();
			  //formData.append('file', imageSrc, 'car-image.jpg'); // Ajusta el nombre del archivo según tu API
			  formData.append('file', picture, 'car-image.jpg');
			 // formdata.append("file", fileInput.files[0], "/path/to/file");
		  
			  fetch('https://trafficeye.ai/recognition', {
				method: 'POST',
				headers: myHeaders,
				body: formData,
				redirect: "follow"
			  })
			  .then(response => response.json())
			  .then(data => console.log(data))
			  .catch(error => console.error('Error:', error));   
		  
			};
		
		  
			 return (
				<div class="form-group-autofit">
					<ClayForm id="submit-car-form" onSubmit={handleSubmit}>
					<ClayForm.Group className="form-group-sm">
			  <label htmlFor="postImage">Picture</label>
			  <ClayInput id="postImage" placeholder="postImage" type="file" onChange={(e) => handleFileUpload(e)}></ClayInput>
			</ClayForm.Group>
			
			<ClayButton form="submit-car-form" type="submit">
					{Liferay.Language.get('create')}
			</ClayButton>
		  </ClayForm>
		  </div>	
			);
		  }


export default MMRApiClient;
