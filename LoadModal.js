import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {FlatList, TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import {SafeAreaView , Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import { Animated, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import LinearGradient from 'react-native-linear-gradient';

let deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width

export default class LoadModal extends Component{

    constructor(props){
        super(props)
        this.state = {loadData: [],
            DATA : [
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: 'First Item',
                },
                {
                  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                  title: 'Second Item',
                },
                {
                  id: '58694a0f-3da1-471f-bd96-145571e29d72',
                  title: 'Third Item',
                },
              ]}
    }
   getSavedSettings = () => { AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            for(var saveArr of stores){
                var key = saveArr[0]
                var saveName = JSON.parse(saveArr[1])['saveName']
                this.setState({loadData: this.state.loadData.concat({'key': key, 'saveName': saveName, 
                'deleted': false})})
            }
        });
      });}

      renderedLoadButton = (loadedSetting) =>{
  
        return(
            // <View style={{}}>
                <View style={styles.loadSettingItem}>
                    
                  
                    <View style={styles.loadButton}>
                        <TouchableOpacity onPress={()=> {
                            this.props.getData(loadedSetting['key'])
                            this.props.toggleLoadModal();
                            this.setState({loadData: []})
                            }}>
                            <Text style={styles.loadSettingItemText}>
                                {(loadedSetting['saveName'])?
                                loadedSetting['saveName']
                                :
                                'Untitled_' + loadedSetting['key']}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loadDeleteIconView}>

                        <MaterialCommunityIcons.Button
                            name="delete"
                            color={'red'}
                            size={scale(23)}
                            style={{padding: '-10%'}}
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            onPress={() => {
                                const filteredData = this.state.loadData.filter(item => item['key']!=loadedSetting['key'])
                                this.setState({loadData: filteredData})
                                AsyncStorage.removeItem(loadedSetting['key'])}} />

                    </View>

                </View>


    
    )}

    render(){
        
        return(
          
            <Modal
            onShow = {() =>this.getSavedSettings()}
            style={styles.outerModalStyle}
            expandFromBottom={false}
            animationType="slide"
            // transparent={true}
            visible={this.props.loadModalOpen}
            // visible={true}
            onRequestClose={() => {this.props.toggleLoadModal();
            }}>
            
            <LinearGradient colors={this.props.gradientColors}  style={styles.loadModalStyle}>
                <View style={styles.loadModalHeader}>
                     <View style={{width:25, height: 25, backgroundColor:'transparent',
                     justifyContent: 'flex-end', flexDirection: 'row-reverse'}}/>
 
                    <Text style={styles.loadModalHeaderText}>Load a Bell Setting</Text>

                    <Icon.Button
                        name="close"
                        color={'red'}
                        size={scale(25)}
                        backgroundColor="transparent"
                        underlayColor="transparent"
                        onPress={() => {
                            this.setState({loadData: []})
                            this.props.toggleLoadModal();}}
                    />



                </View>
                
                {/* <View style={styles.loadedItemsView}> */}
                    <SafeAreaView  style={styles.loadedItemsView}>
                        <View>
                            <FlatList
                            data={this.state.loadData}
                            renderItem={(item) =>  this.renderedLoadButton(item.item)}
                            keyExtractor={item => item.key}
                            />
                        </View>
                    </SafeAreaView >
                {/* </View> */}
            </LinearGradient>
          </Modal>
        );
    }
}