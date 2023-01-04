import React from 'react';
import { useEffect, useState } from "react";
import ClayTable from '@clayui/table';


const {Liferay, themeDisplay} = window;


function App() {
	const [documents, setDocuments] = useState([]);
	const fetchDocuments = () => {
		Liferay.Util.fetch("/o/c/engopdocuments/scopes/45907")
		    .then((response) => response.json())
		    .then((data) => setDocuments(data.items));
		}
		useEffect(() => {
			fetchDocuments()
		}, []);
		
		return (
			  <div className="App">
			        <ClayTable>
						<caption>Documents</caption>
						<ClayTable.Head>
							<ClayTable.Row>
							<ClayTable.Cell expanded headingCell>
								{"Customer"}
							</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Title"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Creation Date"}</ClayTable.Cell>
							</ClayTable.Row>
						</ClayTable.Head>
						<ClayTable.Body>
						{documents.map((document) => (	
							<ClayTable.Row>
							<ClayTable.Cell headingTitle>{document.r_account_accountEntryId}</ClayTable.Cell>
							<ClayTable.Cell>{document.title}</ClayTable.Cell>
							<ClayTable.Cell>{document.dateCreated}</ClayTable.Cell>
							</ClayTable.Row>
						 ))}
						</ClayTable.Body>
						</ClayTable>
			  </div>
			);
}



export default App;
