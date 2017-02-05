import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Image,
    ScrollView
} from 'react-native';
import Badge from './Badge';
import Seperator from './Helpers/Seperator';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
})

export default class Color extends Component {
    constructor(props) {
        super(props);

    }

    getRowTitle(user, item) {
        const currItem = (item === 'public_repos')
            ? item.replace('_', ' ')
            : item;
        return item[0]
            ? item[0].toUpperCase() + item.slice(1)
            : item;
    }

    render() {
        const userInfo = this.props.userInfo;
        const topicArray = [
            'company',
            'location',
            'followers',
            'following',
            'email',
            'bio',
            'public_repos'
        ];
        const list = topicArray.map((item, index) => {
            if (!userInfo[item]) {
                return <View key={index}/>
            } else {
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>
                                {this.getRowTitle(userInfo, item)}</Text>
                            <Text style={styles.rowContent}>
                                {userInfo[item]}
                            </Text>
                        </View>
                        <Seperator />
                    </View>
                )
            }
        })
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo}></Badge>
                <View>{list}</View>
            </ScrollView>
        )
    }
}

Badge.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};
