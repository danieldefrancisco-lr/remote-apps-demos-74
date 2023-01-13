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
	const [ata, setAta] = useState("");
	const [alert, setAlert] = useState(false);
	const [accounts, setAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState("");
	const [coverages, setCoverages] = useState([]);
	const [selectedCoverage, setSelectedCoverage] = useState("");
	const [issueDateFrom, setIssueDateFrom] = useState("");
	
	const pathThemeImages = Liferay.ThemeDisplay.getPathThemeImages();
	const spritemap = `${pathThemeImages}/clay/icons.svg`;
	

	const fetchDocuments = () => {
		let url = "/o/c/engopdocuments/scopes/45907";
		let queryFilter = "";
		if (selectedAccount.length !== 0) {
			let selectedAccountFilter = "(r_account_accountEntryId eq '"+selectedAccount+"')";
			queryFilter = queryFilter + selectedAccountFilter;
		}
		if (ata.length !== 0) {
			let ataFilter = "(startswith(aTA,'"+ata+"'))";
			if (queryFilter.length !== 0) {
				queryFilter = queryFilter + " and ";
			}
			queryFilter = queryFilter + ataFilter;
		}

		if (alert) {
			if (queryFilter.length !== 0) {
				queryFilter = queryFilter + " and ";
			}
			queryFilter = queryFilter + "(alert eq "+alert+")";
		}

		if (issueDateFrom) {
			if (queryFilter.length !== 0) {
				queryFilter = queryFilter + " and ";
			}
			queryFilter = queryFilter + "(issueDateFrom gt "+issueDateFrom+")";
		}
		
		if (q.length !== 0) {
			url = url + "?search="+q;
			if (queryFilter.length !== 0) {
				url = url + "&filter="+queryFilter;
			}
		} else {
			if (queryFilter.length !== 0) {
				url = url + "?filter="+queryFilter;
			}
		}
		
		
		Liferay.Util.fetch(url)
		    .then((response) => response.json())
		    .then((data) => setDocuments(data.items));
		}
	const fetchAccounts = () => {
			Liferay.Util.fetch("/o/headless-commerce-admin-account/v1.0/accounts")
			    .then((response) => response.json())
			    .then((data) => setAccounts(data.items));
		}
	const fetchCoverages = () => {
		Liferay.Util.fetch("/o/headless-admin-list-type/v1.0/list-type-definitions")
			    .then((response) => response.json())
			    .then((data) => {
				data.items.forEach((element) => {
					if (element.name === "Coverage") {
						setCoverages(element.listTypeEntries);
					}
				});
			});
				
			}
	
		useEffect(() => {
			fetchAccounts()
		}, []);
		useEffect(() => {
			fetchCoverages()
		}, []);
		useEffect(() => {
			fetchDocuments()
		}, [q,selectedAccount,ata,alert,coverages,issueDateFrom]);

		
		return (
			  <div className="App">
				<div className="search-wrapper">
				<ClayUpperToolbar>
				<ClayUpperToolbar.Item className="text-left" expand>
        			<label className="component-title">{"Engineering Documents"}</label>
      			</ClayUpperToolbar.Item>
				  <ClayUpperToolbar.Item >
				  <ClaySelect aria-label="Select Label" id="account-select" value={selectedAccount} onChange={(a) => setSelectedAccount(a.target.value)}>
				  <ClaySelect.Option
         					 key={""}
         					 label={"All"}
         					 value={""}
       					 />
				  {accounts.map(item => (
        				<ClaySelect.Option
         					 key={item.id}
         					 label={item.name}
         					 value={item.id}
       					 />
    			  ))}
				  </ClaySelect>
				  </ClayUpperToolbar.Item>	
				  <ClayUpperToolbar.Input placeholder="Search..." type="search" name="search-form" id="search-form" value={q} onChange={(e) => setQ(e.target.value)}/>
				  <ClayUpperToolbar.Input placeholder="ATA..." type="text" name="ata-form" id="ata-form" value={ata} onChange={(a) => setAta(a.target.value)}/>
				  <ClayUpperToolbar.Item >
				  <ClaySelect aria-label="Select Label" id="coverage-select" value={selectedCoverage} onChange={(c) => setSelectedCoverage(c.target.value)}>
				  <ClaySelect.Option
         					 key={""}
         					 label={"All"}
         					 value={""}
       					 />
				  {coverages.map(item => (
        				<ClaySelect.Option
         					 key={item.key}
         					 label={item.name}
         					 value={item.key}
       					 />
    			  ))}
				  </ClaySelect>
				  </ClayUpperToolbar.Item>
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

				  <ClayUpperToolbar.Item >
				  	<ClayCheckbox checked={alert} onChange={() => setAlert(val => !val)} label="Alert"/>
				  </ClayUpperToolbar.Item>
				  </ClayUpperToolbar> 
                    </div>
			        <ClayTable>
						<caption>Documents</caption>
						<ClayTable.Head>
							<ClayTable.Row>
							<ClayTable.Cell expanded headingCell>
							{"Title"}
							</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Customer"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Creation Date"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Issue Date"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"ATA"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"Alert"}</ClayTable.Cell>
							<ClayTable.Cell headingCell>{"File"}</ClayTable.Cell>
							</ClayTable.Row>
						</ClayTable.Head>
						<ClayTable.Body>
						{documents.map((document) => (	
							<ClayTable.Row>
							<ClayTable.Cell headingTitle>
							{document.title}
							</ClayTable.Cell>
							<ClayTable.Cell><ClayLabel displayType="success">{document.r_account_accountEntryId}</ClayLabel></ClayTable.Cell>
							<ClayTable.Cell>{document.dateCreated}</ClayTable.Cell>
							<ClayTable.Cell>{document.issueDateFrom}</ClayTable.Cell>
							<ClayTable.Cell>{document.aTA}</ClayTable.Cell>
							{document.alert ? (
							<ClayTable.Cell><ClayLabel displayType="danger">{"Yes"}</ClayLabel></ClayTable.Cell>
							 ) : (
							<ClayTable.Cell><ClayLabel displayType="secondary">{"No"}</ClayLabel></ClayTable.Cell>	
							 )}
							<ClayTable.Cell><ClayLink href={document.document.link.href}>{document.document.name}</ClayLink></ClayTable.Cell>
							</ClayTable.Row>
						 ))}
						</ClayTable.Body>
						</ClayTable>
			  </div>
			);
}



export default App;
