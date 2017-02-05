import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image: {
        height: 350
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
})

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            isLoading: false,
            error: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>This is the Dashboard</Text>
                <Text>{this.props.userInfo.login}</Text>
            </View>
        )
    }
}
