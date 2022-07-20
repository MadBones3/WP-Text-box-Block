import { registerBlockType, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';
import save from './save';
import v1 from './v1';
import v2 from './v2';

registerBlockType( 'blocks-course/text-box', {
	edit: Edit,
	save,
	deprecated: [ v2, v1 ],
	transforms: {
		// from your blocks to wp blocks
		from: [
			// make paragraph block transform to textbox
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( content, align ) => {
					return createBlock( 'blocks-course/text-box', {
						text: content,
						textAlignment: align,
					} );
				},
			},
			// type '/textbox' then hit enter to create
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( 'blocks-course/text-box', {
						shadow: true,
						gradient: 'red-to-blue',
					} );
				},
			},
			// type 'textbox' then hit space to create
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
		],
		// wp blocks to your blocks
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( { text } ) => {
					return text ? true : false;
				},
				transform: ( { text, textAlignment } ) => {
					return createBlock( 'core/paragraph', {
						content: text,
						align: textAlignment,
					} );
				},
			},
		],
	},
} );
