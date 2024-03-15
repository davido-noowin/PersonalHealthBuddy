import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Switch, Platform, TextInput } from 'react-native';
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
        screen_duration: data.screen_duration,
        sleep_duration: data.sleep_duration
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


async function getStepCount() {
    var step_count = 0;

    if (Platform.OS === 'ios') {
        const isAvailable = await Pedometer.isAvailableAsync();

        if (isAvailable) {
            const start = new Date();
            const end = new Date();
            start.setDate(end.getDate() - 1);

            step_count = await Pedometer.getStepCountAsync(start, end).steps;
        }

        else  {
            step_count = 5432
        }
    }
    else {
        step_count = 1000;
    }
    
    return step_count;
};


export function LogDataPage({ navigation }) {
    const step_count = getStepCount()['_j'];
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const [fruits, setFruit] = useState(false);
    const [vegetables, setVeg] = useState(false);
    const [grains, setGrain] = useState(false);
    const [dairy, setDairy] = useState(false);
    const [meats, setMeat] = useState(false);
    
    const [exercise_duration, setExercise] = useState(0);
    const [exercise_type, setType] = useState('');
    const [sleep, setSleep] = useState(0);
    const [screen_time, setScreen] = useState(0);

    const changeExercise = (text) => {
        const newText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
        setExercise(newText);
      };
    const changeType = (text) => { setType(text); };

    const changeSleep = (text) => {
        var newText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
        const floatVal = parseFloat(newText);
        setSleep(floatVal);
      };
      const changeSC = (text) => {
        const newText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
        const floatVal = parseFloat(newText);
        setScreen(floatVal);
      };

    const toggleFruits = () => setFruit(previousState => !previousState);
    const toggleVeg = () => setVeg(previousState => !previousState);
    const toggleGrain = () => setGrain(previousState => !previousState);
    const toggleDairy = () => setDairy(previousState => !previousState);
    const toggleMeat = () => setMeat(previousState => !previousState);

    const foodPress = () => {
        logFood({
            fruits: fruits ? 1 : 0,
            vegetables: vegetables ? 1 : 0,
            protein: meats ? 1 : 0,
            grains: grains ? 1 : 0,
            dairy: dairy ? 1 : 0,
        }, currentUser, getCurrentDate())
    }
    
    const exercisePress = () => {
        logExercise({
            duration : parseInt(exercise_duration), 
            type : exercise_type, 
            steps : step_count
            }, currentUser, getCurrentDate())
    }

    const wellnessPress = () => {
        logWellness({
            screen_duration : parseInt(screen_time), 
            sleep_duration : parseInt(sleep)
            }, currentUser, getCurrentDate())
    }


    return (
        <View style={PHB_STYLES.root_container}>
            <PHB_Body scroll={true}>
            <InfoContainer title="Food Checklist">
                <ScrollView  style={styles.scroll_view}>
                  
                    <Button title='Log Food' onPress={foodPress}></Button>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Fruit: {fruits? 'Y': 'N'}</Text>
                        <Switch
                            trackColor={{false: PHB_COLORS.WHITE, true: PHB_COLORS.WHITE}}
                            thumbColor={fruits ? PHB_COLORS.BLUE : PHB_COLORS.LIGHTBLUE}
                            onValueChange={toggleFruits}
                            value={fruits}>
                        </Switch>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Vegetable: {vegetables? 'Y': 'N'}</Text>
                        <Switch
                            trackColor={{false: PHB_COLORS.WHITE, true: PHB_COLORS.WHITE}}
                            thumbColor={vegetables ? PHB_COLORS.BLUE : PHB_COLORS.LIGHTBLUE}
                            onValueChange={toggleVeg}
                            value={vegetables}>
                        </Switch>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Grain: {grains? 'Y': 'N'}</Text>
                        <Switch
                            trackColor={{false: PHB_COLORS.WHITE, true: PHB_COLORS.WHITE}}
                            thumbColor={grains ? PHB_COLORS.BLUE : PHB_COLORS.LIGHTBLUE}
                            onValueChange={toggleGrain}
                            value={grains}>
                        </Switch>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Dairy: {dairy? 'Y': 'N'}</Text>
                        <Switch
                            trackColor={{false: PHB_COLORS.WHITE, true: PHB_COLORS.WHITE}}
                            thumbColor={dairy ? PHB_COLORS.BLUE : PHB_COLORS.LIGHTBLUE}
                            onValueChange={toggleDairy}
                            value={dairy}>
                        </Switch>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Protein: {meats? 'Y': 'N'}</Text>
                        <Switch
                            trackColor={{false: PHB_COLORS.WHITE, true: PHB_COLORS.WHITE}}
                            thumbColor={meats ? PHB_COLORS.BLUE : PHB_COLORS.LIGHTBLUE}
                            onValueChange={toggleMeat}
                            value={meats}>
                        </Switch>
                    </View>

                </ScrollView>
            </InfoContainer>

            <InfoContainer title="Exercise Logger">
                <ScrollView  style={styles.scroll_view}>
                    <Button title='Log Exercise' onPress={exercisePress}></Button>

                    <View style={styles.container}>
                        <Text style={styles.textInput}>Steps today: {step_count}</Text>
                        <TextInput
                            keyboardType="default"
                            value={String(exercise_type)}
                            onChangeText={changeType}
                            placeholder="Enter workout type"
                            style={styles.textInput}
                        />
                        <TextInput
                            keyboardType="numeric"
                            value={String(exercise_duration)}
                            onChangeText={changeExercise}
                            placeholder="Enter workout duration in minutes"
                            style={styles.textInput}
                        />
                    </View>
                    
                </ScrollView>
            </InfoContainer>

            <InfoContainer title="Wellness Logger">
                <ScrollView  style={styles.scroll_view}>
                    <Button title='Log Wellness' onPress={wellnessPress}></Button>

                    <View style={styles.container}>
                        <TextInput
                            keyboardType="numeric"
                            value={String(sleep)}
                            onChangeText={changeSleep}
                            placeholder="Enter sleep duration in hours"
                            style={styles.textInput}
                        />
                        <TextInput
                            keyboardType="numeric"
                            value={String(screen_time)}
                            onChangeText={changeSC}
                            placeholder="Enter screen time in hours"
                            style={styles.textInput}
                        />
                    </View>
                    
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
        margin: '5%',
    },    

    container: {
        backgroundColor: 'white',
        padding: 10,
    },

    textInput: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1, 
        borderColor: PHB_COLORS.SLATE,
    },
});



