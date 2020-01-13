import DatePicker from 'react-native-datepicker';
import BackgroundTimer from 'react-native-background-timer'
import React, { Component } from 'react';
import styles from './Styles'
import {Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet} from 'react-native';
// import _BackgroundTimer from 'react-native-background-timer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// //

export default class TimerButton1 extends Component{
  constructor(props){
    super(props);
    this.state = {timeSet:false}
  }
    
    timerIcon = () =>{
      return(<Button style={styles.header} 
        title="Start"
      />);
    }
    render(){
      var timeToMil = (time) => {
        time = time.split(':')
        return 1000*(time[0]*60**2 + time[1]*60)
      }

      return(
        <DatePicker
        style={styles.timerText} 
        // date={(this.props.meditationTime == '00:00')? '0:00': false}
        date={this.props.meditationTime}
        // getDateStr={rawDate => this.props.meditationTime}
        // date={false}
        mode="time"
        maxDate="2016-06-01"
        showIcon={false}
        disabled={(this.props.hasStarted)? true : false}
        androidMode='spinner'
        cancelBtnText="Cancel"
        // style={{BackgroundTimer: 'black'}}
        
        customStyles={{
          dateTouch: {
            width: scale()
          },dateTouchBody: {
            flexDirection: 'row',
            height: scale(10),
            alignItems: 'center',
            justifyContent: 'center'
          },
          dateIcon:
          {width:1},
          // datePickerMask: {backgroundColor:'red'},
          dateInput: {
            flex: 1,
            height: 0,
            // width:30,
            borderWidth: scale(0),
            borderColor: '#d9fcdc',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 0
          },
          dateText: {
              color:'#e3e4e2',
              // fontWeight: 'normal',
              // fontWeight: '400',
              // fontStyle: 'sans-serif'
              fontSize: scale(10)
          },
          placeholderText: {
            fontSize: 20,
            color: '#000000',
            fontFamily: 'sans-serif'
          },
          
            }
          }
            
            onDateChange={(date) => {
              BackgroundTimer.stopBackgroundTimer()
              this.props.setMeditationTime(date);
              this.props.setLengthFromTime(date);
              // this.props.setHasStarted()
            }}

            getDateStr={rawDate => {

              var hours = rawDate.getHours()
              var minutes = rawDate.getMinutes()
              var seconds = this.props.meditationTime.split(':')[2]
              if (hours < 10){
                hours = '0' + hours
              }
              if (minutes < 10){
                minutes = '0' + minutes
              }
              if (seconds < 10 && seconds > 0 || seconds == '0'){
                seconds = '0' + seconds
              }
              return hours + ':' + minutes  + ':' + seconds
            }}
            />	
      );
    }
}




// var displayDate =  new Date('1996-03-16T00:00:00');

//  class App extends Component {
  
//   state = {
//     date: new Date (displayDate.getTime() + displayDate.getTimezoneOffset()*60000),
//     mode: 'date',
//     show: false,
//   }

//   setDate = (event, date) => {
//     // console.log(date)
//     date = date || this.state.date;

//     this.setState({
//       show: Platform.OS === 'ios' ? true : false,
//       date,
//     });
//   }

//   show = mode => {
//     this.setState({
//       show: true,
//       mode,
//     });
//   }

//   datepicker = () => {
//     this.show('date');
//   }

//   timepicker = () => {
//     this.show('time');
//   }
//   getDateStr= (rawDate) => {
//     // console.log(rawDate)
//     var hours = rawDate.getHours()
//     var minutes = rawDate.getMinutes()
//     // var seconds = this.props.meditationTime.split(':')[2]
//     var seconds = rawDate.getSeconds()

//     if (hours < 10){
//       hours = '0' + hours
//     }
//     if (minutes < 10){
//       minutes = '0' + minutes
//     }
//     if (seconds < 10 && seconds > 0 || seconds == '0'){
//       seconds = '0' + seconds
//     }
//     return hours + ':' + minutes  + ':' + seconds
//   }

//   render() {
//     const { show, date, mode } = this.state;

//     return (
//       <View>

//         <View>
//           <TouchableOpacity  onPress={this.timepicker} style={{height: 20,borderWidth:1, transform: [{ scaleX: 5 }, { scaleY: 7 }] }}>
//             <Text style={styles.timerTextN}>
//             {this.getDateStr(this.props.meditationTime)}
//               {/* {this.getDateStr( new Date (this.props.meditationTime.getTime() + this.props.meditationTime.getTimezoneOffset()*60000))} */}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         { show && <DateTimePicker 
//                     value={this.props.meditationTime}
//                     mode={'time'}
//                     is24Hour={true}
//                     display="spinner"
//                     onChange={ (event, date) => {this.setState({show:false}); if(date!=undefined)this.props.setMeditationTime(date)}} />
//         }
//       </View>
//     );
//   }
// }