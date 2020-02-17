import { FormGroup, Label, Input } from 'reactstrap';

const PortInput = ({ label, type, field, form: { touched, errors }, ...props }) => {
	return (
	<FormGroup>
		<Label>{label}</Label>
		<Input
			type={type}
			{...field}
			{...props}
		/>
		{touched[field.name] && errors[field.name] && <div className="text-danger error">{errors[field.name]}</div>}
	</FormGroup>
)};

export default PortInput;
