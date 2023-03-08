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
function AppAena(props) {
	console.log(props.airport);
	const [flights, setFlights] = useState([]);
	const [destination, setDestination] = useState("");
	const [flightNumber, setFlightNumber] = useState("");
	const [issueDateFrom, setIssueDateFrom] = useState("");
	
	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;
	

	const fetchFlights = () => {
		let url = "http://api.aviationstack.com/v1/flights"+"?access_key=69f38139aa2957c6eb70a53de5d30f73";
		let queryFilter = "&limit=4&dep_iata="+props.airport+"&flight_status=scheduled";
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
			<div id="tablaHome">
				<section id="infovuelos-home-aeropuerto" class="bg-white tabla" role="table">
				  <div className="App">
						<article id="infovuelos-resultado" class="" role="rowgroup">
							<div class="d-flex fila titulo" role="row">
							<div class="container">
								<ul class="inner">
									<li class="fecha" role="columnheader">Fecha</li>
									<li class="hora-salida" role="columnheader">Hora Salida</li>
									<li class="hora-llegada" role="columnheader">Vuelo</li>
									<li class="compania" role="columnheader">Compañía</li>
									<li class="destino" role="columnheader">Destino</li>
									<li class="terminal" role="columnheader">Terminal</li>
									<li class="mostrador_facturacion" role="columnheader">Mostrador de Facturación</li>
									<li class="puerta_embarque" role="columnheader">Puerta de embarque</li>
									<li class="como_llegar" role="columnheader">Cómo llegar</li>
									<li class="estado_vuelo" role="columnheader">Estado del Vuelo</li>
								</ul>
							</div>
							</div>
					{flights.map((flight) => (	
						<div class="d-flex fila resultado IBZ salidas">
						<div class="container">
							<ul class="inner">
								<li class="fecha" role="cell" aria-colindex="1"><span class="titulo">Fecha</span>{flight.flight_date}</li>
								<li class="hora" role="cell"><span class="titulo"></span><span>{flight.departure.scheduled.substring(11,16)}</span></li>
								<li class="vuelo" role="cell"><span class="titulo">Vuelo</span>{flight.flight.iata}</li>
								<li class="compania" role="cell">
									<span class="titulo">Compañía</span>{flight.airline.name}</li>
								<li class="destino" role="cell"><span class="titulo">Destino</span><span>{flight.arrival.iata}</span></li>
								<li class="terminal"><span class="titulo">Terminal</span><span class="1">{flight.departure.terminal}</span></li>
								<li class="mostrador_facturacion" role="cell"><span class="titulo">Mostrador</span><button data-open-ventana="poi-1049727046400" data-type="Carto" title="Ruta hasta mostrador" data-oaci="LEIB">{flight.departure.gate}</button></li>
								<li class="puerta_embarque"><span class="titulo">Puerta de embarque</span><span><button data-open-ventana="poi-1237555589535" data-type="Carto" title="Ruta hasta puerta de embarque" data-oaci="LEIB">{flight.departure.gate}</button></span></li>
								<li class="como_llegar" role="cell" title="Ruta de cómo llegar">
									<span class="titulo">Cómo llegar</span>
									<ul role="button" data-type="Carto" data-open-ventana="poi-1237555589535" title="Ruta hasta puerta de embarque" data-oaci="LEIB">
									<li><span class="icon icon icon-Localizacion-grande_Solido_T"></span></li>
									<li class=" terminal 1">1</li>
									<li class="mostrador"> 14</li>
									</ul>
								</li>
								<li class="estado_vuelo ULL" role="cell"><span>{flight.flight_status}</span></li>
							</ul>
						</div>
						</div>
						 ))}
						</article>
					</div>
				</section>
			</div>
			);
}



export default AppAena;
