import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP, widthPercentageToDP } from '../Utils/ResponsiveUI';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home/Home';
import CustomText from '../Components/CustomText/CustomText';
import Colors from '../Utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import DrawerContent from '../Components/DrawerContent/DrawerContent';
import Items from '../Screens/Items/Items';

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <CustomText>Coming Soon!!!!!</CustomText>
        </View>
    );
}

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", backgroundColor: "#323332" }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ flex: 1 / 5 }}
                        key={index}
                    >
                        <View style={[styles.tabButton, { backgroundColor: isFocused ? Colors.primaryColor : "transparent", paddingVertical: 10, alignItems: "center", justifyContent: "space-evenly" }]}>
                            <FontAwesomeIcon icon={label === "Home" ? "shopping-cart" : label === "Hot Offer" ? "percent" : label === "My Cart" ? "shopping-cart" : label === "Search" ? "search" : "user"} size={24} color={isFocused ? Colors.white : Colors.darkText} />
                            <CustomText style={{ color: isFocused ? Colors.white : Colors.darkText, fontWeight: "bold", fontSize: 13, fontFamily: "Roboto-Regular", paddingTop: 3 }}>
                                {label}
                            </CustomText>
                        </View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



class Navigation extends Component {
    constructor() {
        super()
    }



    HomeTabs = () => {
        const Tab = createBottomTabNavigator();


        return (
            <Tab.Navigator
                tabBar={props => <MyTabBar {...props} />}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Hot Offer" component={SettingsScreen} />
                <Tab.Screen name="My Cart" component={SettingsScreen} />
                <Tab.Screen name="Search" component={SettingsScreen} />
                <Tab.Screen name="Profile" component={SettingsScreen} />
            </Tab.Navigator>
        );
    }

    HomeDrawer = () => {
        const Drawer = createDrawerNavigator();


        return (
            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={this.HomeTabs} />

            </Drawer.Navigator>
        );
    }
    render() {
        // console.log(this.props.loggedIn);
        const Stack = createStackNavigator();


        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={this.HomeDrawer} options={{ headerShown: false }} />
                    <Stack.Screen name="Items" component={Items} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}



export default Navigation;


const styles = StyleSheet.create({
    tabButton: {

    }
})
