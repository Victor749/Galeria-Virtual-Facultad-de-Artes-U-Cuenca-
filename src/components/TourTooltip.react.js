/**
 * @providesModule TourTooltip.react
 */
'use strict';

import React from 'react';
import {asset, Text, Image, View, StyleSheet} from 'react-360';
import {VideoPlayer} from '../../addons/react-360-common-ui';

const FONT_SIZE_ATTR = 10;
const FONT_SIZE_TEXT = 20;
const FONT_SIZE_TITLE = 30;
const TITLE_OPACITY = 0.6;
const TOOLTIP_MARGIN = 10;
const BORDER_COLOR = '#777879';

class TourTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {

    const {tooltip, visible, parentWidth, parentHeight} = this.props;

    const styles = StyleSheet.create({
      imageTooltip: {
        borderColor: BORDER_COLOR,
        borderWidth: 2,
        justifyContent: 'flex-end',
      },
      imageTooltipText: {
        right: 4,
        textAlign: 'right',
        textAlignVertical: 'bottom',
        fontSize: FONT_SIZE_ATTR,
      },
      panelTooltipContainer: {
        backgroundColor: 'rgba(81, 96, 117, 0.7)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: parentWidth,
        height: parentHeight,
      },
      panelInformation: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '100vw',
        height: '50vh',
        margin: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      panelDescription: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '100vw',
        height: '30vh',
        margin: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      data: {
        marginLeft: '5',
        justifyContent: 'flex-start',
        width: '60vw',
        height: '100vh'
      },
      normalText: {
        color: 'black'
      },
      boldText: {
        marginLeft: '5',
        fontWeight: 'bold',
        color: 'black'
      },
      panelUniversidad: {
        backgroundColor: 'rgba(31, 20, 16, 0.5)',
        width: '100vw',
        height: '10vh',
        margin: 0,
        padding: 20,
      },
      panelTooltipImage: {
        justifyContent: 'center',
        width: '40vw',
        height: '100vh'
      },
      panelTooltipTitleContainer: {
        backgroundColor: 'black',
        bottom: -FONT_SIZE_TITLE - TOOLTIP_MARGIN,
        height: FONT_SIZE_TITLE + TOOLTIP_MARGIN,
        opacity: TITLE_OPACITY,
      },
      panelTooltipTitleText: {
        color: 'white',
        fontSize: FONT_SIZE_TITLE,
        flex: 1,
        height: FONT_SIZE_TITLE + TOOLTIP_MARGIN,
        marginLeft: TOOLTIP_MARGIN,
        marginRight: TOOLTIP_MARGIN,
        textAlignVertical: 'bottom',
      },
      panelTooltipTextContainer: {
        backgroundColor: 'black',
        paddingLeft: TOOLTIP_MARGIN,
        paddingRight: TOOLTIP_MARGIN,
        paddingTop: 0,
        width: '100%',
      },
      panelTooltipText: {
        color: 'white',
        fontSize: FONT_SIZE_TEXT,
        textAlignVertical: 'center',
      },
      panelTooltipTextAttr: {
        fontSize: FONT_SIZE_ATTR,
        right: -TOOLTIP_MARGIN + 4,
        textAlign: 'right',
      },
      blockTooltipContainer: {
        backgroundColor: 'black',
        padding: 2,
      },
      blockTooltipTitleText: {
        color: 'white',
        fontSize: FONT_SIZE_TITLE,
        width: '100%',
      },
      blockTooltipSeparator: {
        backgroundColor: BORDER_COLOR,
        height: 2,
        width: '100%',
      },
      blockTooltipText: {
        color: 'white',
        fontSize: FONT_SIZE_TEXT,
        width: '100%',
      },
      blockTooltipTextAttr: {
        fontSize: FONT_SIZE_ATTR,
        right: 4,
        textAlign: 'right',
      },
      missingTooltip: {
        backgroundColor: 'red'
      },
    });

    

