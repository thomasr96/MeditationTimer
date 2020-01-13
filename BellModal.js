import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, Keyboard, Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import Swiper from 'react-native-swiper'
import RNPickerSelect from 'react-native-picker-select';
import { AppRegistry } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import LinearGradient from 'react-native-linear-gradient';
import BellAccordian from './BellAccordian'
import BellNumberAccordian from './BellNumberAccordian'
import BellFrequencySelector from './BellFrequencySelector'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


class SwiperSelector extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
        this.state = {bellSelectOpen: false, bellNumberOpen: false, bellChosen: false,
            bellFrequencyPressed:false, bellFrequency: 0, keyboardSpace:0}
            // Keyboard.addListener('keyboardDidShow',(frames)=>{
            //     if (!frames.endCoordinates) return;
            //     this.setState({keyboardSpace: frames.endCoordinates.height});
            // });
            // Keyboard.addListener('keyboardDidHide',(frames)=>{
            //     this.setState({keyboardSpace:0});
            // });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    toggleBellSelect = () => {
        this.setState({bellSelectOpen:!this.state.bellSelectOpen})
    }
    toggleBellNumber = () => {
        this.setState({bellNumberOpen:!this.state.bellNumberOpen})
    }
    toggleBellChosen = () => {
        this.setState({bellChosen:!this.state.bellChosen})
    }
    bellNumberButton = () => {
    if(this.props.bellType == 'middle'){
        return(
            <BellFrequencySelector
            bellNumber={this.props.bellNumber} bellType={this.props.bellType}
            middleBellLengthType={this.props.middleBellLengthType}
            bellFrequency={this.state.bellFrequency} 
            setBellNumber={this.props.setBellNumber}
            setMiddleBellLengthType={this.props.setMiddleBellLengthType}
            />
        );
    
    }
        else{
            return(
                <View style={styles.bellNumberAccordianView}>
                <BellNumberAccordian 
                bellSelectOpen={this.state.bellSelectOpen}
                bellNumberOpen={this.state.bellNumberOpen}
                toggleBellNumber={this.toggleBellNumber} 
                selectedBell={this.props.selectedBell}
                bellNumber = {this.props.bellNumber[this.props.bellType]}
                bellType={this.props.bellType}
                setBellNumber = {this.props.setBellNumber}/> 
            </View>
    )}}
    render() {
        // console.log(this.props.bellType + '__' + this.props.bellNumber[this.props.bellType])
        return(
            <View style={{marginLeft: 30, marginRight: 30,}}>
                <View style={styles.bellSelectAccordianView}>
                <BellAccordian 
                bellSelectOpen={this.state.bellSelectOpen}
                bellNumberOpen={this.state.bellNumberOpen}
                toggleBellSelect={this.toggleBellSelect} 
                bellType={this.props.bellType}
                setBell={this.props.setBell}
                toggleBellChosen={this.toggleBellChosen}
                setBellNumber = {this.props.setBellNumber}
                selectedBell={this.props.selectedBell}
                />
                </View>
                {/* <View paddingVertical={50} />  */}
                
                {this.bellNumberButton()} 
                
            </View>
        );
    }
}
    
class SwiperComponent extends Component {
render() {
    return (
        
    <Swiper style={styles.wrapper} showsButtons={false} 
    onIndexChanged={(index) => this.props.BellPageChange(index)}>
        
        <LinearGradient colors={this.props.gradientColors} style={styles.slide1}>
           <SwiperSelector bellType={'beginning'} setBell={this.props.setBell}
           bellNumber = {this.props.bellNumber} setBellNumber = {this.props.setBellNumber}
           selectedBell={this.props.selectedBell['beginning']}/>
        </LinearGradient>
        
        <LinearGradient colors={this.props.gradientColors} style={styles.slide1}>
            <SwiperSelector bellType={'middle'} setBell={this.props.setBell}
            bellNumber = {this.props.bellNumber} setBellNumber = {this.props.setBellNumber}
            selectedBell={this.props.selectedBell['middle']}
            middleBellLengthType={this.props.middleBellLengthType}
            setMiddleBellLengthType={this.props.setMiddleBellLengthType}/>
        </LinearGradient>

        <LinearGradient colors={this.props.gradientColors} style={styles.slide1}>
            <SwiperSelector bellType={'ending'} setBell={this.props.setBell}
            bellNumber = {this.props.bellNumber} setBellNumber = {this.props.setBellNumber}
            selectedBell={this.props.selectedBell['ending']}/>
        </LinearGradient>
    </Swiper>
    )
}
}



export default class BellModal extends Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {slidePageTitle:'Beginning Bell'}
      }

    componentWillUnmount() {
        this._isMounted = false;
    }
    BellPageChange = (index) =>{
        if (index == 0){
            this.setState({slidePageTitle: 'Beginning Bell'})
        }else if(index == 1){
            this.setState({slidePageTitle: 'Middle Bells'})           
        }else{
            this.setState({slidePageTitle: 'Ending Bell'}) 
        }
    }
render(){
    return(
        // <KeyboardAvoidingView  behavior='padding' 
        // keyboardVerticalOffset= {100}
        // >
        <Modal
            onShow = {() => this.BellPageChange(0)}
            style={styles.outerModalStyle}
            expandFromBottom={false}
            animationType="slide"
            // transparent={true}
            visible={this.props.bellModal}
            // visible={true}
            onRequestClose={() => {this.props.toggleModal()}}>

              <View style={styles.modalStyle}>
                <View style={{...styles.modalBar, backgroundColor:this.props.gradientColors[0]}}>
                    
                <View style={styles.modalCloseButton}>
                    <Icon.Button

                        name="check"
                        color={'#5eb84c'}
                        size={scale(35)}
                        // borderRadius ={2}
                        // style={{alignSelf: 'flex-end'}}
                        backgroundColor="transparent"
                        underlayColor="transparent"
                        // backgroundColor="#3b5998"
                        onPress={() => {this.props.toggleModal(); this.props.modalCheckPressed()}}>
                    </Icon.Button>
                </View>
                   
                        <Text style={{...styles.modalBarText,color:'#bababa'}} >{this.state.slidePageTitle}</Text>  
                    <View style={styles.modalCloseButton}>
                        <Icon.Button
                            name="close"
                            color={'red'}
                            size={scale(35)}
                            // borderRadius ={2}
                            // style={{alignSelf: 'flex-end'}}
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            // backgroundColor="#3b5998"
                            onPress={() => {this.props.toggleModal(); this.props.modalXPressed()}}>
                        </Icon.Button>
                    </View>
                </View>
                {/* <BellBar bellType={'Start Bell'}/> */}
               
                <SwiperComponent BellPageChange={this.BellPageChange} setBell={this.props.setBell}
                bellNumber = {this.props.bellNumber}
                setBellNumber={this.props.setBellNumber} gradientColors={this.props.gradientColors}
                selectedBell={this.props.selectedBell}
                middleBellLengthType={this.props.middleBellLengthType}
                setMiddleBellLengthType={this.props.setMiddleBellLengthType}/>
               
              </View>  
             
          </Modal>
        
          );
            }       
}