import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { CheckListRow } from '../components/checklist_row';
import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Header } from '../components/header';
import { InfoContainer } from '../components/info_container';
export function LogFood({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
          <PHB_Header navigation={navigation}/>
    
          <View style={PHB_STYLES.body}>
            
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

          </View>
    
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

