import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Switch, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'
import { AuthContext } from '../../authContext';
import React, { useContext, useState } from 'react';
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
    else {
        step_count = 1000;
    }
    
    return step_count;
};


export function LogDataPage({ navigation }) {
    const step_count = getStepCount()['_j'];
    // console.log("Step count: ", step_count);
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const [fruits, setFruit] = useState(false);
    const [vegetables, setVeg] = useState(false);
    const [grains, setGrain] = useState(false);
    const [dairy, setDairy] = useState(false);
    const [meats, setMeat] = useState(false);

    const [exercise, setExercise] = useState('');
    const [sleep, setSleep] = useState('');
    const [screen_time, setScreen] = useState('');

    const changeText = (setValue) = (text) => {
        // Regular expression to allow only digits and backspace
        const regex = /^\d+\b/;
        const newValue = text.replace(regex, '');
        setValue(newValue);
      };

    const toggleSwitch = (setIsEnabled) => setIsEnabled(previousState => !previousState);

    return (
        <View style={PHB_STYLES.root_container}>
            <PHB_Body scroll={true}>
            <InfoContainer title="Food Checklist">
                <ScrollView  style={styles.scroll_view}>
                <Button title='Log Food' onPress={logFood({
                    fruits: fruits ? 1 : 0,
                    vegetables: vegetables ? 1 : 0,
                    protein: meats ? 1 : 0,
                    grains: grains ? 1 : 0,
                    dairy: dairy ? 1 : 0,
                    }, currentUser, getCurrentDate())}>
                </Button>

                    <Text>Fruits: {fruits? 'Y': 'N'}</Text>
                    <Text>Veg: {vegetables? 'Y': 'N'}</Text>
                    <Text>Grain: {grains? 'Y': 'N'}</Text>
                    <Text>Dairy: {dairy? 'Y': 'N'}</Text>
                    <Text>Meat: {meats? 'Y': 'N'}</Text>
                    
                    {/* <Text>{step_count} steps</Text> */}
            {/* 
                    <Switch
                        trackColor={{false: PHB_COLORS.WHITE, true: PHB_COLORS.SLATE}}
                        thumbColor={fruits ? PHB_COLORS.BLUE : PHB_COLORS.LIGHTBLUE}
                        onValueChange={toggleSwitch(setFruit)}
                        value={fruits}
                    />
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={vegetables ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitch(setVeg)}
                        value={vegetables}
                    />
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={grains ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitch(setGrain)}
                        value={grains}
                    />
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={dairy ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitch(setDairy)}
                        value={dairy}
                    />
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={meats ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitch(setMeat)}
                        value={meats}
                    />
                    <TextInput
                        keyboardType="numeric"
                        value={exercise}
                        onChangeText={changeText(setExercise)}
                        placeholder="Enter a number"
                    />
                    <TextInput
                        keyboardType="numeric"
                        value={sleep}
                        onChangeText={changeText(setSleep)}
                        placeholder="Enter a number"
                    />
                    <TextInput
                        keyboardType="numeric"
                        value={screen_time}
                        onChangeText={changeText(setScreen)}
                        placeholder="Enter a number"
                    /> */}

                </ScrollView>
            </InfoContainer>

            <InfoContainer title="Exercise Logger">
                <ScrollView  style={styles.scroll_view}>
                    <Button title='Log Exercise' onPress={logExercise({
                        duration : 0, 
                        type : "cardio", 
                        steps : 0
                        }, currentUser, getCurrentDate())}></Button>
                    <Text>Steps today: {step_count}</Text>
                </ScrollView>
            </InfoContainer>

            <InfoContainer title="Wellness Logger">
                <ScrollView  style={styles.scroll_view}>
                    <Button title='Log Wellness' onPress={logWellness({
                        "screen_duration" : 0, 
                        "sleep_duration" : 0
                        }, currentUser, getCurrentDate())}></Button>
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

