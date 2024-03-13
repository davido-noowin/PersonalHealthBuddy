import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../authContext';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Body, ScoreDisplay } from '../phb_components'


const getCurrentDate=()=>{
 
	var date = new Date().getDate();
	var month = new Date().getMonth() + 1;
	var year = new Date().getFullYear();

	
	return year + '-' + month + '-' + date;
}


export function HomePage({ navigation }) {
	const [data, setData] = useState({
		message: {
		  recommendation: "",
		  total_score: 0,
		  score_food: 0,
		  score_exercise: 0,
		  score_wellness: 0,
		},
	});

	const {currentUser, setCurrentUser} = useContext(AuthContext);

	const getScores = async (username, date) => {
		try {
			var request_parameters = "?username=" + username + "&key_date=" + date;
			const res = await fetch("http://18.226.94.38:8000/api/get-score-rec" + request_parameters);
			const data = await res.json();
			setData(data);
			console.log(data);
		}
		catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	useEffect(() => {
		getScores(currentUser, getCurrentDate())
	  }, []);

    return (
      	<View style={PHB_STYLES.root_container}>
        	<PHB_Body scroll={false}>
			<View style={PHB_STYLES.center}>

				{data.message.recommendation && (
					<View style={styles.recommendation}>
						<Text>
							{data['message']['recommendation']}
						</Text>
					</View>
				)}

					<View style={PHB_STYLES.center}>
					<ImageBackground style={styles.octogon} source={require("../assets/mainscore_octogon.png")}>
						<Text style={[PHB_STYLES.body_text, {fontSize:28}]}> Your Score </Text>
						<Text style={[PHB_STYLES.body_text, {fontSize:42}]}>{data['message']['total_score']}</Text>
					</ImageBackground>
					</View>
					
					<View style={styles.scoreDisplays}>
					<ScoreDisplay navigation={navigation} score={data['message']['score_food']} title="Food" link='Food'/>
					<ScoreDisplay navigation={navigation} score={data['message']['score_exercise']} title="Exercise" link='Exercise'/>
					</View>

					<View style={styles.scoreDisplays}>
					<ScoreDisplay navigation={navigation} score={data['message']['score_wellness']} title="Wellness" link='Wellness'/>
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