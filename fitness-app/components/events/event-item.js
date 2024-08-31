import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const EventItem = ({id, name, description, image}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Event", {eventId: id, name, description})}>
            <Text>{name}</Text>
            <Text>{description}</Text>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 3,
        borderColor: 'grey',
        borderRadius: 10,
        marginVertical: 5,
        padding: 30,
        backgroundColor: '#dcd0ff',
        alignItems: 'center',
    }
})

export default EventItem;