import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {Dimensions, ScrollView, Picker, Image,CustomImage, TouchableHighlight, TouchableHighlightBase} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Sound from 'react-native-sound';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const BELLSLIST = [
    {title:'None', filename: undefined},
    {title:'Bell C1', filename: 'bell_140128__jetrye__bell_meditation_cleaned_c1.wav'},
    {title:'Bell C2', filename: 'bell_140128__jetrye__bell_meditation_cleaned_c2.wav'},
    {title:'Bell C3', filename: 'bell_140128__jetrye__bell_meditation_cleaned_c3.wav'},
    {title:'Bell C4', filename: 'bell_140128__jetrye__bell_meditation_cleaned_c4.wav'},
    {title:'Bell C5', filename: 'bell_140128__jetrye__bell_meditation_cleaned_c5.wav'},
    {title:'Brass Singing Bowl C5', filename: 'bell_169289__qubodup__gong_bell_monkay_s_singing_bowl_modified_c5.wav'},
    {title:'Brass Singing Bowl C6', filename: 'bell_169289__qubodup__gong_bell_monkay_s_singing_bowl_modified_c6.wav'},
    {title:'Brass Singing Bowl C7', filename: 'bell_169289__qubodup__gong_bell_monkay_s_singing_bowl_modified_c7.wav'},
    {title:'Singing Bowl C3', filename: 'bell_415135__s_light__singing_bowl_single_strike_1_c3.wav'},
    {title:'Singing Bowl C4', filename: 'bell_415135__s_light__singing_bowl_single_strike_1_c4.wav'},
    {title:'Singing Bowl C5', filename: 'bell_415135__s_light__singing_bowl_single_strike_1_c5.wav'},
    {title:'Singing Bowl C6', filename: 'bell_415135__s_light__singing_bowl_single_strike_1_c6.wav'},
    {title:'Singing Bowl C7', filename: 'bell_415135__s_light__singing_bowl_single_strike_1_c7.wav'},
    // {title:'bell13', filename: 'bell_439233__zambolino__singing_bowl_gong_c2.wav'},
    // {title:'bell14', filename: 'bell_439233__zambolino__singing_bowl_gong_c3.wav'},
    // {title:'bell15', filename: 'bell_439233__zambolino__singing_bowl_gong_c4.wav'},
    // {title:'bell16', filename: 'bell_439233__zambolino__singing_bowl_gong_c5.wav'},
    // {title:'bell17', filename: 'bell_439233__zambolino__singing_bowl_gong_c6.wav'},
    // {title:'bell18', filename: 'bell_439233__zambolino__singing_bowl_gong_c7.wav'},    
    
]

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

export default class BellAccordian extends Component {
  _isMounted = false;
  constructor(props){
    super(props)
    this.state = {
      activeSections: [],
      bellTitle: undefined,
      currentPlayingSound: undefined,
      
    };
}
    componentDidMount() {
      this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
      _updateSections = (activeSections) => {
        this.setState({ activeSections });
      };
    toggleAccordian = ()=>{

        if (this.props.bellSelectOpen){
            
            this._updateSections([])
            this.props.toggleBellSelect()
        }else if (!this.props.bellNumberOpen){
            this._updateSections([0])
            this.props.toggleBellSelect()
        }
    }
    getTouchableText = () => {
      
        if(this.props.selectedBell != undefined){
          
          var bellTitle = ''
         
          for(var bell of BELLSLIST){
            if (bell.filename == this.props.selectedBell){
              bellTitle = bell.title
              break;
            }
          }
         
        }
        if (this.props.selectedBell == undefined){
            return(
            <Text style={styles.bellText}>
                Select a Bell...
            </Text>
            );}
        else{
            return(
            <Text style={styles.bellText}>
                   {bellTitle}
            </Text>
                );
        }
    }
    _renderTouchable =(bellSelectOpen, bellNumberOpen, toggleBellSelect)=> {
        return(
      <TouchableOpacity 
      key={this.getTouchableText()}
      onPress={() => this.toggleAccordian()
      
      }>
          {this.getTouchableText()}
      </TouchableOpacity>);
      }
      
      _renderHeader = section => {
        return (
          <View >
            <Text style={styles.bellAccordianText}>{section.title}</Text>
          </View>
        );
      };
      _getPlayIcon = (b) => {
        if (!(b.title=='None')){
        return(<Icon.Button
            size={scale(30)}
            iconStyle = {styles.bellPlayButton}
            name="play-circle"
            color={'black'}
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              const sound = new Sound(b.filename, null, (error) => {
                if (error) {
                    console.log(JSON.stringify(error))
                }
                if (this.state.currentPlayingSound != undefined){
                  this.state.currentPlayingSound.stop()
                }
                this.setState({currentPlayingSound: sound})
                sound.play();
            });
            }}>
        </Icon.Button> )}
        }


    renderedButtons = () =>{return  BELLSLIST.map((b, key) => {
        return(
          <View key={key} style={styles.bellButtonBarView}>
            <View style={styles.bellButtonView}>
              <TouchableOpacity
                key={key}
                   onPress={()=>{
                   
                    this.toggleAccordian()
                    this.props.setBell(this.props.bellType, b.filename);
                    // this.setState({bellTitle: b.title})
                    if(b.title == 'None'){
                        this.props.setBellNumber(undefined, 0);
                    }
                    //  console.log('Song')
                    }}
                  style={styles.bellSelectButton} >
                      <Text style={styles.bellButtonText}>
                          {b.title}
                      </Text>
                      {/* <View  style={{width:90, height:10, right:50}}/> */}
                      
                </TouchableOpacity>
                <View paddingVertical={'7%'} />
            </View>
            <View style={styles.bellButtonPlayView}>
            {/* {left: 3, top:1, width:60, height:30, alignItems:'center', justifyContent:'center'} */}
                {this._getPlayIcon(b)}            
            </View>
          </View>
    
    )});}
     
      
      _renderContent = section => {
        
        let height = deviceHeight*.2;
        return (
            <View style={{flex:1, height:height*0.6 }}>
                <ScrollView style={{ height:height *0.7 }}>
                <View>
                {this.renderedButtons()}
                </View>
                {/* <Text>{x}</Text> */}
                {/* <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')}/> */}
              </ScrollView>
        </View>
        );
      };
    
      

      render() {
          return(
            <Accordion
        sections={[
            {
              title: 'Select a Bell...',
              content: BELLSLIST,
            },
          ]}
          touchableComponent={()=> this._renderTouchable()}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        // onChange={(a)=>console.log(a)}
        underlayColor='gray'
        containerStyle={styles.bellAccordianContainer}
        // collapsed={true}
    />
          );
      }
}
