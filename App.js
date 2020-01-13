import React, { Component } from 'react';
import {Image,CustomImage, TouchableHighlight} from 'react-native';
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet,Dimensions,Keyboard} from 'react-native';
import DatePicker from 'react-native-datepicker'
import BackgroundTimer from 'react-native-background-timer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import styles from './Styles.js'
import TimerButton from './TimerButton'
import StartButton from './StartButton'
import BellModal from './BellModal'
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import LoadModal from './LoadModal'
import AboutModal from './AboutModal'
import RNPickerSelect from 'react-native-picker-select';
// import Picker from '@gregfrench/react-native-wheel-picker'
// import TimeSelectModal from './TimeSelectModal'
import { MenuProvider ,renderers } from 'react-native-popup-menu';
// import ScrollPicker from 'react-native-wheel-scroll-picker';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import SaveModal from './SaveModal'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width


const { SlideInMenu, Popover, ContextMenu} = renderers;


function range(start, end) {
  var foo = [];
  for (var i = start; i <= end; i++) {
    (i<10)?
      foo.push('0'+i)
    :
      foo.push(''+i)

  }
  return foo;
}
export default class MeditationTimer extends Component {
  constructor(props){
    
    super(props);
    this.state = {meditating:false, hasStarted: false,
      meditationTime: '00:00:00', 
      // meditationTime: new Date('1996-03-16T00:00:00'), 
    meditationLength: 0, fullMeditationLength: 0, pauseCounter: 0, 
    timeIcon:"./36466-200.png", bellModal: false,
    gradientColors:['#101394', '#8210f9', '#ae10f9'],
    // gradientColors:['blue', '#06f4ec'] 
    // gradientColors:['pink', 'green'] 
    // gradientColors:['#6206b2', '#c88cfd'] 
    selectedBeginningBell: undefined, beginningBellNumber: 0, selectedMiddleBell: undefined, 
    middleBellNumber:0, selectedEndingBell: undefined, endingBellNumber: 0,
    middleBellLengthType: '...', beginningBellsStruck: 0, endingBellsStruck: 0,
    loadModalOpen: false, saveModalOpen: false, aboutModalOpen:false,
    selectedItem : 2, itemList: range(0, 23), 
      hoursList: range(0, 23), minutesList: range(0, 59), selectMinutes: 0, selectedHours: 0,
      timeSelectModalOpen: false
  }
    // this.handleChange = this.handleChange.bind(this);
   
  }

 

  resetTimer = () => {
    // console.log('resetting')
    this.setState( {meditating:false, hasStarted: false,
      meditationTime: '00:00:00', 
      // meditationTime: new Date('1996-03-16T00:00:00'), 
    meditationLength: 0, fullMeditationLength: 0, pauseCounter: 0, 
    timeIcon:"./36466-200.png", bellModal: false,
    gradientColors:['#101394', '#8210f9', '#ae10f9'],
    // gradientColors:['blue', '#06f4ec'] 
    // gradientColors:['pink', 'green'] 
    // gradientColors:['#6206b2', '#c88cfd'] 
    selectedBeginningBell: undefined, beginningBellNumber: 0, selectedMiddleBell: undefined, 
    middleBellNumber:0, selectedEndingBell: undefined, endingBellNumber: 0,
    middleBellLengthType: '...', beginningBellsStruck: 0, endingBellsStruck: 0,
    loadModalOpen: false, saveModalOpen: false, aboutModalOpen:false, 
    selectedItem : 2, itemList: range(0, 23),
      hoursList: range(0, 23), minutesList: range(0, 59), selectMinutes: 0, selectedHours: 0,
      timeSelectModalOpen: false
  })
  return BackgroundTimer.stopBackgroundTimer()
  }

  renderEndButton = () =>{
    if(this.state.meditationLength){
      return(<View style={styles.endButtonView} >
        <TouchableOpacity style={styles.endButton} onPress={()=>this.resetTimer()}>
          <Text style={styles.endButtonText}>
            {(this.state.hasStarted) ?  'end' : 'clear'} 
          </Text>
        </TouchableOpacity>
      </View>);
    }
    
  }
  

