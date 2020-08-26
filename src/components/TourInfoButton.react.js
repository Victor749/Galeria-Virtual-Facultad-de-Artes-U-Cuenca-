/**
 * @providesModule TourInfoButton.react
 */
'use strict';

import React from 'react';
import {Animated, Image, View, VrButton, StyleSheet, Text, asset} from 'react-360';
import TourTooltip from 'TourTooltip.react';

/**
 * On hover the InfoButton fades in a Tooltip component, and then fades it out
 * when the cursor leaves both the button and the Tooltip. 
 */
class TourInfoButton extends React.Component {
  static defaultProps = {
    fadeIn: 500,
    fadeOut: 500,
    height: 40,
    onInput: null,
    width: 40,
    showOnLeft: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      opacityAnim: new Animated.Value(0),
      obraId: this.props.obraId,
      obra: null
    };
    this.setObra();
  }

  setObra = () => {
    fetch(`http://localhost:3000/obras/api/json/${this.state.obraId}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ obra: responseData});
      })
      .catch(e => {console.log(e)})
      .done();
  }


  _fadeIn = () => {
    Animated.timing(this.state.opacityAnim, {
      toValue: 1,
      duration: this.props.fadeIn,
    }).start();
    this.setState({hasFocus: true});
  };

  _fadeOut = () => {
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: this.props.fadeOut,
    }).start();
    this.setState({hasFocus: false});
  };

  render() {
    const {
      height, 
      width,
      onInput,
      onClickSound,
      metodo,
      onEnterSound,
      onExitSound,
      onLongClickSound,
      source,
      showOnLeft,
      tooltip,
      parentWidth,
      parentHeight,
    } = this.props;

    console.log("Source: ");
    console.log(source);
    console.log(this.state.obraId);
    console.log(this.state.obra);

    let rutaElemento = '';

    if(this.state.obra != null){
      const {nombreElemento} = this.state.obra;
      rutaElemento = asset(nombreElemento).uri;
    }
    
    // console.log(rutaElemento);

    return (
      <VrButton
        ignoreLongClick={true}
        onClick={e => {metodo(this.state.obra, rutaElemento)}}
        onExit={this._fadeOut}
        onClickSound={onClickSound}
        onEnterSound={onEnterSound}
        onExitSound={onExitSound}
        onLongClickSound={onLongClickSound}
        // onClick={this._fadeIn}
        >  
        
        <Image
          style={{
            height: width,
            width: height,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          
          source={source}>

          <Animated.View
            // Use animation on opacity to fade in/out the tooltip
            // When opacity is 0, the tooltip is invisible, and 
            // also not interactable.
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: this.state.opacityAnim,
                position: 'absolute',
              },
              showOnLeft ? {right: -parentWidth/2} : {left: -parentWidth/2},
            ]}
            
            onEnter={this.state.hasFocus ? this._fadeIn : undefined}>
             {/* <TourTooltip parentWidth={parentWidth} parentHeight={parentHeight} tooltip={tooltip} visible={this.state.hasFocus} /> */}
          </Animated.View>

        </Image>
      </VrButton>
    );
  }
}

module.exports = TourInfoButton;
