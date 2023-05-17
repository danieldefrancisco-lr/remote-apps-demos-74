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


function App() {
	const [flights, setFlights] = useState([]);
	const [destination, setDestination] = useState("");
	const [flightNumber, setFlightNumber] = useState("");
	const [issueDateFrom, setIssueDateFrom] = useState("");
	
	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;
	

	const fetchFlights = () => {
		let url = "http://api.aviationstack.com/v1/flights"+"?access_key=69f38139aa2957c6eb70a53de5d30f73";
		let queryFilter = "&limit=4&dep_iata=IBZ";
		if (flightNumber.length !== 0) {
			let selectedFlightNumber = "&flight_number="+flightNumber;
			queryFilter = queryFilter + selectedFlightNumber;
		}
		
		if (destination.length !== 0) {
			let selectedDestination = "&arr_iata="+destination;
			queryFilter = queryFilter + selectedDestination;
		}

		
		
		Liferay.Util.fetch(url+queryFilter)
		    .then((response) => response.json())
		    .then((data) => setFlights(data.data));
		}
	
		useEffect(() => {
			fetchFlights()
		}, [destination,flightNumber,issueDateFrom]);

		
		return (
			  <div className="App">
				<div className="search-wrapper">
				<ClayUpperToolbar>
				<ClayUpperToolbar.Item className="text-left" expand>
        			<label className="component-title">{"Salidas"}</label>
      			</ClayUpperToolbar.Item>
				  <ClayUpperToolbar.Input placeholder="Destino" type="search" name="destination-form" id="destination-form" value={destination} onChange={(e) => setDestination(e.target.value)}/>
				  <ClayUpperToolbar.Input placeholder="Numbero de Vuelo" type="text" name="fn-form" id="fn-form" value={flightNumber} onChange={(a) => setFlightNumber(a.target.value)}/>
				  <ClayUpperToolbar.Item >
						<ClayDatePicker
      						onChange={setIssueDateFrom}
      						placeholder="YYYY-MM-DD"
      						spritemap={spritemap}
      						value={issueDateFrom}
      						years={{
        						end: 2024,
        						start: 1997
      						}}
    					/>
					</ClayUpperToolbar.Item>
				  </ClayUpperToolbar> 
                    </div>
			        <ClayTable>
						<caption>Flights</caption>
						<ClayTable.Head>
							<ClayTable.Row>
							<ClayTable.Cell expanded headingCell>
							{"Fecha"}
							</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Hora Salida"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Vuelo"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Compañia"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Destino"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Terminal"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Mostrador Facturacion"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Puerta Embarque"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Estado Vuelo"}</ClayTable.Cell>
							</ClayTable.Row>
						</ClayTable.Head>
						<ClayTable.Body>
						{flights.map((flight) => (	
							<ClayTable.Row>
							<ClayTable.Cell headingTitle>
							{flight.flight_date}
							</ClayTable.Cell>
							<ClayTable.Cell>{flight.departure.scheduled}</ClayTable.Cell>
							<ClayTable.Cell>{flight.flight.iata}</ClayTable.Cell>
							<ClayTable.Cell>{flight.airline.name}</ClayTable.Cell>
							<ClayTable.Cell>{flight.arrival.iata}</ClayTable.Cell>
							<ClayTable.Cell>{flight.departure.terminal}</ClayTable.Cell>
							<ClayTable.Cell>{flight.departure.gate}</ClayTable.Cell>
							<ClayTable.Cell>{flight.departure.gate}</ClayTable.Cell>
							<ClayTable.Cell>{flight.flight_status}</ClayTable.Cell>
							</ClayTable.Row>
						 ))}
						</ClayTable.Body>
						</ClayTable>
			  </div>
			);
}



export default App;
