
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Header, PHB_Body } from '../phb_components'

export function HomePage({ navigation }) {
    return (
      <View style={PHB_STYLES.root_container}>
  
        <PHB_Header navigation={navigation}/>

        <PHB_Body scroll={false}>
          <View style={PHB_STYLES.center}>

            <View style={styles.recommendation}>
              <Text>
                You slept 6 hours last night, let's go for 7-8 tonight!
              </Text>
            </View>

            <View style={PHB_STYLES.center}>
              <ImageBackground style={styles.octogon} source={require("../assets/mainscore_octogon.png")}>
                <Text style={[PHB_STYLES.body_text, {fontSize:28}]}>Your Score</Text>
                <Text style={[PHB_STYLES.body_text, {fontSize:42}]}>83</Text>
              </ImageBackground>
            </View>
            
            {/* add other octogons later */}

            <Button
              title="Log Food"
              onPress={() => navigation.navigate('LogFood')}
            />
            <Button
              title="Log Exercise"
              onPress={() => navigation.navigate('LogExercise')}
            />
            <Button
              title="Log Wellness"
              onPress={() => navigation.navigate('LogWellness')}
            />
            <Button
              title="Login Page"
              onPress={() => navigation.navigate('Login')}
            />
            </View>

        </PHB_Body>
  
          
  
        <StatusBar style="auto" />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    recommendation:{
      backgroundColor:'#9BBEC8', 
      marginVertical:20,
      padding: 10,
      //bottom: '20%',
    },

    octogon:{
      height:200,
      width:200,
      alignItems: 'center',
      justifyContent: 'center',
    },

});