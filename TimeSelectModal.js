import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, Image,CustomImage, TouchableHighlight} from 'react-native';
import { Animated, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import Picker from '@gregfrench/react-native-wheel-picker'

var PickerItem = Picker.Item;


export default class TimeSelectModal extends Component{

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    }
    
    onAddItem = () => {
        var name = '司马懿'
        if (this.state.itemList.indexOf(name) == -1) {
            this.state.itemList.push(name)
        }
        this.setState({
            selectedItem: this.state.itemList.indexOf(name),
        })
    }
    render(){
        return(
    
            <Modal
            onShow = {() =>{}}
            style={{...styles.outerModalStyle, 
                }}
            expandFromBottom={false}
            animationType="slide"
            // transparent={true}
            // visible={this.props.saveModalOpen}
            // visible={true}
            onRequestClose={() => {this.props.toggleSaveModal()
            
            }}>
    
                        
             <LinearGradient colors={this.props.gradientColors} 
                style={
                  {flex:.5,
                  marginLeft:'10%',
                  marginRight:'10%',
                  top:0,
                  bottom:0,
                  justifyContent:'center',
                  alignItems:'center'

                  }}>
            <View style={{flexDirection:'row', justifyContent:'center', backgroundColor:'red', width:200, height:200}}>

                <Picker style={{width: 40, height: 180}}
                selectedValue={this.props.hoursList}
                itemStyle={{color:"white", fontSize:26}}
                onValueChange={(index) => this.onPickerSelect(index)}>
                  
                  {this.props.hoursList.map((value, i) => (
                    <PickerItem label={value} value={i} key={value}/>
                  ))}

                </Picker>
                
                <View style={{width:20}}></View>
               
                <Picker style={{width: 40, height: 180}}
                selectedValue={this.props.minutesList}
                itemStyle={{color:"white", fontSize:26}}
                onValueChange={(index) => this.onPickerSelect(index)}>
                  
                  {this.props.minutesList.map((value, i) => (
                    <PickerItem label={value} value={i} key={value}/>
                  ))}

                </Picker>
        
                </View>
                
                


           
            </LinearGradient>
          </Modal>

        )}}