import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { CheckListRow } from '../components/checklist_row';
import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Header } from '../components/header';

export function LogExercise({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
          <PHB_Header navigation={navigation}/>
    
          <View style={PHB_STYLES.body}>
            
            <View style={PHB_STYLES.center}>
                <View style={PHB_STYLES.page_title_frame}>
                    <Text style={[PHB_STYLES.page_title_text, PHB_STYLES.body_text]}>Exercise Logging</Text>
                </View>
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

