import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Header, CheckListRow, InfoContainer, PHB_Body } from '../phb_components'

export function LogDataPage({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
        {/* <PHB_Header navigation={navigation}/> */}

            <PHB_Body scroll={true}>

            <InfoContainer title="My Checklist">
                <ScrollView  style={styles.scroll_view}>
                    <CheckListRow text="Did you eat a meal today?"/>
                    <CheckListRow text="Did you eat fruits today?"/>
                    <CheckListRow text="Did you eat fiber today?"/>
                    <CheckListRow text="Did you eat meat today?"/>
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
