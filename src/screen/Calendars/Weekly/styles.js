import { StyleSheet, Dimensions } from 'react-native';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff'
    },
    eventText: {
        color: '#000',
        fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(12), 
    },
    plusIcon: {
        width:  Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8), 
        height: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),      
    },
    day: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderTopColor: 'grey',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    dayLabel: {
        width: '20%',
        alignItems: 'center',
        padding: 10,
        borderRightColor: 'grey',
        borderRightWidth: StyleSheet.hairlineWidth,
    },
    title: {
        color: '#000',
        fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14), 
        fontWeight: '500',
        marginTop: 10
    },
    dayLableStyle: {
        fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12), 
        color: '#000',
        marginTop: 15,
        marginBottom: 10,
    },
    monthDateText: {
        fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12), 
    },
    allEvents: {
        width: '100%',
        backgroundColor:'#e2e9f6'
    },
    event: {
        // backgroundColor:'#fff',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: .3
    },
    eventDuration: {
        width: '30%',
        justifyContent: 'center'
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    durationDot: {
        width: 4,
        height: 4,
        backgroundColor: '#000',
        marginRight: 5,
        alignSelf: 'center',
        borderRadius: 4/2,
    },
    durationDotConnector: {
        height: 20,
        borderLeftColor: '#000',
        borderLeftWidth: StyleSheet.hairlineWidth,
        position: 'absolute',
        left: 2
    },
    durationText: {
        color: '#000',
        fontSize: 12
    },
});

export default styles;