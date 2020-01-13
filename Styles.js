import {StyleSheet, Keyboard} from 'react-native';
import {  Dimensions } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// var keyboardSpace = 0;
// let sWidth = Dimensions.get('window').width
// let sHeight = Dimensions.get('window').height
// Keyboard.addListener('keyboardDidShow',(frames)=>{
//   if (!frames.endCoordinates) return;
//   keyboardSpace = frames.endCoordinates.height
// });
// Keyboard.addListener('keyboardDidHide',(frames)=>{
//   keyboardSpace = 0;
// });

export default StyleSheet.create({
  linearGradient: {
      flex: 2, 
      // backgroundColor: '#F6C7F7', 
      
      backgroundColor: '#a6f7f0', 
      alignItems:'center', 
      justifyContent: 'center'
    },
    menuButton: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems:'center',
      right: scale(-4), 
      top: scale(3), 
      width: scale(37), 
      height: scale(37),
    //  backgroundColor:'red'
     },
     menuItemText: {
       fontSize: scale(16)
     },
    
    loadModalStyle: {
      flex:.4,
      marginLeft:'10%',
      marginRight:'10%',
      top:0,
      bottom:0,
      backgroundColor: '#4d4d4d',
      // alignItems: 'center',
      // marginLeft: 10,
      // marginRight: 10,
      // backgroundColor: 'green'
    },  
    loadModalHeader: {top:'1%',
                    // backgroundColor:'orange',
       justifyContent: 'space-between', 
       flexDirection:'row',  
       alignItems: 'center',
    },
    loadModalHeaderText: {
      color:'#bababa', 
      fontSize: scale(17)
    },
    loadedItemsView: { 
      marginLeft: scale(18), 
      marginRight: scale(18), 
      top:'4%',
      height:'70%', 
      // backgroundColor:'red'
    },
    loadSettingItem: {
      flexDirection:'row', 
      justifyContent:'flex-start', 
      alignItems:'center',
      paddingBottom:'4%',
    },
    loadSettingItemText: {
      color:'#bababa', 
      fontSize:scale(17)
    },
    loadButton: {
      width:'80%'
    },
    loadDeleteIconView: {
      width:'20%', 
      justifyContent:'center', 
      alignItems:'center'
    },
    saveModalStyle: {
      flex:.2,
      marginLeft:'10%',
      marginRight:'10%',
      top: scale(-20),
      bottom:scale(-20),
      // backgroundColor: '#4d4d4d',
      // alignItems: 'center',
      // marginLeft: 10,
      // marginRight: 10,
      // backgroundColor: 'green'
      },
    saveModalIconBarView: {
      flex:1,
      left:0, 
      right: 0,
      height: scale(15), 
      bottom: scale(5), 
      flexDirection:'row', 
      justifyContent: 'center',
        // backgroundColor:'orange', 
      alignItems:'center',
    },
    saveModalInputView: {
      flex:3, 
      justifyContent:'center', 
      left:0, 
      right: 0,
      alignItems:'center'
    },
    saveModalInput: { 
      borderWidth: 1, 
      alignItems: 'center', 
      borderColor: 'black', 
      color:'#bbb9b9',
      borderRadius: 3, 
      fontSize: scale(12),
      width: '75%'
    },
    aboutModal: {
      flex:.4,
      marginLeft:'10%',
      marginRight:'10%',
      top:0,
      bottom:0,
      justifyContent: 'center',
      backgroundColor: '#4d4d4d',
      // alignItems: 'center',
      // marginLeft: 10,
      // marginRight: 10,
      // backgroundColor: 'green'
      },
      aboutModalView: {
        // top:'1%',
      // backgroundColor:'orange',
        justifyContent: 'space-between', 
        flexDirection:'row',  
        alignItems: 'center',
    },
    aboutModalHeader: {
      width:scale(15), 
      height:scale(45), 
      backgroundColor:'transparent',
      justifyContent: 'flex-end', 
      flexDirection: 'row-reverse'
    },
    aboutModalHeaderText:{
      color:'#bababa', 
      fontSize: scale(15)
    },
    creditsText: {
      color:'#bababa'
    },
    aboutModalContainer:{
      alignItems:'center', 
      justifyContent: 'center', 
      paddingBottom:'4%'
    },
    aboutModalScroll:{
      // backgroundColor:'red', 
      width: '80%', 
      height: '80%'
    },
    aboutModalContentText: {
      fontSize: scale(10), 
      color:'#bababa'
    },
    // menuButtonContainerView: {
    //   top:'5%', 
    //   height:500, 
    //   width:'90%',
    //             // backgroundColor:'red'
    // },
    // innerMenuButtonView: {
    //   margin:10
    // },
    // innerMenuButton: {
    //   alignItems:'center'
    //   // borderWidth: 1, 
    //   // borderColor: 'black',
    //   // borderRadius: 3, 
    // },
    // // container: {
    // //  flex: 1,
    // //  justifyContent: 'center',
    // // },
  //   menuButtonText: {
  //     color: '#c9c9c9', 
  //     fontSize: 19
  // },
  // menuLine: {
  //   borderBottomColor: '#343232',
  //   borderBottomWidth: 1,
  // },
  timerButton: {
      // backgroundColor: 'green',
      // width: scale(40),
      width: '12%',
      height: scale(9),
      alignItems:'center',
      overflow: 'hidden',
      // flex:.3,
      position: 'absolute',
      top: '13%',
      // top: 100,
      // width: '90%',
      justifyContent: 'center',
      transform: [{ scaleX: 6.5 }, { scaleY: 9.7 }] ,
      alignItems: 'center'
  
    },
    // controlPanel: { 
    //   justifyContent: 'center',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   backgroundColor: 'red',
    //   width:100, 
    //   height:100
    // },
    timerTextN: { 
      
      color: '#e3e4e2',
      // transform: [{ scaleX: 5 }, { scaleY: 7 }] 
    },
    timerText: { 
      // height: 100,
      // transform: [{ scaleX: 7 }, { scaleY: 10 }] 
    },
    // buttonContainer: {
    //   margin: 20
    // },
    // timeText: {
    //   fontSize: 80,
    //   textAlign: 'center',
    //   margin: 10
    // },
    // timer: {
    //     width:100,
    //     height:75
    // },
    mainMenuButtonContainerView: {
      justifyContent: 'center', 
      alignItems:'center',
      // backgroundColor:'orange',
      top: '5%'
    },
    bellModalButtonView: {
      // flex:1, 
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',
      // top:'2%',
      width:'30%', 
      height:'10%'
    },
    startButtonView: {
      top:'35%',
      justifyContent:'center',
      alignItems: 'center',
      // backgroundColor:'green', 
    },
    startButton:{
        // top:100,
        width:scale(70),
        height:scale(70),
        // backgroundColor:'green'
    },
    pauseButton: {
      textAlign: 'center', 
      justifyContent:'center',
      left:'9%'
  },
    circularProgressBar:{
      // top:100,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    endButtonView: {
      position: 'absolute', 
      justifyContent: 'center',
      alignItems: 'center',
      // bottom: scale(30),
      bottom: scale(10), 
      width: scale(50), 
      height: scale(50), 
      // backgroundColor: 'powderblue'
    },
    endButton: {
      alignItems:'center', 
      justifyContent:'center', 
      backgroundColor: 'red',
      borderWidth: 0, 
      borderColor: 'black',
      borderRadius: 50, 
      width: scale(57),
      height: scale(25)
    },
    endButtonText: {
      color: 'white',
      // fontSize: 13,
      fontSize: scale(11)
    },
    modalStyle: {
      flex:.7,
      // position: 
      // marginLeft: '2%',
      // marginRight: '2%',
      // backgroundColor: '#ffffff'
    },
    outerModalStyle: {
      position: 'absolute',
      // backgroundColor:'red',
      // top:'20%',
      // bottom:'20%',
      // marginLeft:.,
      // padding:20,
      padding: scale(20),
      // width:250,
      // height:150,
      bottom: scale(-20),
      top: scale(-20),
      left: scale(-20),
      right: scale(-20),
      // width:250,
      // height:150, 
      backgroundColor:'rgba(0,0,0,.6)'
    },
    modalBar: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#00000000',
      flexDirection: 'row'
    },
    modalCloseButton: {
    // "margin-left: auto",
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
    },
    modalBarText: {
    //   textAlignVertical: "center", 
    //   alignSelf:'center', 
    color: 'black',
    fontWeight: "bold",
    fontSize: scale(20)
    },
    bellBar: {
        flexDirection: 'row',
        justifyContent: 'center',
    //   flex: 3
    },
    bellPickerButton: {
    // flex: 1
    },

    slide1: {
      position: 'absolute', 
      flex: 1,
      justifyContent: 'center',
      top:0,
      left:0,
      right:0, 
      bottom:0,
    //   alignItems: 'center',
      backgroundColor: '#ffffff',
      // alignItems: 'center'
    },
    // text: {
    // //   color: '#fff',
    //   fontSize: 30,
    //   fontWeight: 'bold'
    // },
    bellText:{
      color:'#bababa',
      fontSize: scale(15)
    },
    bellSelectAccordianView: {
      left:0, 
      right:0, 
      bottom:scale(40), 
      position:'absolute'
    },
    bellNumberAccordianView: {
      left:0, 
      right:0, 
      top:scale(5), 
      position:'absolute'
    },
    bellFrequencyView: {
      flexDirection:'row', 
      left:0, 
      right:0, 
      top:  scale(3),
      position:'absolute', 
      // backgroundColor:'red'
    },
    bellFrequencyViewKeyboard: {
      flexDirection:'row', 
      left:0, 
      right:0, 
      top:  scale(-20),
      position:'absolute', 
      // backgroundColor:'red'
    },
    bellButtonBarView: {
      width:'90%',
      height:'7%',
      flexDirection:'row',  
      // paddingBottom:'4%', 
      alignItems:'center',
    },
    bellButtonView: { 
       width:'90%',
       height: scale(35),
    },
    bellSelectButton: {
      // flex:6,
      borderWidth: 1,  
      justifyContent:'center', 
      alignItems:'center',
      borderColor: '#cbc8c8',
      borderRadius: 3,
      height: '100%',
      width:'100%',
    },
    bellButtonPlayView: {
      // top:'3%', 
      left: scale(4),
      alignItems:'center', 
      justifyContent:'center'
    },
    bellButtonText: {
      flexDirection:'row',
      justifyContent:'center', 
      alignItems:'center',
      color:'#cbc8c8',
      fontSize: scale(10)
    },
    bellButtonPlay: {
      marginTop:-10, 
      marginBottom:-10,
      // backgroundColor:'yellow' 
      // marginVertical:0, 
      // top: ;'50%'
      // right:100,
      // left:100
    },
    bellAccordianContainer: {
      borderWidth: 1, 
      borderColor: 'black',
      borderRadius: 3, 
      paddingVertical: '3%', 
      paddingHorizontal: '3%'
    },
    bellNumberButtonBarView: {
      flex:1,
      flexDirection:'row',  
      alignItems:'center',
    },
    bellNumberButton: {
      flex:1,
      bottom:0,
      borderWidth: 1,  
      justifyContent:'center', 
      alignItems:'center',
      borderColor: '#cbc8c8',
      borderRadius: 3,
      height:'70%'
    },
    bellNumberText: {
      flexDirection:'row',
      justifyContent:'center', 
      alignItems:'center',
      color:'#cbc8c8',
      fontSize: scale(10)
    },
    frequencyInput: {
      justifyContent: 'center',
      borderWidth: 1, 
      alignItems: 'center',
      borderColor: 'black',
      borderRadius: 3, 
      // flex:1,
      width: scale(45),
      height: scale(40),
      textAlign: 'center'
      // alignItems: 'flex-end'
      // paddingVertical: 8, 
      // paddingHorizontal: 1
    },
    frequencyPickerText: {
      // flex: .2,
      bottom: 0,
      // left:10,
      color:'#bababa',
      fontSize:scale(14)
    },
    frequencyPickerTextView: {
      // flex: 1,
      left: scale(3),
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',    
    },
    frequencyInputView: {
      // flex: .4
      left: scale(25),
      justifyContent: 'center',
      alignItems: 'center',
    },
    frequencyPickerView: {
      // flex: .85,
      top: scale(2),
      left: scale(35),
      width:scale(115), 
      // backgroundColor: 'blue',    
    },
    frequencyPicker: {
      // top: 40,
      // width: 10,
      transform: [
        { scaleX: 1 }, 
        { scaleY: 4.5 },
     ],
      fontSize: scale(35),
    },
    // bellAccordianText: {
    //   color:'#bababa',
    //   fontSize: 4
    // },
  });