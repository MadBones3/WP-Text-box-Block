import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';

const { __Visualizer: BoxControlVisualizer } = BoxControl;

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, textAlignment, style, shadow, shadowOpacity } = attributes;

	// console.log( props );
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { textAlignment: newAlignment } );
	};
	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};
	const onChangeshadowOpacity = ( newshadowOpacity ) => {
		setAttributes( { shadowOpacity: newshadowOpacity } );
	};

	const classes = classnames( `text-box-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );
	return (
		<>
			<InspectorControls>
				{ shadow && (
					<PanelBody title={ __( 'Shadow Settings', 'text-box' ) }>
						<RangeControl
							label={ __( 'Shadow Opacity', 'text-box' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
							onChange={ onChangeshadowOpacity }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'shadow', 'text-box' ),
						isActive: shadow,
						onClick: toggleShadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ textAlignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: classes,
				} ) }
			>
				<RichText
					className="text-box-title"
					onChange={ onChangeText }
					value={ text }
					placeholder={ __( 'View Text', 'text-box' ) }
					tagName="p"
					allowedFormats={ [ 'core/bold' ] }
				/>
				<BoxControlVisualizer
					values={ style && style.spacing && style.spacing.padding }
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/>
			</div>
		</>
	);
}
