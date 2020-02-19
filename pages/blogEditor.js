import React, { Component } from 'react';
import BaseLayout from '../components/layout/BaseLayout';
import BasePage from './../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import SlateEditor from './../components/slate-editor/Editor';

export class BlogEditor extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth}>
				<BasePage className="blog-editor-page" title="Write Your Story...">
					<SlateEditor />
				</BasePage>
			</BaseLayout>
		);
	}
}

export default withAuth('siteOwner')(BlogEditor);
