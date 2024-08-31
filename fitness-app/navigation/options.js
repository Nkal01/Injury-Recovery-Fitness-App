import { Ionicons } from "@expo/vector-icons";

export const navOptions = (navigation) => {
  return {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: "#0f172a"
    },
    headerLeft: () => (
      <Ionicons
        name="menu"
        size={32}
        color="white"
        style={{ marginLeft: 10 }}
        onPress={() => {
          if (navigation.toggleDrawer) {
            navigation.toggleDrawer();
          } else {
            console.warn('toggleDrawer is not available on this navigation object');
          }
        }}
      />
    ),
  };
};