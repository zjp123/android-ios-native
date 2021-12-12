import React, {Component} from "react";
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import StickyContainer from 'recyclerlistview/sticky';
import {View, Dimensions, Text, Image, ScrollView} from "react-native";
import FlightCard from "./FlightCard";
import FlightData from "./FlightData1";
import FlightData2 from "./FlightData";
import HotelCard from "./HotelCard";
import TopWidget from "./TopWidget";
// import ListItem from "../compoent/ListItem";
let {height, width} = Dimensions.get('window');
export default class FlightsPage extends Component {
    constructor(args) {
        super(args);
        this.state = {
            num: 0,
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(FlightData),
            activeNum: 1
        };
        this._layoutProvider = new LayoutProvider((i) => {
            console.log(this.state.dataProvider.getDataForIndex(i));
            return this.state.dataProvider.getDataForIndex(i).type;
        }, (type, dim) => {
            switch (type) {
                case "HOTEL_ITEM":
                    dim.width = width;
                    // dim.height = 83;
                    dim.height = 129;
                    break;
                case "FL_ITEM":
                    dim.width = width;
                    // dim.height = 80;
                    dim.height = 129;

                    break;
                case "HEADER":
                    dim.width = width;
                    // dim.height = 300;
                    dim.height = 129;

                    break;
                default:
                    dim.width = width;
                    dim.height = 0;

            }
        });
        this._renderRow = this._renderRow.bind(this);
    }


    _renderRow(type, data) {
        switch (type) {
            case "HOTEL_ITEM":
                return <HotelCard/>
                // return null
                // return <ListItem />

            case "FL_ITEM":
                return <FlightCard data={data}/>;
                // return <ListItem />
            case "HEADER":
                // return null;
                return <TopWidget data={data}/>;
                // return <ListItem />

            default:
                return null;

        }

    }

    _applyWindowCorrection(offset, offsetY, windowCorrection) {
        // Provide a positive value to startCorrection to shift the Top Sticky widget downwards.
        windowCorrection.startCorrection = -20; 
    
        // Provide a positive value to endCorrection to shift the Bottom Sticky widget upwards.
        windowCorrection.endCorrection = 20;
    }

    render() {
        const { activeNum, dataProvider, num } = this.state
        return <View style={styles.container}>
            <View style={[styles.rowCss, activeNum === 1 ? {backgroundColor: 'red'} : '']}>
                <Text style={styles.textCss} onPress={() => {
                    this.setState({
                        num: 0,
                        dataProvider: new DataProvider((r1, r2) => {
                            return r1 !== r2
                        }).cloneWithRows(FlightData),
                        activeNum: 1
                    }, () => {
                        console.log(this.myScrollView, 'this.myScrollViewthis.myScrollView');
                        // this.myScrollView && this.myScrollView.scrollTo({ x: 0, y: 0, animated: true })
                    })
                }}>哈哈</Text>
                <Text onPress={() => {
                    console.log('啦啦啦啦啦啦');
                    this.setState({
                        activeNum: 2,
                        num: 0,
                        dataProvider: new DataProvider((r1, r2) => {
                            return r1 !== r2
                        }).cloneWithRows(FlightData2)
                    }, () => {
                        // this.myScrollView && this.myScrollView.scrollTo({ x: 0, y: 0, animated: true })

                    })
                }} style={styles.textCss}>啦啦</Text>
            </View>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Travel Mate</Text>
            </View> */}
            <View style={{flex: 1}}>
                {/* <ScrollView contentContainerStyle={dataProvider.length ? '' : {flex: 1}} ref={(vie) => this.myScrollView = vie}>
                    <RecyclerListView style={{width: '100%'}} rowRenderer={this._renderRow}
                        //   externalScrollView={(vie) => {
                        //       return <Text>横说竖说</Text>
                        //   }}
                            initialOffset={num}
                            dataProvider={dataProvider}
                            scrollViewProps={{
                            contentOffset: {x: 0, y: 0}
                            }}
                            layoutProvider={this._layoutProvider}/>
                </ScrollView> */}
                    <StickyContainer
                        applyWindowCorrection={this._applyWindowCorrection}
                    >
                        <RecyclerListView style={{width: '100%'}} rowRenderer={this._renderRow}
                            //   externalScrollView={(vie) => {
                            //       return <Text>横说竖说</Text>
                            //   }}
                            onContentSizeChange={() => { this.myScrollView.scrollToTop({animated: false})} }
                            useWindowScroll={true}
                            initialRenderIndex={num}
                            ref={(vie) => this.myScrollView = vie}
                            initialOffset={num}
                            dataProvider={dataProvider}
                            scrollViewProps={{
                            contentOffset: {x: 0, y: 0}
                            }}
                            layoutProvider={this._layoutProvider}/>
                    </StickyContainer>
            </View>
        </View>
    }
}
const styles = {
    rowCss: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#333'
    },
    textCss: {
        width: 50,
        lineHeight: 50
    },
    container: {
        flex: 1,

    },
    header:{
        height: 65,
        backgroundColor:'orange',
        alignItems:"center",
        flexDirection:"row",
        elevation:4
    },
    headerText:{
        color:'white',
        fontSize:18,
        marginLeft: 16,
        paddingBottom:3
    },
    backIcon:{
        height:23,
        width:23,
        marginLeft:16

    }
}