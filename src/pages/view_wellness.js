import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, PHB_Header, InfoContainer, PHB_Body } from '../phb_components'

export function ViewWellnessPage({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
            {/* <PHB_Header navigation={navigation}/> */}

            <PHB_Body scroll={true}>

                <InfoContainer title="Today's Screen Time: xhr ymin">
                    <Text>screen time graph</Text>
                </InfoContainer>
                <InfoContainer title="Last Night's Sleep: xhr ymin">
                    <Text>sleep time clock</Text>
                </InfoContainer>
                <InfoContainer title="Log Last Night's Sleep">
                    <Text>sleep time form</Text>
                </InfoContainer>

            </PHB_Body>

            <StatusBar style="auto" />
        </View>
    );
}
    
const styles = StyleSheet.create({
});
