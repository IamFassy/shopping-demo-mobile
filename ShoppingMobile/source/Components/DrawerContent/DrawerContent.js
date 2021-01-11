import React, { Component } from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
import { StackActions, NavigationActions, CommonActions } from "@react-navigation/native";
import Colors from "../../Utils/Colors";
import CustomText from '../CustomText/CustomText';

class DrawerContent extends Component {

    constructor(props) {
        super(props)

    }





    toNavigate = (title) => {



    }



    navigationOptions = (title) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.toNavigate(title)} >
                <View style={[styles.buttonView, { borderBottomWidth: title !== "Logout" ? 1 : 0 }]}>
                    <CustomText size="heading" style={styles.titleText}>
                        {title}
                    </CustomText>
                </View>
            </TouchableOpacity>
        )
    }

    render() {


        return (

            <SafeAreaView style={styles.drawerContent}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {this.navigationOptions("Men's Wear", 'Dashboard')}
                    {this.navigationOptions("Women's Wear", 'InspectionList')}


                    {this.navigationOptions("Accessories", 'InspectionDetails')}
                    {this.navigationOptions("Track order", 'TodayInspection')}
                    {this.navigationOptions("Account Details", 'TodayInspection')}
                    {this.navigationOptions("Settings", 'TodayInspection')}
                    {this.navigationOptions('Sign out', 'Dashboard')}
                </ScrollView>
            </SafeAreaView>

        )
    }
}


export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
    },
    buttonView: {
        flexDirection: "row",
        marginVertical: 15,
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        borderColor: Colors.drawerBorder,
        paddingBottom: 15

    },
    titleText: {
        color: Colors.white
    },
});