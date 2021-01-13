import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Colors from "../../Utils/Colors";
import CustomText from '../CustomText/CustomText';

class DrawerContent extends Component {

    constructor(props) {
        super(props)

    }

    toNavigate = (title, to) => {
        if (to) {
            this.props.navigation.push(to, {
                title
            })
        }
        else {
            Alert.alert("Coming Soon!!!!")
        }


    }

    navigationOptions = (title, to) => {
        return (
            <TouchableOpacity onPress={() => this.toNavigate(title, to)} >
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

                    {this.navigationOptions("Men's Wear", "Items")}
                    {this.navigationOptions("Women's Wear", "Items")}
                    {this.navigationOptions("Kid's Wear", "Items")}
                    {this.navigationOptions("Track order", null)}
                    {this.navigationOptions("Account Details", null)}
                    {this.navigationOptions("Settings", null)}
                    {this.navigationOptions('Sign out', null)}
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