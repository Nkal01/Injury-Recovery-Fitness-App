import { Text, View, StyleSheet } from "react-native";

const WorkoutsScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>Workouts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})

export default WorkoutsScreen;