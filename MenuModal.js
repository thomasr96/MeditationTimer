import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import { Animated, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

let deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width



export default class LoadModal extends Component{
   getSavedSettings = () => { AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            console.log(stores)
          stores.map((result, i, store) => {
              console.log(store)
            // get at each store's key/value so you can work with it
            // let key = store[i][0];
            // let value = store[i][1];
          });
        });
      });}

    //   renderedButtons = () =>{return  BELLSLIST.map((b, key) => {
    //     return(
    //       <View style={styles.bellButtonBarView}>
    //         <View style={styles.bellButtonView}>
    //           <TouchableOpacity
    //                onPress={()=>{
    //                 //  console.log('1')
    //                 this.toggleAccordian()
    //                 this.props.setBell(this.props.bellType, b.filename);
    //                 // this.setState({bellTitle: b.title})
    //                 if(b.title == 'None'){
    //                   // console.log(1)
    //                     // this.setState({bellTitle: b.title})
    //                     // this.props.toggleBellChosen();
    //                     this.props.setBellNumber(undefined, 0);
    //                 }
    //                  console.log('Song')
    //                 }}
    //               style={styles.bellSelectButton} >
    //                   <Text style={{flexDirection:'row',
    //                   justifyContent:'center', 
    //                   alignItems:'center',
    //                   color:'#cbc8c8'}}>
    //                       {b.title}
    //                   </Text>
    //                   {/* <View ={50} /> */}
    //                   <View  style={{width:90, height:10, right:50}}/>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={styles.bellButtonPlayView}>
    //         {/* {left: 3, top:1, width:60, height:30, alignItems:'center', justifyContent:'center'} */}
    //             {this._getPlayIcon(b)}            
    //         </View>
    //       </View>
    
    // )});}
    render(){
        return(
            //  <View style={styles.menuModalStyle}>
            //     <View style={{top:'2%'}}>
            //         <Text style={{color:'#ababab'}}>
            //             Meditation Timer
            //         </Text>
            //     </View>
                
            //     <View style={styles.menuButtonContainerView}>
            //         <View style={styles.menuLine} />
            //         <MenuButton buttonText={'Save Settings'} 
            //         // onPress={this.props.saveSettingsPressed()}
            //         />
            //         <View style={styles.menuLine} />
            //         <MenuButton buttonText={'Load Bells'}/>
            //         <View style={styles.menuLine} />
            //         <MenuButton buttonText={'Credits'}/>
            //         <View style={styles.menuLine} />
            //     </View>  
            // </View>

    //         <View style={{height:50, width:200, backgroundColor:'red'}}>
    //         <Button
    //     onPress={() => this.props.navigation.goBack()}
    //     title="Go back home"
    //   />
    //   </View>
            <Modal
            onShow = {() => this.getSavedSettings()}
            style={styles.outerModalStyle}
            expandFromBottom={false}
            animationType="slide"
            // transparent={true}
            visible={this.props.loadModalOpen}
            // visible={true}
            onRequestClose={() => {this.props.toggleLoadModal()
            
            }}>

            <View style={styles.loadModalStyle}>
                <View style={{top:0, left:0, right:0, height:40, backgroundColor: 'green', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#ababab'}}>
                        Meditation Timer
                    </Text>
                </View>
                
                <View style={{top:'5%', height:50, justifyContent:'space-between', backgroundColor:'red'}}>
                    <View>
                        <TouchableOpacity>
                            <Text>
                                Save 
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text>
                            Load Bells
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>
                            Credits
                        </Text>
                    </TouchableOpacity>

                </View>  
            </View>
          </Modal>
        );
    }
}