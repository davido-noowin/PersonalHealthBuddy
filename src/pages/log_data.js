import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Switch, Platform} from 'react-native';
import { Pedometer } from 'expo-sensors';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'

import React, {useState, useContext} from 'react';
import { AuthContext } from '../../authContext';

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
    }

    else {
        step_count = 1000;
    }
    
    return step_count;
};


function log_food(data, setUser) {
    console.log("SUBMITTED");
    console.log(data);

    // api call to login, set to correct address to make login work
    fetch("http://18.226.94.38:8000/api/log-food", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log(JSON.stringify(responseData)); // logs the server response which should be 200 if successful
        if (responseData.success === true) {
            console.log("correct login info, user=" + responseData.username);
            setUser(responseData.username)
        }
        else {
            console.log("wrong login");
            // let the user know that they put in the wrong credentials
        }
    })
    .catch((error) => console.error('Error:', error));
}




export function LogDataPage({ navigation }) {
    const step_count = getStepCount();
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
    console.log()

    return (
        <View style={PHB_STYLES.root_container}>
            <PHB_Body scroll={true}>
            <InfoContainer title="Food Checklist">
                <ScrollView  style={styles.scroll_view}>
                    {/* <Text>
                        {fruits && 'Fruits: '}
                        {vegetables && 'Vegetables: '}
                        {grains && 'Grains: '}
                        {dairy && 'Dairy: '}
                        {meats && 'Meats: '}
                    </Text> */}

                    {/* <Text>{currentUser} : {step_count} steps</Text> */}
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

