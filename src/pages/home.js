import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Body, ScoreDisplay } from '../phb_components'


export function HomePage({ navigation }) {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const res = await fetch("http://myipv4address/");
			const data = await res.json();
			setData(data);
			console.log(data);
		}
		catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	  }, []);

	const recommend_text = "You slept 5 hours last night, let's go for 7-8 tonight!"
    return (
      	<View style={PHB_STYLES.root_container}>
        	<PHB_Body scroll={false}>
			<View style={PHB_STYLES.center}>

				<View style={styles.recommendation}>
					<Text>
						{data['message']}
					</Text>
					</View>

					<View style={PHB_STYLES.center}>
					<ImageBackground style={styles.octogon} source={require("../assets/mainscore_octogon.png")}>
						<Text style={[PHB_STYLES.body_text, {fontSize:28}]}> Your Score </Text>
						<Text style={[PHB_STYLES.body_text, {fontSize:42}]}>83</Text>
					</ImageBackground>
					</View>
					
					<View style={styles.scoreDisplays}>
					<ScoreDisplay navigation={navigation} score={87} title="Food" link='Food'/>
					<ScoreDisplay navigation={navigation} score={72} title="Exercise" link='Exercise'/>
					</View>

					<View style={styles.scoreDisplays}>
					<ScoreDisplay navigation={navigation} score={91} title="Wellness" link='Wellness'/>
					</View>

					<View style={styles.recommendation}>
					<Pressable onPress={()=>navigation.navigate('Log Data')}>
						<Text>Log Data</Text>
					</Pressable>
				</View>
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

    scoreDisplays:{
      //borderWidth: 5,
      width: '80%',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }

});