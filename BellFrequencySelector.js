import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {Keyboard, TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import Swiper from 'react-native-swiper'
import RNPickerSelect from 'react-native-picker-select';
import { AppRegistry } from 'react-native'
import BellNumberAccordian from './BellNumberAccordian'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class SwiperSelector extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
        this.state = {bellSelectOpen: false, bellNumberOpen: false, bellChosen: false,
            bellFrequencyPressed:false, bellFrequency: 0,  keyboardSpace:0}

            }
    componentDidMount() {
        this._isMounted = true;
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide' , this._keyboardDidHide);
        }
    componentWillUnmount() {
        this._isMounted = false;
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (frames) => {
        if (!frames.endCoordinates) return;
        this.setState({keyboardSpace: frames.endCoordinates.height});
    }
    
    _keyboardDidHide = (frames) => {
        this.setState({keyboardSpace:0});
    }
  
        
    render() {
        // console.log(this.props.bellType + '__' + this.props.bellNumber[this.props.bellType])
        return(


                <View style={!this.state.keyboardSpace? styles.bellFrequencyView:
                    styles.bellFrequencyViewKeyboard}>
                
                <View style={styles.frequencyPickerTextView}>
                    <Text style = {styles.frequencyPickerText}>
                        Bells ring every
                    </Text>
                </View>
                
                <View style={styles.frequencyInputView}>
                    <TextInput 
                        style={{...styles.frequencyInput, ...styles.bellText}}
                        placeholder = {(this.props.bellNumber[this.props.bellType] == 0)? '0':''+this.props.bellNumber[this.props.bellType]} 
                        keyboardType = 'numeric'
                        value={ (this.props.bellNumber[this.props.bellType]!=0)?  (''+this.props.bellNumber[this.props.bellType]) : ''}
                        onChangeText={text => {
                            text = text.replace('.','');
                            (text < 59)  ? this.props.setBellNumber(this.props.bellType, text)
                            : this.props.setBellNumber(this.props.bellType, ''+59)
                            
                            // this.setState({bellFrequency: text})
                            // : this.setState({bellFrequency: ''+59});
                            // console.log(this.props.middleBellLengthType)
                            // console.log(this.props.bellNumber[this.props.bellType])
                            // this.props.setBellNumber(this.props.bellType, text)
                            // : this.props.setBellNumber(this.props.bellType, ''+59);
                        }}
                        
                        maxLength={2}
                    />  
                </View>
    
                <View style={styles.frequencyPickerView}>
                    <RNPickerSelect
                    // value={{label:'...', value: '...', color:'#ababa'}}
                    selectedValue={this.props.middleBellLengthType}
                    placeholder={{ label: this.props.middleBellLengthType, value: this.props.middleBellLengthType}}
                    style={{inputAndroid:{
                        fontSize: scale(16),
                        justifyContent: 'center',
                        textAlign: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        placeholderColor: '#ababa',
                        borderWidth: 0.5,
                        color: '#ababa',
                        // fontSize: scale(20),
                        paddingRight: scale(30), // to ensure the text is never behind the icon
                      },},
                      {iconContainer: {
                        //   fontSize:scale
                        placeholderColor: '#ababa',
                        top: scale(2),
                        right: scale(20),
                      },}} 
                    Icon = {() => {return(
                        <Icon.Button
                            name="caret-down"
                            color={'black'}
                            size={scale(15)}
                            style={styles.pauseButton}
                            backgroundColor="transparent"
                            underlayColor="transparent"
                           >
                        </Icon.Button>);
                    }}
                    onValueChange={(value) =>
                        {
                        if(value != this.props.middleBellLengthType){
                            this.props.setMiddleBellLengthType(value)
                    }}}
                    items={(this.props.bellNumber[this.props.bellType]==1) ?
                        [{ label: '...', value: '...', color: '#ababa' },
                        { label: 'second', value: 'seconds', color: '#ababa' },
                        { label: 'minute', value: 'minutes', color: '#ababa' },
                        { label: 'hour', value: 'hours', color: '#ababa' },]
                        :
                        [{ label: '...', value: '...', color: '#ababa' },
                        { label: 'seconds', value: 'seconds', color: '#ababa' },
                        { label: 'minutes', value: 'minutes', color: '#ababa' },
                        { label: 'hours', value: 'hours', color: '#ababa' },]
                        }
                    />
                </View>
                </View>
            );
        
    }
}