
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


import {TableRef} from './consts'
import Material from './Material'
import {
	addWidget,
	updateWidget,
	getWidgets,
	getWidgetData
} from './actions'



export default function (editor, opt = {}) {
	let d = [[{ "Name": "Henery", "Location": "Usa", "id": "5c24dc26dc10670017e40921", "last Seen": "2020-06-10T19:51:40.452Z", "notes": "" }]]

	let updateTrait = []
	const domc = editor.DomComponents
	const defaultType = domc.getType('default')
	const defaultModel = defaultType.model
	const defaultView = defaultType.view



	function displayOptions(displayDevice) {
		let newObj = [];

		for (var key in displayDevice) {
			if (displayDevice[key] === true)
				newObj.push(key);
		}

		return newObj;
	}

	

	
	domc.addType(TableRef, {
	
		model: defaultModel.extend({
			defaults: {
				...defaultModel.prototype.defaults,
				droppable: true,
				defaultData: [[{ "Name": "Henery", "Location": "Usa", "id": "5c24dc26dc10670017e40921", "last Seen": "2020-06-10T19:51:40.452Z", "notes": "" }]],
				prevData: [],
				dbId: [],
				keys: [["Name", "location", "id", "last Seen", "notes"]],
				traits:
					[
					{
				name:'modify',
				type: 'button',
				text: `Modify`,
				full: true, 
					command: editor => axios.get('http://173.249.14.149:3001/api/DataSources?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ')
						.then((res) => {
							let component = editor.getSelected()
							component.addTrait({
								name: "dataSource",
								type: "select",
								changeProp: 1,
								options: res.data.map(op => {
									
								return(
										{ id: op.id, name: op.title }
								)
								})
								
							})
							component.removeTrait('modify')
						})
						}
					],
				toHTML: function () {
					return "";
				}


			}, init() {

				this.listenTo(this, this.handlePropChange);
				if (this.attributes.prevData.length >= 1) {
					this.getTrait('modify').set('text', "Edit")
					this.addTrait({
						 
							name: 'Prev',
							type: 'pre',
						text: `
						Data Source : <span style="font-weight: bold;">${this.attributes.prevData[0].dataSourceId === '5ec035f7bb377b08ebc8938a' ? "MongoDB" : this.attributes.prevData[0].dataSourceId}</span><br/>
						 Table : <span style="font-weight: bold;">${this.attributes.prevData[0].config.docId}</span><br/>
						Fields : <span style="font-weight: bold;">${this.attributes.prevData[0].config.fields.toString().replace(/,/g, ' | ')}</span><br/>
						Primary key : <span style="font-weight: bold;"> ${this.attributes.prevData[0].config.primaryKey}</span><br/>
					`
					
					 }, {at:0})
				}
				if (this.attributes.dataSource) {
					this.attributes.dataSource = ''
					this.attributes.Table = ''
					this.attributes.collections = ''
				} else {
					return null
				}
			},
			

		}),

		view: defaultView.extend({
			init() {
				this.listenTo(this.model, `change:modify change:dataSource change:Table change:console change:${updateTrait.toString()}`, this.handleChanges);

			},
			handleChanges() {

				if (this.model.attributes.dataSource && (this.model.attributes.Table == undefined || this.model.attributes.Table == "")) {
					


					axios.get(`http://173.249.14.149:3001/api/DataSources/${this.model.attributes.dataSource}/doc-list?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ`)

						.then(response => {

							const component = editor.getSelected();
							if (this.model.attributes.Table) {
								
							}
							component.addTrait
								
								({
									name: "Table",
									type: 'select',
									options:
										response.data.map((t) => {
											return (
												{ id: t, name: t }
											)
										}),
									changeProp: 1,

								
								})
							
								
						})
				}
					
					if (this.model.attributes.Table) {
						axios.get(`http://173.249.14.149:3001/api/DataSources/${this.model.attributes.dataSource}/field-list?docId=${this.model.attributes.Table}&access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ`)
							
							.then(response => {

								const component = editor.getSelected()								

								if (updateTrait.length > 1) {

									this.model.get('traits').each(function (trait) {
										component.removeTrait(updateTrait.map(t => t.toString()));
										component.removeTrait("collections");
										component.removeTrait("console");
										
									});

								}
								response.data.map((t) => {
								
									let res = [

										{
											label: t, name: t, type: "checkbox", changeProp:1
										},

									]
									updateTrait.push(t)
									component.addTrait(res)
								})

								component.addTrait({
									label: "Primary key",
									name: "collections",
									type: "select",
									options: response.data.map(t => t),
									changeProp: 1

								}, { at: 40 });

								component.addTrait(
									{
										type: 'button',
										name: "console",
										changeProp:1,
										label: "log button",
										text: 'Click me',
										full: true,
										command: editor => {
											const selected = editor.getSelected();
											let postData = {}
											let postDataArray = []
											selected.attributes.traits.models.forEach(element => {

											postData[element.attributes.name] = element.attributes.value

											})
											postDataArray.push(postData)
											let arr = null
											this.model.attributes.keys = []
											arr = postDataArray.map((js => {
											this.model.attributes.keys.push(displayOptions(js))


												
												return (
													{
														"dataSourceId": js.dataSource,
														"config": {
															"fields": displayOptions(js),
															"primaryKey": js.collections,
															"docId": js.Table,
															"type": "simple",
															"func": "find",
															"query": {}

														},
														"type": "Table",
														

													}
												)
											}))[0]
											console.log(this.model.attributes.keys)
												addWidget(arr)
													.then(res => {
														console.log(res.data)
														let customId = res.data.id
														this.model.attributes.prevData = []
														this.model.attributes.prevData.push(res.data)
														if (this.model.attributes.prevData.length >= 1) {
															component.removeTrait('Prev')	
														}
														
													axios.get(`http://173.249.14.149:3001/api/WidgetSettings/${customId}/execute-query?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ`)
														.then(reso => {
															console.log(reso.data)

															if (this.model.attributes.defaultData.length < 1) {
																this.model.attributes.defaultData.push(reso.data)

															} else {
																this.model.attributes.defaultData = []
																this.model.attributes.defaultData.push(reso.data)
															}
															})
														.then(() => {

															ReactDOM.unmountComponentAtNode(this.el);
															this.render();
															
															})
														})
													},
												}
											)
										}
									)
								}	
							},
		onRender({ el }) {
								
				const comps = this.model.get('components')
				comps.reset()
				ReactDOM.render(
					<>
						<div>
							<Material keys={this.model.attributes.keys} data={this.model.attributes.defaultData[0]} />

						</div>
					</>
					, el)
			},
		}),
	})
		
}

