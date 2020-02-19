import { Value } from 'slate';




export const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'A line of next in a paragraph ...'
							}
						]
					}
				]
			}
		]
	}
});