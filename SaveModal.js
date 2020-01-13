import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import { Animated, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width



export default class SaveModal extends Component{

    constructor(props){
        super(props)
        this.state = {saveText: '',  keyboardSpace:0}

    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide' , this._keyboardDidHide);
      }
    componentWillUnmount() {
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
        
    render(){
        return(


            <Modal
            onShow = {() =>{}}
            style={{...styles.outerModalStyle, 
                top:this.state.keyboardSpace? scale(100)-this.state.keyboardSpace: scale(-20),
                bottom:this.state.keyboardSpace? scale(100)-this.state.keyboardSpace: scale(-20),
                }}
            expandFromBottom={false}
            animationType="slide"
            // transparent={true}
            visible={this.props.saveModalOpen}
            // visible={true}
            onRequestClose={() => {this.props.toggleSaveModal()
            
            }}>
    
                        
             <LinearGradient colors={this.props.gradientColors} 
                style={styles.saveModalStyle}>

                
                <View style={styles.saveModalInputView}>
                    <TextInput style={styles.saveModalInput}
                        placeholderTextColor={'#bababa'}
                        // placeHolderTextSize= {100}
                        placeholder = {'Enter a save name...'} 
                        onChangeText={text => this.setState({saveText: text})}
                    />  
                </View>
                


            <View style={styles.saveModalIconBarView}>
                <Icon.Button
                    name="check"
                    color={'#5eb84c'}
                    size={scale(30)}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    // backgroundColor="#3b5998"
                    onPress={() => {this.props.toggleSaveModal(); 
                        this.props._storeData(this.state.saveText)
                    this.setState({saveText:''})}}
                    />
               
                <View style={{width:'8%', height: '.4%'}}/>
                    <Icon.Button
                        name="close"
                        color={'red'}
                        size={scale(30)}
                        backgroundColor="transparent"
                        underlayColor="transparent"
                        onPress={() => {
                            this.props.toggleSaveModal();
                            this.setState({saveText:''})
                        }}
                        />
                </View>
           
            </LinearGradient>
          </Modal>
        );
    }
}