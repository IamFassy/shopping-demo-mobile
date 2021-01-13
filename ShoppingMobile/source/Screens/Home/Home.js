import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCategories, httpMethods } from '../../ApiManager/EndPoints';
import NetworkManager from '../../ApiManager/NetworkManager';
import Banners from '../../Components/Banners/Banners';
import CustomText from '../../Components/CustomText/CustomText';
import Colors from '../../Utils/Colors';
import Loading from '../../Utils/Loading';
import { widthPercentageToDP } from '../../Utils/ResponsiveUI';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FastImage from 'react-native-fast-image';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: undefined,
            error: false,
            items: [],
            kid: {}
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        NetworkManager.request(getCategories, httpMethods.get)
            .then((res) => {
                this.setState({ loading: false })
                if (res.status === 200) {
                    this.setState({ items: res.data.categories, error: false })
                }
                else {
                    this.setState({ error: true })
                }

            })
            .catch((err) => {
                this.setState({ error: true })

            })
    }
    toItems = (title) => {
        this.props.navigation.push("Items", {
            title
        })
    }

    categoryComponent = (item) => {

        return (
            <TouchableOpacity onPress={() => this.toItems(item.name)}>
                <View style={styles.categoryButton}>
                    <FastImage resizeMode={FastImage.resizeMode.cover} source={{ uri: item.img }} style={{ width: "100%", height: "100%" }} />
                    <View style={styles.categoryTextView}>
                        <View style={styles.categoryTextInnerView}>
                            <CustomText size="subHeading" style={styles.categoryText}>{item.name}</CustomText>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    render() {

        return (

            <SafeAreaView style={styles.container}>
                <View style={styles.topView}>
                    <View style={styles.drawerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <FontAwesomeIcon icon={"align-right"} size={24} color={Colors.darkText} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textView}>
                        <CustomText type="bold" style={styles.leftText} size="heading">Shop<CustomText style={styles.rightText} size="heading">cart</CustomText></CustomText>
                    </View>
                </View>
                {this.state.loading &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Loading />
                    </View>}
                {!this.state.loading && !this.state.error &&
                    <View style={styles.container}>

                        <View style={styles.bannerView}>
                            <Banners />
                        </View>

                        {this.state.items.length > 0 && <View style={styles.categoryView}>
                            <View style={{ flex: 0.5 }}>
                                {this.categoryComponent(this.state.items[0])}
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <View style={{ flex: 0.5 }}>
                                    {this.categoryComponent(this.state.items[1])}
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    {this.categoryComponent(this.state.items[2])}
                                </View>
                            </View>
                        </View>}
                    </View>
                }
                {!this.state.loading && this.state.error &&
                    <View style={styles.container}>
                        <CustomText size="heading">There was an error while fetching the data.</CustomText>
                    </View>

                }
            </SafeAreaView>
        )
    }
}

export default Home


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white
    },
    leftText: {
        color: Colors.primaryColor
    },
    topView: {
        display: "flex",
        flexDirection: "row",
        width: widthPercentageToDP(100),
        marginBottom: 10
    },
    rightText: {
        color: Colors.green
    },
    bannerView: {
        height: 250,
    },
    categoryView: {
        display: "flex",
        flexDirection: "row",
        height: 350
    },
    categoryButton: {
        width: "100%",
        height: "100%"
    },
    categoryTextView: {
        backgroundColor: Colors.white,
        position: "relative",
        zIndex: 1,
        bottom: 40,
        width: 120,
        alignSelf: "center",
        padding: 2
    },
    categoryTextInnerView: {
        backgroundColor: Colors.tabBackground,
    },
    categoryText: {
        color: Colors.white,
        textAlign: "center"
    },
    drawerView: {
        flex: 0.1,
        alignItems: "center"
    },
    textView: {
        flex: 0.8,
        alignItems: "center"
    }
})
