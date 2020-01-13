import React, { Component } from 'react';
import Modal from "react-native-modal";
import styles from './Styles'
import {Linking, FlatList, TouchableOpacity, Platform, Alert, Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import {SafeAreaView , Picker, Image,CustomImage, TouchableHighlight} from 'react-native';
import { Animated, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

// let deviceHeight = Dimensions.get('window').height
// let deviceWidth = Dimensions.get('window').width

  

export default class LoadModal extends Component{


    render(){
        
        return(
          
            <Modal
            style={styles.outerModalStyle}
            expandFromBottom={false}
            animationType="slide"
            visible={this.props.aboutModalOpen}
            // visible={true}
            onRequestClose={() => {this.props.toggleAboutModal();
            }}>
            
            <LinearGradient colors={this.props.gradientColors}  style={styles.aboutModal}>
                <View style={styles.aboutModalView}>
                     <View style={styles.aboutModalHeader}/>
 
                    <Text style={styles.aboutModalHeaderText}>About Meditation Timer</Text>

                    <Icon.Button
                    name="close"
                    color={'red'}
                    size={scale(25)}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    onPress={() => {
                        this.setState({loadData: []})
                        this.props.toggleAboutModal();}}
                    />
                    </View>
                    <View style={styles.aboutModalContainer}>
                    
                        <ScrollView style={styles.aboutModalScroll}>
                            <Text style={styles.creditsText}>
                                Credits: {'\n'}
                            </Text>
                            <Text style={styles.aboutModalContentText}>
                                -App by Thomas Retzloff (contact: meditationtimerapp@gmail.com) 
                                {'\n\n'}
                                -Code for the app 
                                can be found at {' '} <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://github.com/thomasr96')}}
                                >www.github.com/thomasr96</Text> {'\n\n'}

                                -The meditation icon was made by {' '}
                                
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://www.flaticon.com/authors/freepik')}}>
                                    Freepik
                                </Text>

                                 {' '} from {' '}

                                 <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://www.flaticon.com/')}}>
                                    www.flaticon.com {'\n\n'}
                                </Text>
                          
                                -The bell sound was made by {' '}
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://freesound.org/people/JetRye/')}}
                                >JetRye</Text> 
                                 {' '} from {' '} 
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://www.freesound.org')}}
                                >www.freesound.org</Text> 

                                {'\n\n'}

                                -The brass singing bowl sound was made by {' '}
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://freesound.org/people/Monkay/')}}
                                >Monkay</Text>
                                {' '} from {' '} 
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://www.freesound.org')}}
                                >www.freesound.org</Text> 
                                
                                {'\n\n'}

                                -The singing bowl sound was made by {' '} 
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://freesound.org/people/s-light/')}}
                                >s-light</Text>
                                {' '} from {' '} 
                                <Text style={{textDecorationLine:'underline'}} 
                                onPress={() => {Linking.openURL('https://www.freesound.org')}}
                                >www.freesound.org</Text> 
                                
                                {'\n\n'}
                                -All sounds were edited after retreival
                            </Text>
                            {/* <Text>App</Text> */}
                        </ScrollView>
                </View>
                </LinearGradient>
          </Modal>
        );
    }
}