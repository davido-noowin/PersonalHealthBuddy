import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'

export function ViewWellnessPage({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
            <PHB_Body scroll={true}>
                <InfoContainer title="Past Sleep (hrs/day)">
                </InfoContainer>

                <InfoContainer title="Past Screentime (hrs/day)">
                </InfoContainer>
            </PHB_Body>

            <StatusBar style="auto"/>
        </View>
    );
}
    
const styles = StyleSheet.create({
});