  setHasStarted = () => {
    if (this.state.pauseCounter == 0){
      this.setState({fullMeditationLength:  this.state.meditationLength})
    }
    this.setState({pauseCounter: this.state.pauseCounter+1})
    this.setState({hasStarted: true})
  }
  setMeditation = (isMeditating) => {
    this.setState({meditating: isMeditating})
  }

  setMeditationLength = length => {
    if (this.state.pauseCounter == 0){
      this.setState({fullMeditationLength: length})
    }
    this.setState({
      meditationLength: length
    })
  }
// // // // // // // // // // // // // // // // // // // // // // // // // // // // 

  componentDidMount = () => {
  //  this.setState({meditationTime: 
  //   new Date (this.state.meditationTime.getTime() + 
  //   this.state.meditationTime.getTimezoneOffset()*60000)})
  // console.log((this.state.meditationTime instanceof Date))
      
  }
  timeToLength = (time) => {
    // console.log('3')
    
    if (!(time instanceof Date)){ 

    var hoursInMili = parseInt(time.split(':')[0]) * 1000 * 60**2
    var minutesInMili = parseInt(time.split(':')[1]) * 1000 * 60
    return hoursInMili + minutesInMili
    }
  }

  setLengthFromTime = (time) => {

    if (!(time instanceof Date)){ 
    var length = this.timeToLength(time)
    this.setMeditationLength(length)
    }
  }

  setMeditationTime = time => {
    
    // new Date (this.state.meditationTime.getTime() + 
    // this.state.meditationTime.getTimezoneOffset()*60000)
    // var x = new Date (time.getTime() + time.getTimezoneOffset()*2*60000)
    // console.log(x)
    // console.log(time.getHours() + '__ __' + time.getMinutes())
    // this.setState({meditationTime: time})
    
    if (!(time instanceof Date)){ 
    time = time.split(':')[0] + ':' + time.split(':')[1] + ':00'
    this.setState({
      meditationTime: time
    })}
  }


