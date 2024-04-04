import React, { Component } from 'react';

const {Liferay, themeDisplay} = window;

class App extends React.Component{
	constructor(props){
	  super(props);
	  this.state = {
		name: 'Name',
		lastname: 'Last Name',
		address: 'Address',
		companyName: 'Company Name',
		phoneNumber: 'Phone Number',
		email: 'E-mail',
		website: 'Website'
		};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleChangeAddress = this.handleChangeAddress.bind(this);
		this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
		this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
	}
  
	handleChangeName(event){
	  this.setState({
		name: event.target.value
	  })
	}
  
	  handleChangeLastName(event){
	  this.setState({
		lastname: event.target.value
	  })
	}
  
	  handleChangeAddress(event){
	  this.setState({
		address: event.target.value
	  })
	}
  
	  handleChangeCompanyName(event){
	  this.setState({
		companyName: event.target.value
	  })
	}
  
	 handleChangePhoneNumber(event){
	  this.setState({
		phoneNumber: event.target.value
	  })
	}
  
	handleChangeEmail(event){
	  this.setState({
		email: event.target.value
	  })
	}
  
	handleChangeWebsite(event){
	  this.setState({
		website: event.target.value
	  })
	}
  
  
  
  render(){
	return(
	  <div className = "container">
	  
	  
	  <form>
	  <div className="box">
	  <h1>Business Card</h1>
  
	  
	  <input
	  className = 'name'
	  placeHolder = {this.state.name}
	  type = 'text'
	  onChange = {this.handleChangeName}
	  />
	  
  
	  <input
	  className = 'lastName'
	  placeHolder = {this.state.lastname}
	  type = 'text'
	  onChange = {this.handleChangeLastName}
	  />
		 
	  <input
	  className = 'address'
	  placeHolder = {this.state.address}
	  type = 'text'
	  onChange = {this.handleChangeAddress}
	  />
	  
	  <input
	  className = 'company'
	  placeHolder = {this.state.companyName}
	  type = 'text'
	  onChange = {this.handleChangeCompanyName}
	  />
	  
	  <input
	  className = 'phone'
	  placeHolder = {this.state.phoneNumber}
	  type = 'text'
	  onChange = {this.handleChangePhoneNumber}
	  />
  
	  <input
	  className = 'eMail'
	  placeHolder = {this.state.email}
	  type = 'text'
	  onChange = {this.handleChangeEmail}
	  />
  
	  <input
	  className = 'webSite'
	  placeHolder = {this.state.website}
	  type = 'text'
	  onChange = {this.handleChangeWebsite}
	  />
  
	  </div>
	 </form>
  
	 <div className = "cardDiv">
	  <div className = "card">
		<h1 className = "cardName">{this.state.name} {this.state.lastname}</h1>
		<h2 className = "cardCompanyName">{this.state.companyName}</h2>
		<hr />
		<p className = "cardAddress">{this.state.address}</p>
		<p className = "cardPhoneNumber">{this.state.phoneNumber}</p>
		<hr />
		<p className = "cardEmail">{this.state.email}</p>
		<p className = "cardWebsite">{this.state.website}</p>
	  </div>
	</div>
  </div>
	  
	  
	  
	);
  }
  }




export default App;
