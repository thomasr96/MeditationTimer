import BackgroundTimer from 'react-native-background-timer'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, TouchableHighlightBase} from 'react-native';
import {Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import styles from './Styles'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Sound from 'react-native-sound';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



export default class StartButton extends Component{
  
  constructor(props){
    super(props);

    this.state = {beginningCount: 0,
                  endCount: this.props.bellNumber.ending, endBellPlaying: false,
                middleBellNumber: this.props.timeToMil(this.props.bellNumber.middle,this.props.middleBellLengthType)}
    }
    
    
  
      
  startTimer = () => {
    this.props.setMeditation(true)
    this.props.setHasStarted();

    // this.setState({middleBellNumber: 
    //   this.props.timeToMil(this.props.bellNumber.middle,this.props.middleBellLengthType),
    // beginningCount:this.props.bellNumber.beginning, endCount: this.props.bellNumber.ending})

    BackgroundTimer.runBackgroundTimer(() => {
      if (this.props.meditationLength <= 0){
        if ((this.props.bellNumber.ending-this.props.bellsStruck.ending) > 0){
          const endingsound = new Sound(this.props.selectedBell.ending, null, (error) => {
            if (error) {
                console.log(JSON.stringify(error))
            }
            endingsound.play();
            this.props.setBellsStruck(this.props.bellsStruck.ending+1, 'ending')
            // this.setState({endCount: this.state.endCount-1, endBellPlaying: true})
      })
        }
        //  BackgroundTimer.stopBackgroundTimer()
          if(this.props.meditating){
            this.props.resetTimer()  
          }
         this.props.setMeditation(false)
        //  BackgroundTimer.stopBackgroundTimer();
        //  () => BackgroundTimer.stopBackgroundTimer();
         return BackgroundTimer.stopBackgroundTimer();
         
          
      }else{
        
        if(this.props.meditationLength % 1000 == 0){

          if (this.props.selectedBell.beginning!=undefined &&
            (this.props.bellNumber.beginning-this.props.bellsStruck.beginning) > 0 
              && this.props.meditationLength % 10000 == 0){
              const beginningsound = new Sound(this.props.selectedBell.beginning, null, (error) => {
                if (error) {
                    console.log(JSON.stringify(error))
                }
                beginningsound.play();
                this.props.setBellsStruck(this.props.bellsStruck.beginning+1, 'beginning')
              
          })
        }

        if (this.props.selectedBell.ending!=undefined &&
          this.props.meditationLength <= ((this.props.bellNumber.ending-1)*10000) && 
          (this.props.bellNumber.ending-this.props.bellsStruck.ending) > 0 &&
          this.props.meditationLength % 10000 == 0){
            // this.setState({endBellPlaying:true})
            const endingsound = new Sound(this.props.selectedBell.ending, null, (error) => {
              if (error) {
                  console.log(JSON.stringify(error))
              }
              endingsound.play();
              this.props.setBellsStruck(this.props.bellsStruck.ending+1, 'ending')
              // this.setState({endCount: this.state.endCount-1, endBellPlaying: true})
        })
      }


          if (this.props.selectedBell.middle!=undefined &&
            this.props.meditationLength % this.props.bellNumber.middle == 0 && 
            (this.props.selectedBell.beginning==undefined || 
              this.props.bellNumber.beginning-this.props.bellsStruck.beginning == 0) && 
            // (this.props.bellNumber.ending-this.props.bellsStruck.ending) == 0 )
            (this.props.meditationLength > ((this.props.bellNumber.ending-1)*10000))){
            
            // console.log(22)
            const middlesound = new Sound(this.props.selectedBell.middle, null, (error) => {
              if (error) {
                  console.log(JSON.stringify(error))
              }
              middlesound.play();
          });
          }
        
        this.props.setTimeFromLength(this.props.meditationLength)}
        this.props.setMeditationLength(this.props.meditationLength - 100)
      }

      
  }, 100)  
  }
  meditationButton = () => {
   

    if (!this.props.meditating){
      return(
        <TouchableOpacity
        onPress={ 
          (this.props.meditationLength > 0 && !(this.props.meditating)) ?
          () => {BackgroundTimer.stopBackgroundTimer(); this.startTimer();}
          :
          () => ((this.props.meditating) ?  Alert.alert('Press pause to stop the timer.')
                  :
                  Alert.alert('Please tap the clock and enter a meditation length.'))}
        title="Start"> 
        <Image
          style={styles.startButton}
          source={require('./meditation_icon.png')}
        />
      
      </TouchableOpacity>
       );
    }else
    return(
        <Icon.Button
            name="pause"
            color={'black'}
            size={scale(35)}
            style={styles.pauseButton}
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {BackgroundTimer.stopBackgroundTimer();this.props.setMeditation(false)}}>
          </Icon.Button>
          );
  }
  getFill = () => { 
    var timeProportion = Math.ceil(100*this.props.meditationLength/this.props.fullMeditationLength);

    if (timeProportion==Infinity || isNaN(timeProportion)){
      return 100
    }else{
      return(100*this.props.meditationLength/this.props.fullMeditationLength)
    }
  }
render(){

    
  return(

    <AnimatedCircularProgress
    size={scale(170)}
    width={scale(3)} 
    fill={this.getFill()}
    tintColor="#00e0ff"
    backgroundColor="#3d5875"
    style={styles.circularProgressBar}>
    {
      (fill) => {
        return this.meditationButton()}
    }
  </AnimatedCircularProgress>
  
  );
  

	}
}