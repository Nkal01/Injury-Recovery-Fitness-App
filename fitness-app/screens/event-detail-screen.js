import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

const EventDetailScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const {eventId, title, description} = route.params

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerTitle:"Details",
            headerLeft: () =>(
                <HeaderBackButton
                    tintColor="white"
                    onPress={()=> navigation.goBack()}
                />
            )
        })
    }, [])

    return (
        <View style={styles.screen}>
            <Text style={{fontSize: 20}}>This is the event detail screen for {eventId}</Text>
            <Text style={{fontWeight: "bold"}}>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        padding: 20,
    }
})

export default EventDetailScreen;