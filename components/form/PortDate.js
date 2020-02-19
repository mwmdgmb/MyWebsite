import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FormGroup, Label } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';

export default class PortDate extends React.Component {
	constructor(props) {
		super(props);
		const dateValue = props.initialDate ? moment(props.initialDate) : moment();
		const isHidden = props.initialDate ? false : true ;
		this.state = {
			dateValue ,
			isHidden
		};
		this.handleChange = this.handleChange.bind(this);
	}

	setFieldValueAndTouched = (date, touched) => {
		const { setFieldValue, setFieldTouched } = this.props.form;
		const { name } = this.props.field;

		setFieldValue(name, date, true);
		setFieldTouched(name, touched, true);
	};

	handleChange(date) {
		this.setState({
			dateValue: date
		});

		this.setFieldValueAndTouched(date, true);
	}

	toggleDate = (date) => {
		this.setState({
			isHidden: !this.state.isHidden
		});

		this.setFieldValueAndTouched(date, true);
	};

	render() {
		const { label, field, canBeDisabled } = this.props;
		const { touched, errors } = this.props.form;
		const { dateValue, isHidden } = this.state;
		return (
			<FormGroup>
				<React.Fragment>
					<Label>{label}</Label>
					<br />
					{!isHidden && (
						<DatePicker
							className="form-control"
							selected={dateValue}
							onChange={this.handleChange}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							maxDate={moment()}
							dropdownMode="select"
						/>
					)}
				</React.Fragment>

				{canBeDisabled &&
				!isHidden && (
					<p
						style={{ cursor: 'pointer' }}
						className="badge px-5 py-1 rounded bg-success ml-1"
						onClick={() => this.toggleDate(null)}
					>
						{' '}
						Still Working Here ...
					</p>
				)}

				{canBeDisabled &&
				isHidden && (
					<React.Fragment>
						<span>Still Working Here ...</span>
						<p
							onClick={() => this.toggleDate(dateValue)}
							style={{ cursor: 'pointer' }}
							className="badge px-5 py-1 rounded bg-success ml-1"
						>
							Set End Date
						</p>
					</React.Fragment>
				)}

				{touched[field.name] && errors[field.name] && <div className="text-danger">{errors[field.name]}</div>}
			</FormGroup>
		);
	}
}
