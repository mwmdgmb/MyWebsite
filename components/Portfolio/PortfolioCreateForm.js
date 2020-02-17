// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from './../form/PortInputs';
import PortDate from './../form/PortDate';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

const ValidateInputs = (values) => {
	let errors = {};

	Object.entries(values).forEach(([ key, value ]) => {
		if (!values[key] && key !== "endDate") {
			errors[key] = `Field ${key} is Required`;
		}
	});

	const startDate = moment(values.startDate);
	const endDate = moment(values.endDate);

	if (startDate && endDate && endDate.isBefore(startDate)) {
		errors.endDate = 'End Date cannot be before start date !!!';
	}

	return errors;
};

const PortfolioCreateForm = ({ initialValues, error, onSubmit }) => (
	<div>
		<Formik initialValues={initialValues} validate={ValidateInputs} onSubmit={onSubmit}>
			{({ isSubmitting }) => (
				<Form>
					{error && <Alert color="danger">{error}</Alert>}
					<Field label="Title" type="text" name="title" component={PortInput} />

					<Field label="Company" type="text" name="company" component={PortInput} />

					<Field label="Location" type="text" name="location" component={PortInput} />

					<Field label="Position" type="text" name="position" component={PortInput} />

					<Field label="Description" type="textarea" name="description" component={PortInput} />

					<Grid container>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Field label="Start Date" name="startDate" initialDate={initialValues.startDate} component={PortDate} />
						</Grid>

						<Grid item xs={12} sm={12} md={6} lg={6}>
							<Field canBeDisabled={true} label="End Date" initialDate={initialValues.endDate} name="endDate" component={PortDate} />
						</Grid>
					</Grid>

					<Button className="btn btn-block mb-5" type="submit" disabled={isSubmitting}>
						Create
					</Button>
				</Form>
			)}
		</Formik>
	</div>
);

export default PortfolioCreateForm;

// import React, { Component } from 'react';

// export default class ProfileCreateForm extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			title: '',
// 			description: '',
// 			language: ''
// 		};

// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	handleChange(event) {
// 		const field = event.target.name;
// 		this.setState({ [field]: event.target.value });
// 	}

// 	handleSubmit(event) {
// 		alert('A name was submitted: ' + this.state.title + ' ' + this.state.description + ' ' + this.state.language);
// 		event.preventDefault();
// 	}

// 	render() {
// 		return (
// 			<form onSubmit={this.handleSubmit}>
// 				<label>
// 					Name:
// 					<input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
// 				</label>
// 				<label>
// 					Description:
// 					<textarea name="description" value={this.state.description} onChange={this.handleChange} />
// 				</label>
// 				<label>
// 					Pick your favorite Programing Language:
// 					<select name="language" value={this.state.language} onChange={this.handleChange}>
// 						<option value="JavaScript">JavaScript</option>
// 						<option value="React Js">React Js</option>
// 						<option value="Next Js">Next Js</option>
// 						<option value="Python">Python</option>
// 					</select>
// 				</label>
// 				<input type="submit" value="Submit" />
// 			</form>
// 		);
// 	}
// }
