import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Pressable, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pedometer } from 'expo-sensors';
import GoogleFit, {Scopes} from 'react-native-google-fit';

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

	const updateStepCount = async (username) => {
		var data = null;

		if (Platform.OS === 'ios') {
			console.log("IOS");
			const isAvailable = await Pedometer.isAvailableAsync();

			if (isAvailable) {
				const start = new Date();
				const end = new Date();
				start.setDate(end.getDate() - 1);

				const step_count = await Pedometer.getStepCountAsync(start, end);
				data = { username: username, step_count: step_count.steps, date: end.toISOString().split('T')[0]};
			}
		} else if (Platform.OS === 'android') {
			console.log("ANDROID");
			const options = {
				scope: [
					Scopes.FITNESS_ACTIVITY_READ,
					Scopes.FITNESS_ACTIVITY_WRITE,
					Scopes.FITNESS_BODY_READ,
					Scopes.FITNESS_BODY_WRITE,
				]
			}
			await GoogleFit.authorize(options)
			.then(authResult => {
				if (authResult.success) {
					console.log("successfully authorized google fit")
				} else {
					console.log("failed to authorize google fit")
					return;
				}
			})
			
			const step_count = await GoogleFit.getDailySteps();
			data = { username: username, step_count: step_count };
		} else {
			console.log("OS not recognized")
		}

		if (data) {
			fetch("http://192.168.86.188:8000/api/update-step-count", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.success === true) {
					console.log(responseData.message);
				}
				else {
					console.log("step count failed to update");
				}
			});
		}
	};

	useEffect(() => {
		updateStepCount('john_doe@gmail.com');
	}, []);

	const getScores = async (username, date) => {
		try {
			var request_parameters = "?username=" + username + "&key_date=" + date;
			const res = await fetch("http://192.168.86.188:8000/api/get-score-rec" + request_parameters);
			const data = await res.json();
			setData(data);
			console.log(data);
		}
		catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	// console.log(getCurrentDate());

	useEffect(() => {
		getScores('john_doe@gmail.com', '2024-03-12')
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