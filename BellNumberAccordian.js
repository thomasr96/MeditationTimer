import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {Dimensions, ScrollView, Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const numberOfEndBells = 5;
var endBellNumberList = [];
for(var i = 0; i<numberOfEndBells; i++){
    endBellNumberList.push(i+1);
}
let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

export default class BellNumberAccordian extends Component {
    _isMounted = false;
    constructor(props){
        super(props)
        this.state = {
            activeSections: [],
        };
    }
      _updateSections = activeSections => {

      this.setState({ activeSections });
    };
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    toggleNumberAccordian = ()=>{
        // if(!bellSelectOpen && bellSelected)
        // console.log(this.props.bellNumberOpen)
        if (this.props.bellNumberOpen){
            this._updateSections([])
            this.props.toggleBellNumber()
        }else if(this.props.selectedBell!=undefined && !this.props.bellSelectOpen){
            this._updateSections([0])
            this.props.toggleBellNumber()
        }
    }
    getTouchableText = () => {
        // console.log('chosen: ' + this.props.bellChosen)
        // console.log('2: '+ this.props.selectedBell)
        if (this.props.bellNumber==0 || this.props.selectedBell==undefined){
            return(
            <Text style={styles.bellText}>
                Select the Number of Bells...
            </Text>
            );}
        else{
            return(
            <Text style={styles.bellText}>
                   {(this.props.bellNumber==1)? 
                   this.props.bellNumber +' bell selected' :this.props.bellNumber+ ' bells selected'
                     }
            </Text>
                );
        }
    }
      _renderTouchable =()=> {
          return(
        <TouchableOpacity key={this.getTouchableText()} onPress={()=>{this.toggleNumberAccordian()}}>
            {this.getTouchableText()}
        </TouchableOpacity>);
        }

  
      _renderEndBellNumberButtons = () => {return( endBellNumberList.map((num) => {
          return(
              <View key={num} style={styles.bellNumberButtonBarView
            }>
                  <TouchableOpacity
                  key={num}
                  onPress = {() => {
                      this.props.setBellNumber(this.props.bellType, num)
                    //   console.log(this.props.bellNumber)
                      this.toggleNumberAccordian();
                  }}
                  style={styles.bellNumberButton} >
                      <Text style={styles.bellNumberText}>
                          {''+num}
                      </Text>
                  </TouchableOpacity>
                  <View paddingVertical={'7%'} />
              </View>
          );
      }))}
      

      _renderContent = section => {
        let height = deviceHeight*.2;
        return (
            <View style={{flex:1, height:height*0.6 }}>
                <ScrollView style={{ height:height *0.7 }}>
                <View style={{flex:1}}>
                {this._renderEndBellNumberButtons()}
                </View>
        </ScrollView>
        </View>
        );
      };
      render() {
          return(
            <Accordion
                sections={[
                    {
                    title: 'Select a Number of Bells...',
                    content: [{title:'None', filename: undefined},],
                    },
                ]}
                touchableComponent={()=> this._renderTouchable()}
                activeSections={this.state.activeSections}
                renderHeader={()=>{}}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                underlayColor='gray'
                containerStyle={styles.bellAccordianContainer}
                // expandFromBottom={true}
            />
          );
      }
}