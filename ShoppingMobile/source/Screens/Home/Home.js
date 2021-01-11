import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCategories, httpMethods } from '../../ApiManager/EndPoints';
import NetworkManager from '../../ApiManager/NetworkManager';
import Banners from '../../Components/Banners/Banners';
import CustomText from '../../Components/CustomText/CustomText';
import Colors from '../../Utils/Colors';
import Loading from '../../Utils/Loading';
import { heightPercentageToDP, widthPercentageToDP } from '../../Utils/ResponsiveUI';

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
                console.log(res, "res");
            })
            .catch((err) => {
                console.log(err, "err");
            })
    }

    categoryComponent = (item) => {
        console.log(item.img, "item");
        return (
            <TouchableOpacity>
                <View style={styles.categoryButton}>
                    <Image resizeMode="cover" source={{ uri: item.img }} style={{ width: "100%", height: "100%" }} />
                </View>
            </TouchableOpacity>
        )
    }
    render() {

        return (

            <View style={styles.container}>
                {this.state.loading &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Loading />
                    </View>}
                {this.state.loading === false &&
                    <View style={styles.container}>
                        <View style={styles.topView}>
                            <CustomText type="bold" style={styles.leftText} size="heading">Shop<CustomText style={styles.rightText} size="heading">cart</CustomText></CustomText>
                        </View>
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







            </View>
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
    }
})
