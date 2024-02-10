import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { CheckListRow } from '../components/checklist_row';
import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Header } from '../components/header';

export function LogFood({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
          <PHB_Header navigation={navigation}/>
    
          <View style={PHB_STYLES.body}>
            
            <View style={PHB_STYLES.center}>
            <View style={PHB_STYLES.page_title_frame}>
                <Text style={[PHB_STYLES.page_title_text, PHB_STYLES.body_text]}>Log Food</Text>
            </View>
                <ScrollView style={styles.scroll_view}>
                    <CheckListRow text="Did you eat a meal today?"/>
                    <CheckListRow text="Did you eat fruits today?"/>
                    <CheckListRow text="Did you eat fiber today?"/>
                    <CheckListRow text="Did you eat meat today?"/>
                </ScrollView>
            </View>
            
            {/* add other octogons later */}
          </View>
    
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

