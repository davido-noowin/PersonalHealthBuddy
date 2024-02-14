import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { CheckListRow, PHB_Header, InfoContainer, PHB_Body } from '../phb_components'

export function LogFoodPage({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
            <PHB_Header navigation={navigation}/>

            <PHB_Body scroll={true}>
                <View style={PHB_STYLES.page_title_frame}>
                    <Text style={[PHB_STYLES.page_title_text, PHB_STYLES.body_text]}>Log Food</Text>
                </View>

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
        height: '100%',
        width: '100%',  
    },
});

