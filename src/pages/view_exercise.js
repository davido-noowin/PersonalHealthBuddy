import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { InfoContainer, PHB_Body } from '../phb_components'

export function ViewExercisePage({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>

            <PHB_Body scroll={true}>
             
                <InfoContainer title="Past Step Count">
                </InfoContainer>

                <InfoContainer title="Past Workouts">
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

