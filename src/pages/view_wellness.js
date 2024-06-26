import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { AuthContext } from '../../authContext';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'

export function ViewWellnessPage({ navigation }) {

    const [wellnessData, setWellnessData] = useState({
        log: {},
        success: false
	});

	const getWellnessScores = async (username) => {
		try {
			var request_parameters = "?username=" + username;

            //!!! change the url to yours to test
            //must also add recent data to view (>5 days from now)
			const res = await fetch("http://18.226.94.38:8000/api/get-wellness" + request_parameters);
			const data = await res.json();
			setWellnessData(data);
            console.log("wellnessData" + JSON.stringify(wellnessData, null, 2));
			
		}
		catch (error) {
			console.log("Error fetching data:", error);
		}
	};
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    useEffect(() => {
		getWellnessScores(currentUser);
	  }, []);

    return (
        <View style={PHB_STYLES.root_container}>
            <PHB_Body scroll={true}>
                <InfoContainer title="Past Sleep (hrs/day)" style={[PHB_STYLES.center, PHB_STYLES.border]}>
                    {
                        Object.entries(wellnessData.log).map(([key, object], i) => { return (
                            <Text key={object.date} style={[PHB_STYLES.center, styles.list_text]}>
                                {object.date}: {object["sleep-duration"]} 
                            </Text>
                        )})
                    }
                </InfoContainer>

                <InfoContainer title="Past Screentime (hrs/days)">
                {
                        Object.entries(wellnessData.log).map(([key, object], i) => { return (
                            <Text key={object.date} style={[PHB_STYLES.center, styles.list_text]}>
                                {object.date}: {object["screen-duration"]} 
                            </Text>
                        )})
                    }
                </InfoContainer>
            </PHB_Body>

            <StatusBar style="auto"/>
        </View>
    );
}
    
const styles = StyleSheet.create({
    list_text:{
        fontSize: 20,
        paddingVertical: 10,
        alignSelf: "center"
    }
});

