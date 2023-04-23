import { TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import { ACTIONS } from './Actions.js';
const OperationButton = ({ operation, dispatch, ACTION, style }) => {
    return (<>
        <TouchableOpacity 
            style={style}
            onPress={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>
                <Text style={styles.buttonText}>{operation}</Text>
        </TouchableOpacity>
    </>)
};

export default OperationButton;


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    cell: {
        width: width / 5,
        height: width / 5,
        margin: 5,
    },
    button: {
        borderRadius: 10,
        backgroundColor: 'green',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 50,
    },
})