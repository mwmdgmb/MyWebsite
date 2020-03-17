import React, { Children } from 'react';
import PropsType from 'prop-types';
import {Link} from "../../routes";
import { useRouter } from 'next/router';

const ActiveLink = ({ children, activeClassName, ...props }) => {
	const { pathname } = useRouter();
	const child = Children.only(children);
	const childClass = child.props.className || '';

	const className =

			pathname === props.href ? `${childClass} ${activeClassName}`.trim() :
			childClass;
	return (
		<Link {...props}>
			{React.cloneElement(child, {
				className: className || null
			})}
		</Link>
	);
};
ActiveLink.propTypes = {
	className: PropsType.string.isRequired
};

export default ActiveLink;
