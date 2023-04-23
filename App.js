import { useReducer, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, Dimensions, StyleSheet, Text, Animated, View } from 'react-native';
import DigitButton from './src/DigitButton.js';
import { styles, colors } from './src/styles.js';
import { ACTIONS } from './src/Actions.js';
  
function reducer(state, { type, payload }) {
	switch(type) {
		case ACTIONS.ADD_DIGIT:
			if (payload.digit == ".")
			{
				if (state.currentOperand == null)
					return state;
				if (state.currentOperand.includes("."))
					return state;
			} 

			if (state.overwrite == true)
				return {
					...state,
					currentOperand: payload.digit,
					overwrite: false,
				}
			if (payload.digit == "0" && state.currentOperand == "0") 
				return state;

			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${payload.digit}`
			};
		case ACTIONS.CLEAR:
			return {}; // Return an empty state
		case ACTIONS.CHOOSE_OPERATION:
			if (state.currentOperand == null && state.previousOperand == null)
				return state ;
			if (state.currentOperand == null)
				return {
					...state,
					operation: payload.operation,
				}
			if (state.previousOperand == null)
				return {
					...state,
					operation: payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
				}
			return {
				...state,
				previousOperand: evaluate(state),
				operation: payload.operation,
				currentOperand: null,
			}
		case ACTIONS.EVALUATE:
			if (state.operation == null ||  
				state.currentOperand == null ||  
				state.previousOperand == null)
				return state;
			
				return {
					...state,
					overwrite: true,
					operation: null,
					previousOperand: null,
					currentOperand: evaluate(state),
				}
		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite)
				return {
					...state,
					overwrite: false,
					currentOperand: null,
				}
			if (state.currentOperand == null)
				return state;
			if (state.currentOperand.length == 1)
				return {
					...state,
					currentOperand: null,
				}
			return {
				...state,
				currentOperand: removeLastDigit(state.currentOperand),
			}
		case ACTIONS.ADD_DIGIT:
			return state;
		case ACTIONS.CHANGE_SIGN:
			if (state.currentOperand == null)
				return state;
			if (state.currentOperand.charAt(0) == "-")
				return {
					...state,
					currentOperand: removeNegativeSign(state.currentOperand),
				}
			return {
				...state,
				currentOperand: addNegativeSign(state.currentOperand),
			}
		
	}
}
function addNegativeSign(currentOperand)
{
	return '-' + currentOperand;
}
function removeNegativeSign(currentOperand)
{
	return currentOperand.slice(1);
}
function removeLastDigit(currentOperand)
{
	return currentOperand.slice(0, -1);
}
function evaluate({ currentOperand, previousOperand, operation}) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	console.log(prev, current);
	if (isNaN(prev) || isNaN(current))
		return "";
	

	let computation = "";
	switch (operation) {
		case "+": computation = prev + current;
			break;
		case "-": computation = prev - current;
			break;
		case "*": computation = prev * current;
			break;
		case "÷": computation = prev / current;
			break;
	}
	return computation.toString();
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 8,
})
function formatOperand(operand) {
	if (operand == null) return;
	const [integer, decimal] = operand.split('.');
	if (decimal == null) return INTEGER_FORMATTER.format(integer);
	else return INTEGER_FORMATTER.format(operand);

}
export default function App() {
	const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
	console.log({currentOperand, previousOperand, operation});

	const previousOperandOffsetX = new Animated.Value(220);
	useEffect(() => {
		previousOperandOffsetX.setValue(220);
		Animated.timing(previousOperandOffsetX, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
	}, [previousOperand]);
	return (
		<View style={styles.body}>
			<SafeAreaView style={styles.container}>
					<View style={styles.output}>
						<Animated.View style={{
								transform: [{ translateX: previousOperandOffsetX }],
							}}>
							<Text style={styles.previousoperand}>{formatOperand(previousOperand)} {operation}</Text>
						</Animated.View>
						<View>
							<Text style={styles.currentoperand}>{formatOperand(currentOperand)}</Text>
						</View>
					</View>

				<View style={styles.row}>
					<TouchableOpacity 
						style={[styles.cell, colors.lightpurple]}
						onPress={() => dispatch({ type: ACTIONS.CLEAR, payload: { operation: "AC" } })}>
							<Text style={styles.buttonText}>AC</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={[styles.cell, colors.lightpurple]}
						onPress={() => dispatch({ type: ACTIONS.CHANGE_SIGN, payload: { operation: "+/-" } })}>
							<Text style={styles.buttonText}>+/-</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={[styles.cell, colors.lightpurple]}
						onPress={() => dispatch({ type: ACTIONS.DELETE_DIGIT, payload: { operation: "DEL" } })}>
							<Text style={styles.buttonText}>DEL</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style={[styles.cell, colors.lightlightpurple]}
						onPress={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "÷" } })}>
							<Text style={styles.buttonText}>÷</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<DigitButton digit="7" dispatch={dispatch} style={styles.cell}/>
					<DigitButton digit="8" dispatch={dispatch} style={styles.cell}/>
					<DigitButton digit="9" dispatch={dispatch} style={styles.cell}/>
					<TouchableOpacity 
						style={[styles.cell, colors.lightlightpurple]}
						onPress={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } })}>
							<Text style={styles.buttonText}>*</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
				<DigitButton digit="4" dispatch={dispatch} style={styles.cell}/>
				<DigitButton digit="5" dispatch={dispatch} style={styles.cell}/>
				<DigitButton digit="6" dispatch={dispatch} style={styles.cell}/>
				<TouchableOpacity 
					style={[styles.cell, styles.button, colors.lightlightpurple]}
					onPress={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } })}>
						<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
				</View>

				<View style={styles.row}>
				<DigitButton digit="1" dispatch={dispatch} style={styles.cell}/>
				<DigitButton digit="2" dispatch={dispatch} style={styles.cell}/>
				<DigitButton digit="3" dispatch={dispatch} style={styles.cell}/>
				<TouchableOpacity 
					style={[styles.cell, colors.lightlightpurple]}
					onPress={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } })}>
						<Text style={styles.buttonText}>-</Text>
				</TouchableOpacity>
				</View>

				<View style={styles.row}>
				<DigitButton digit="0" dispatch={dispatch} style={[styles.cell, styles.spantwo]}/>
				<DigitButton digit="." dispatch={dispatch} style={styles.cell}/>
				<TouchableOpacity 
					style={[styles.cell, colors.lightlightpurple]}
					onPress={() => dispatch({ type: ACTIONS.EVALUATE, payload: { operation: "=" } })}>
						<Text style={styles.buttonText}>=</Text>
				</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
}