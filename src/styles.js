import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#1c2340',

	  },
	container: {
		flex: 1,
		width: Platform.OS == 'web' ? '100%' : '100%',
		maxWidth: 1000,
		maxHeight: 1000,
		alignSelf: 'center',
		justifyContent: 'flex-end',
	},
	row: {
		height: Platform.OS == 'web' ? '10%' : 'auto',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	cell: {
		width: Platform.OS == 'web' ? '10%' : '22%',
		aspectRatio: 1/1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		margin: 5,
		backgroundColor: '#403b77',
	},
	buttonText: {
		color: '#f1f5fd',
		fontSize: 30,
	},
	output: {
		alignSelf: 'center',
		backgroundColor: 'rgba(64, 59, 119, 0.2)', 
		width: Platform.OS == 'web' ? '43%' : '95%',
		height: '20%',
		borderRadius: 20,
		marginBottom: 10,
	},
	previousoperand: {
		color: '#b1b5bd',
		textAlign: 'right',
		marginRight: 30,
		fontSize: 30,
	},
	currentoperand: {
		color: '#f1f5fd',
		textAlign: 'right',
		marginRight: 30,
		fontSize: 40,
	},
	spantwo: {
		aspectRatio: undefined,
		width: Platform.OS == 'web' ? '21%' : '46%',
	}
});
export const colors = StyleSheet.create({
	lightlightpurple: {
		backgroundColor: '#8f1b77'
	},
	lightpurple: {
		backgroundColor: '#af4b77'
	},
})