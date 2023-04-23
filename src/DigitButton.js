import { TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import { ACTIONS } from './../src/Actions.js';
import { styles } from './styles.js';

const DigitButton = ({ digit, dispatch, style }) => {
    return (<>
        <TouchableOpacity 
            style={style}
            onPress={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit }})}>
                <Text style={styles.buttonText}>{digit}</Text>
        </TouchableOpacity>
    </>)
};

export default DigitButton;