    switch (this.props.tooltip.type) {
      case 'image':
        return <ImageTooltip styles={styles} tooltip={tooltip} />;
      case 'panelimage':
        return <PanelImageTooltip styles={styles} tooltip={tooltip} />;
      case 'textblock':
        return <TextBlockTooltip styles={styles} tooltip={tooltip} />;
      case 'video':
        return <VideoTooltip styles={styles} tooltip={tooltip} visible={visible} />;
      default:
        return <Text styles={styles} style={styles.missingTooltip}>Missing Tooltip</Text>;
    }
  }
}

class ImageTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tooltip, styles} = this.props;

    return (
      <Image
        style={[
          styles.imageTooltip,
          {height: tooltip.height, width: tooltip.width}
        ]}
        source={asset(tooltip.source)}>
        {tooltip.attribution &&
          <Text
            style={styles.imageTooltipText}>
            {tooltip.attribution}
          </Text>}
      </Image>
    );
  }
}

class PanelImageTooltip extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    const {tooltip, styles} = this.props;
    console.log(tooltip);

    return (
      // <View
      //   style={styles.panelTooltipContainer, {width: tooltip.width}}>
      //   <Image
      //     style={[
      //       styles.panelTooltipImage,
      //       {height: tooltip.height, width: tooltip.width}
      //     ]}
      //     source={asset(tooltip.source)}>
      //     {tooltip.title &&
      //       <View>
      //         <View
      //           style={styles.panelTooltipTitleContainer}
      //         />
      //         <Text
      //           style={styles.panelTooltipTitleText}>
      //           {tooltip.title}
      //         </Text>
      //       </View>}
      //   </Image>
      //   <View
      //     style={[
      //       styles.panelTooltipTextContainer,
      //       {paddingBottom: tooltip.attribution ? 0 : TOOLTIP_MARGIN}
      //     ]}>
      //     <Text
      //       style={styles.panelTooltipText}>
      //       {tooltip.text}
      //     </Text>
      //     {tooltip.attribution &&
      //       <Text
      //         style={styles.panelTooltipTextAttr}>
      //         {tooltip.attribution}
      //       </Text>}
      //   </View>
      // </View>

      <View style={styles.panelTooltipContainer}>
        <View style={styles.panelInformation}>
          <View style={styles.data}>
              <Text style={styles.boldText}>Ficha Museográfica</Text>
              <Text style={styles.boldText}><Text style={styles.normalText}>Autor: </Text> Pablo Solano</Text>
          </View>
          <View style ={styles.panelTooltipImage}>
            <Image style={
              styles.panelTooltipImage
            } source={asset(tooltip.source)}/>
          </View>
        </View>
        <View style={styles.panelUniversidad} >
          <Text>
            Universidad de Cuenca
          </Text>
        </View>
        <View style={styles.panelDescription} >
              <Text style={styles.boldText}>Descripción: </Text>
        </View>
        <View style={styles.panelUniversidad} >
          <Text>
            Universidad de Cuenca
          </Text>
        </View>
      </View>

    );
  }
}

class TextBlockTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tooltip, styles} = this.props;

    return (
      <View
        style={[
          styles.blockTooltipContainer,
          {height: tooltip.height, width: tooltip.width}
        ]}>
        <Text
          style={styles.blockTooltipTitleText}>
          {tooltip.title}
        </Text>
        {tooltip.title &&
          <View
            style={styles.blockTooltipSeparator}
          />}
        <Text
          style={styles.blockTooltipText}>
          {tooltip.text}
        </Text>
        {tooltip.attribution &&
          <Text
            style={styles.blockTooltipTextAttr}>
            {tooltip.attribution}
          </Text>}
      </View>
    );
  }
}

class VideoTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tooltip, visible, styles} = this.props;

    return (
      <VideoPlayer
        source={{url: asset(tooltip.source).uri}}
        stereo={'2D'}
        style={{height: tooltip.height, width: tooltip.width}}
        visible={visible}
      />
    );
  }
}



module.exports = TourTooltip;
