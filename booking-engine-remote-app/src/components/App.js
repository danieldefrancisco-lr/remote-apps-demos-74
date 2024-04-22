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
function App() {
	const [documents, setDocuments] = useState([]);
	const [q, setQ] = useState("");
	const [passengers, setPassengers] = useState("");
	const [hotel, setHotel] = useState(false);
	const [routes, setRoutes] = useState([]);
	const [selectedRoute, setSelectedRoute] = useState("");
	const [coverages, setCoverages] = useState([]);
	const [issueDateFrom, setIssueDateFrom] = useState("");
	const [issueDateTo, setIssueDateTo] = useState("");
	
	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;
	

	const fetchRoutes = () => {
			Liferay.Util.fetch("/o/c/trasmedroutes")
			    .then((response) => response.json())
			    .then((data) => setRoutes(data.items));
		}
	
		useEffect(() => {
			fetchRoutes()
		}, []);
		

		
		return (
			  <div className="App">
				<div className="search-wrapper">
				<ClayUpperToolbar>
				  <ClayUpperToolbar.Item >
				  <ClaySelect aria-label="Select Label" id="account-select" value={selectedRoute} onChange={(a) => setSelectedRoute(a.target.value)}>
				  <ClaySelect.Option
         					 key={""}
         					 label={"Seleccionar Trayecto"}
         					 value={""}
       					 />
				  {routes.map(item => (
        				<ClaySelect.Option
         					 key={item.id}
         					 label={item.route}
         					 value={item.routeCode}
       					 />
    			  ))}
				  </ClaySelect>
				  </ClayUpperToolbar.Item>
				  <ClayUpperToolbar.Item >
				  <ClayUpperToolbar.Input placeholder="Passengers" type="text" name="passengers-form" id="passengers-form" value={passengers} onChange={(a) => setPassengers(a.target.value)}/>
				  </ClayUpperToolbar.Item>	
				  <ClayUpperToolbar.Item >
						<ClayDatePicker
      						onChange={setIssueDateFrom}
      						placeholder="Ida (yyyy-mm-dd)"
      						spritemap={spritemap}
      						value={issueDateFrom}
      						years={{
        						end: 2026,
        						start: 2024
      						}}
    					/>
					</ClayUpperToolbar.Item>
					<ClayUpperToolbar.Item >
						<ClayDatePicker
      						onChange={setIssueDateTo}
      						placeholder="Vuelta (yyyy-mm-dd)"
      						spritemap={spritemap}
      						value={issueDateTo}
      						years={{
        						end: 2026,
        						start: 2024
      						}}
    					/>
					</ClayUpperToolbar.Item>

				  <ClayUpperToolbar.Item >
				  	<ClayCheckbox checked={hotel} onChange={() => setHotel(val => !val)} label="Hotel"/>
				  </ClayUpperToolbar.Item>
				  </ClayUpperToolbar> 
                    </div>
			        <ClayTable>
						<caption>Documents</caption>
						<ClayTable.Head>
							<ClayTable.Row>
							<ClayTable.Cell expanded headingCell>
							{"Route"}
							</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"From Date"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"To Date"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Passengers"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Hotel"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Link"}</ClayTable.Cell>
							</ClayTable.Row>
						</ClayTable.Head>
						<ClayTable.Body>
						
							<ClayTable.Row>
							<ClayTable.Cell headingTitle>
							{selectedRoute}
							</ClayTable.Cell>
							<ClayTable.Cell>{issueDateFrom}</ClayTable.Cell>
							<ClayTable.Cell>{issueDateTo}</ClayTable.Cell>
							<ClayTable.Cell>{passengers}</ClayTable.Cell>
							{document.hotel ? (
							<ClayTable.Cell><ClayLabel displayType="danger">{"Yes"}</ClayLabel></ClayTable.Cell>
							 ) : (
							<ClayTable.Cell><ClayLabel displayType="secondary">{"No"}</ClayLabel></ClayTable.Cell>	
							 )}
							<ClayTable.Cell><ClayLink href="https://vacaciones.trasmed.com/accboatsearch?n=BARMEN&i=2024-04-05&o=2024-05-05&h=30">Link</ClayLink></ClayTable.Cell>
							</ClayTable.Row>
						</ClayTable.Body>
						</ClayTable>
			  </div>
			);
}



export default App;