  setTimeFromLength = (length) => {
   
    var hours = Math.floor((length / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((length / (1000 * 60)) % 60);
    var seconds = Math.floor((length / 1000) % 60);
    
    var newMeditationTime = hours + ':' + minutes + ':' + seconds
    this.setState({
      meditationTime: newMeditationTime
    })
  }
// // // // // // // // // // // // // // // // // // // // // // // // // // // // 
  toggleModal = () => {
    this.setState({ bellModal: !this.state.bellModal });
  };
  toggleLoadModal = () => {
    this.setState({loadModalOpen: !this.state.loadModalOpen})
    // console.log(this.state.loadModalOpen)
  }

  toggleSaveModal = () => {
    this.setState({saveModalOpen: !this.state.saveModalOpen})
  }

  toggleAboutModal = () => {
    this.setState({aboutModalOpen: !this.state.aboutModalOpen})
  }

  toggleTimeSelectModal = () => {
    this.setState({timeSelectModalOpen: !this.state.timeSelectModalOpen})
  }
  
  setSelectedHours = (hours) => {
    this.setState({selectedHours: hours})
  }
  
  setSelectedMinutes = (minutes) => {
    this.setState({setSelectedMinutes: minutes})
  }
  setBellsStruck = (num, bellType) => {
    if (bellType == 'beginning'){
      this.setState({beginningBellsStruck: num})
    }else if (bellType == 'ending'){
      this.setState({endingBellsStruck: num})
    }
  }

  setBell = (bellType, bellFileName) => {
    
    if(bellType=='beginning'){
      this.setState({selectedBeginningBell: bellFileName})
    }else if(bellType=='middle'){
      this.setState({selectedMiddleBell: bellFileName})
    }else if(bellType=='ending'){
      this.setState({selectedEndingBell: bellFileName})
    }
    
}
 timeToMil = (time, lengthType=undefined) => {
   
    if( lengthType == 'seconds'){
      return 1000*(time)
    }else if(lengthType == 'minutes'){
      return 1000*(time)*60
    }else{
      return 1000*(time)*60**2
    }
    
 }
  setBellNumber = (bellType, num) => {
    if(bellType=='beginning'){
      this.setState({beginningBellNumber: num})
    }else if(bellType=='middle'){
      this.setState({middleBellNumber: num})
    }else if(bellType=='ending'){
      this.setState({endingBellNumber: num})
    
  }}

  setMiddleBellLengthType = (lengthType) => {
    this.setState({middleBellLengthType: lengthType})
  }

  modalXPressed = () => {
    this.setState({selectedBeginningBell: undefined, beginningBellNumber: 0, selectedMiddleBell: undefined, 
      middleBellNumber:0, selectedEndingBell: undefined, endingBellNumber: 0,
      middleBellLengthType: '...'})
  }
  modalCheckPressed = () =>{

  }

  _storeData = async (saveText) => {
                  
      await AsyncStorage.getAllKeys(async (errs,result) => {
        if (!errs) {
            
            var newKey = '';
            if (result !== null) {
              if(result.length > 0){
                newKey = parseInt(result[result.length-1])+1;
              }else{
                newKey = 1
              }
              // console.log(newKey);
              var saveData = {fullMeditationLength: this.state.fullMeditationLength, 
                selectedBeginningBell: this.state.selectedBeginningBell, 
                beginningBellNumber: this.state.beginningBellNumber, 
                selectedMiddleBell: this.state.selectedMiddleBell, 
                middleBellNumber: this.state.middleBellNumber, 
                selectedEndingBell: this.state.selectedEndingBell, 
                endingBellNumber: this.state.endingBellNumber,
                middleBellLengthType: this.state.middleBellLengthType,
              saveName:saveText}
              
              try {
                await AsyncStorage.setItem(''+newKey, JSON.stringify(saveData))
              } catch (e) {
                console.log('here is the error: ' + e)
              }
            }
         }
    })
    
      

  };

  getData = async (key) => {
    // console.log(key)
   
    var valueList = ['fullMeditationLength', 'selectedBeginningBell', 'beginningBellNumber',
      'selectedMiddleBell', 'middleBellNumber', 'selectedEndingBell', 'endingBellNumber',
      'middleBellLengthType']
    try {
      var value = await AsyncStorage.getItem(key)
      if(value !== null) {
        value = JSON.parse(value)
        for(var x of valueList){
          if(value[x] == null){
            value[x] = undefined          
          }
        }
        
        this.resetTimer()
        this.setState(value)
        this.setState({hasStarted: false, meditationLength: value['fullMeditationLength'],
        pauseCounter: 0, meditating:false})
        this.setTimeFromLength(value['fullMeditationLength'])
      
   
      }
    } catch(e) {
      
    }
  }



  render() {

    Menu.setDefaultRenderer(renderers.Popover);
    Menu.setDefaultRendererProps({placement:'left'})

    return (
      <MenuProvider >
      <LinearGradient colors={this.state.gradientColors} 
      style={{...styles.linearGradient, 
        // top:this.state.keyboardSpace? 0: 0,
        // bottom:this.state.keyboardSpace? 200-this.state.keyboardSpace: 0,
      }}
      >
        {/* <Button style= {{top:100, position: 'absolute',}}title='3' onPress={()=>{}}/> */}
        
        
        <View style={styles.menuButton}>
          <Menu>
            <MenuTrigger>
              <Entypo name='dots-three-vertical' color='gray' size={scale(25)} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={() => this.toggleAboutModal()}>
                <Text style={styles.menuItemText}>About  {' '} </Text>
              </MenuOption>

              <MenuOption onSelect={() => this.toggleLoadModal()}>
                <Text style={styles.menuItemText}>Load  {' '} </Text>
              </MenuOption>

              <MenuOption onSelect={() => this.toggleSaveModal()}>
                <Text style={styles.menuItemText}>Save  {' '} </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
              
        </View>  
        {/* <View> */}
        <LoadModal loadModalOpen={this.state.loadModalOpen}  toggleLoadModal={this.toggleLoadModal}
        gradientColors={this.state.gradientColors} getData={this.getData}/>
      {/* </View> */}

      {/* <View> */}
        <SaveModal saveModalOpen={this.state.saveModalOpen}  toggleSaveModal={this.toggleSaveModal}
        _storeData={this._storeData} gradientColors={this.state.gradientColors}/>
      {/* </View> */}

      <AboutModal aboutModalOpen={this.state.aboutModalOpen}  toggleAboutModal={this.toggleAboutModal}
      gradientColors={this.state.gradientColors}/>

      {/* <TimeSelectModal timeSelectModalOpen={this.state.timeSelectModalOpen}  
      toggleTimeSelectModal={this.toggleTimeSelectModal}
      gradientColors={this.state.gradientColors}
      // selectedHours={this.state.selectedHours}
      // selectMinutes={this.state.selectMinutes}
      setSelectedHours={this.setSelectedHours}
      setSelectedMinutes={this.setSelectedMinutes}
      hoursList={this.state.hoursList}
      minutesList={this.state.minutesList}
      /> */}

      <View style={{...styles.timerButton}}>
        <TimerButton setMeditationTime={this.setMeditationTime} setLengthFromTime={this.setLengthFromTime} 
        meditationTime={this.state.meditationTime} meditating={this.state.meditating}
        meditationLength={this.meditationLength} setHasStarted={this.setHasStarted}
        hasStarted={this.state.hasStarted}/>
      </View>
      <View style={styles.mainMenuButtonContainerView}>
      <View style={styles.bellModalButtonView}>

        <Icon.Button
            name="bell"
            color='black'
            size={scale(60)}
            // borderRadius ={2}
            style={{ left: 5}}
            backgroundColor="transparent"
            underlayColor="transparent"
            // backgroundColor="#3b5998"
            onPress={() => {if(!this.state.hasStarted){
              BackgroundTimer.stopBackgroundTimer();this.toggleModal()}}}>
        </Icon.Button>
          
        
        <BellModal toggleModal={this.toggleModal} bellModal={this.state.bellModal} gradientColors={this.state.gradientColors}
        setBell={this.setBell}
        bellNumber = {{beginning: this.state.beginningBellNumber, 
        middle: this.state.middleBellNumber, 
        ending: this.state.endingBellNumber }} modalXPressed={this.modalXPressed} 
        selectedBell={{beginning: this.state.selectedBeginningBell, 
        middle: this.state.selectedMiddleBell,  
        ending: this.state.selectedEndingBell}} setBellNumber={this.setBellNumber}
        modalCheckPressed={this.modalCheckPressed} 
        middleBellLengthType={this.state.middleBellLengthType}
        setMiddleBellLengthType={this.setMiddleBellLengthType}/>

      </View>
     
      <View style={styles.startButtonView}>
        
        <StartButton  meditationLength={this.state.meditationLength} 
        setMeditationTime={this.setMeditationTime} timetoLength={this.timeToLength} 
        setMeditationLength={this.setMeditationLength} setLengthFromTime={this.setLengthFromTime} 
        setTimeFromLength={this.setTimeFromLength} meditationTime={this.state.meditationTime}
        setMeditation={this.setMeditation} meditating={this.state.meditating}
        setHasStarted={this.setHasStarted} 
        fullMeditationLength={this.state.fullMeditationLength} 
        bellNumber = {{beginning: this.state.beginningBellNumber, 
          middle: this.timeToMil(this.state.middleBellNumber, this.state.middleBellLengthType), 
          ending: this.state.endingBellNumber }} modalXPressed={this.modalXPressed} 
        selectedBell={{beginning: this.state.selectedBeginningBell, 
          middle: this.state.selectedMiddleBell,  
          ending: this.state.selectedEndingBell}} setBellNumber={this.setBellNumber}
          modalCheckPressed={this.modalCheckPressed} 
          middleBellLengthType={this.state.middleBellLengthType}
          timeToMil={this.timeToMil} resetTimer={this.resetTimer}
          setBellsStruck={this.setBellsStruck} 
          bellsStruck={{beginning: this.state.beginningBellsStruck, 
                        ending: this.state.endingBellsStruck}}
        />
      </View>
      </View>
      
    {this.renderEndButton()}
    
    </LinearGradient>
    </MenuProvider> 
	);
  }
}
