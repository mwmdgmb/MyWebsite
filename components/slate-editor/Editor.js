import React, { Component } from 'react';
import { Editor } from 'slate-react';
import HoverMenu from './HoverMenu';
import { renderMark ,renderNode } from './renderers';
import { initialValue } from './initial-values';

class SlateEditor extends Component {
	state = {
		value: initialValue,
		isLoaded: false
	};

	componentDidMount() {
		this.updateMenu();
		this.setState({ isLoaded: true });
	}
	componentDidUpdate() {
		this.updateMenu();
	}

	onChange = ({ value }) => {
		this.setState({ value });
	};

	updateMenu = () => {
		const menu = this.menu;
		if (!menu) return;

		const { value } = this.state;
		const { fragment, selection } = value;

		if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
			menu.removeAttribute('style');
			return;
		}
		const native = window.getSelection();
		const range = native.getRangeAt(0);
		const rect = range.getBoundingClientRect();
		menu.style.opacity = 1;
		menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

		menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width}px`;
	};
	renderEditor = (props, editor, next) => {
		const children = next();
		return (
			<React.Fragment>
				{children}
				<HoverMenu innerRef={(menu) => (this.menu = menu)} editor={editor} />
			</React.Fragment>
		);
	};

	render() {
		const { isLoaded } = this.state;
		return (
			<React.Fragment>
				{isLoaded && (
					<Editor
						placeholder="Enter Some Text ..."
						renderMark={renderMark}
						renderNode={renderNode}
						value={this.state.value}
						onChange={this.onChange}
						renderEditor={this.renderEditor}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default SlateEditor;
