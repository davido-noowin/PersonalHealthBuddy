import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'

export function ViewFoodPage({ navigation }) {

    const [foodData, setFoodData] = useState({
        log: {},
        success: false
	});

	const getFoodScores = async (username) => {
		try {
			var request_parameters = "?username=" + username;

            //!!! change the url to yours to test
            //must also add recent data to view (>5 days from now)
            console.log("sending request to " + "http://18.226.94.38:8000/api/get-food" + request_parameters)
			const res = await fetch("http://18.226.94.38:8000/api/get-food" + request_parameters);
			const data = await res.json();
			setFoodData(data);
            console.log("foodData: " + JSON.stringify(foodData, null, 2));
			
		}
		catch (error) {
			console.log("Error fetching data:", error);
		}
	};

    const yesOrNo = (num) => {
        return num ? ("Yes") : ("No")
    }

    useEffect(() => {
		getFoodScores('john_doe@gmail.com');
	  }, []);


    return (
        <View style={PHB_STYLES.root_container}>

            <PHB_Body scroll={true}>

                <InfoContainer title="Past Foods">
                    <ScrollView  style={styles.scroll_view}>
                    {
                        Object.entries(foodData.log).map(([key, object], i) => { return (
                            <View key={object.date} style={PHB_STYLES.center}>
                                
                            <Text style={[styles.list_text, {textDecorationLine: 'underline'}]}>
                                {object.date} {'\n'}
                            </Text>
                            <Text  style={styles.list_text}>
                                
                                Fruits: {yesOrNo(object.fruits)} {'\n'}
                                Vegetables: {yesOrNo(object.vegetables)} {'\n'}
                                Proteins: {yesOrNo(object.protiens)} {'\n'}
                                Grains: {yesOrNo(object.grains)} {'\n'}
                                Dairy: {yesOrNo(object.dairy)} {'\n'}
                            </Text>
                            </View>
                        )})
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
        height: '100%',
        width: '100%',  
    },
    list_text:{
        paddingVertical: 2,
        fontSize: 16,
        alignSelf: "center"
    },
});

