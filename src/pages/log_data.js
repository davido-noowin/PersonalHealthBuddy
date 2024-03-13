import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'
import { AuthContext } from '../../authContext';
import React, { useContext } from 'react';
import { getCurrentDate } from '../../current_date';


function logFood(data, username, date) {
    console.log("LOGGING FOOD WITH:", data, username, date);
    /* data contains the following: 
    *   fruits : bool
    *   vegetables : bool
    *   proteins : bool
    *   grains : bool
    *   dairy : bool
    *  CHANGE THE DATA WITH WHATEVER THE USER INPUTS
    */
   const food_data_to_send = {
        username: username,
        date: date,
        fruits: data.fruits,
        vegetables: data.vegetables,
        protein: data.protein,
        grains: data.grains,
        dairy: data.dairy
   };

   fetch("http://18.226.94.38:8000/api/log-food", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(food_data_to_send)
   })
   .then((response) => response.json())
   .then((responseData) => {
    console.log(JSON.stringify(responseData));
   })
   .catch((error) => console.error('Error:', error));
}


function logExercise(data, username, date) {
    console.log("LOGGING EXERCISE WITH:", data, username, date);
    /* data contains the following: 
    *   duration : int
    *   type : {cardio, strength, yogo, pilates, sport}
    *   steps : int - CALLED USING PEDOMETER
    *  CHANGE THE DATA WITH WHATEVER THE USER INPUTS
    */
    const exercise_data_to_send = {
        username: username,
        date: date,
        duration: data.duration,
        type: data.type,
        steps: data.steps
   };

   fetch("http://18.226.94.38:8000/api/log-exercise", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise_data_to_send)
   })
   .then((response) => response.json())
   .then((responseData) => {
    console.log(JSON.stringify(responseData));
   })
   .catch((error) => console.error('Error:', error));
}


function logWellness(data, username, date) {
    console.log("LOGGING WELLNESS WITH:", data, username, date);
    /* data contains the following: 
    *   screen_duration : float
    *   sleep_duration : float
    *  CHANGE THE DATA WITH WHATEVER THE USER INPUTS
    */
    const wellness_data_to_send = {
        username: username,
        date: date,
        duration: data.duration,
        type: data.type,
        steps: data.steps
   };

   fetch("http://18.226.94.38:8000/api/log-wellness", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(wellness_data_to_send)
   })
   .then((response) => response.json())
   .then((responseData) => {
    console.log(JSON.stringify(responseData));
   })
   .catch((error) => console.error('Error:', error));
}


async function getStepCount(username) {
    var step_count = 0;

    if (Platform.OS === 'ios') {
        const isAvailable = await Pedometer.isAvailableAsync();

        if (isAvailable) {
            const start = new Date();
            const end = new Date();
            start.setDate(end.getDate() - 1);

            step_count = await Pedometer.getStepCountAsync(start, end).steps;
        }
    }
    
    return step_count;
};

export function LogDataPage({ navigation }) {
    const { currentUser } = useContext(AuthContext);

    // logFood({"fruits" : 0, "vegetables" : 0, "protein" : 0, "grains" : 0, "dairy" : 0}, currentUser, getCurrentDate());

    return (
        <View style={PHB_STYLES.root_container}>

            <PHB_Body scroll={true}>

            <InfoContainer title="Food Checklist">
                <ScrollView  style={styles.scroll_view}>
                    <CheckListRow text="Meats and Proteins"/>
                    <CheckListRow text="Dairy"/>
                    <CheckListRow text="Grains"/>
                    <CheckListRow text="Vegetables"/>
                    <CheckListRow text="Fruits"/>
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
});

