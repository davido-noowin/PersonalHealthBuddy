import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, InfoContainer, PHB_Body } from '../phb_components'

export function LogDataPage({ navigation }) {
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

