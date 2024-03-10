import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { InfoContainer, PHB_Body } from '../phb_components'

export function ViewExercisePage({ navigation }) {

    const [exerciseData, setExerciseData] = useState({
        log: {},
        success: false
	});

	const getExerciseScores = async (username) => {
		try {
			var request_parameters = "?username=" + username;

            //!!! change the url to yours to test
            //must also add recent data to view (>5 days from now)
            console.log("sending request to " + "http://192.168.86.25:8000/api/get-exercise" + request_parameters)
			const res = await fetch("http://192.168.86.25:8000/api/get-exercise" + request_parameters);
			const data = await res.json();
			setExerciseData(data);
            console.log("exerciseData: " + JSON.stringify(exerciseData, null, 2));
			
		}
		catch (error) {
			console.log("Error fetching data:", error);
		}
	};
    //"{'cardio'}" -> Cardio
    const parseExerciseType = (exercise_type) =>{
        if(exercise_type.length >= 4){
            return exercise_type.charAt(2).toUpperCase() + exercise_type.slice(3, -2)
        }
        return exercise_type
    }

    useEffect(() => {
		getExerciseScores('john_doe@gmail.com');
	  }, []);

    return (
        <View style={PHB_STYLES.root_container}>

            <PHB_Body scroll={true}>
             
                <InfoContainer title="Past Step Count">
                    <ScrollView>

                    
                    {
                        Object.entries(exerciseData.log).flatMap(([key, object], i) => { return object.steps != 0?(
                            <Text key={object.date} style={[PHB_STYLES.center, styles.list_text]}>
                                {object.date}: {object.steps} Steps
                            </Text>
                        ) : []})
                    }
                    </ScrollView>
                </InfoContainer>

                <InfoContainer title="Past Workouts">
                    <ScrollView>
                    {
                        Object.entries(exerciseData.log).map(([key, object], i) => { return (
                            <View key={object.date}>
                            <Text style={[PHB_STYLES.center, styles.list_text]}>
                                {object.date}: {parseExerciseType(object.type)} - {object.duration}
                            </Text>
                            </View>)
                        })
                    }
                    </ScrollView>
                </InfoContainer>
            </PHB_Body>
    
            <StatusBar style="auto" />
        </View>
    );
}
    
const styles = StyleSheet.create({
    scroll_view:{
        height: '90%',
        width: '50%',
        margin: '10%',
    },
    list_text:{
        fontSize: 20,
        paddingVertical: 10,
        alignSelf: "center"
    },
});

