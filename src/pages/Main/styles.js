import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    musics: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },

    musicFirst: {
        marginTop: 0,
        flexDirection: 'row',
        width: '90%',
        height: 80,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
    },

    music: {
        marginTop: 15,
        flexDirection: 'row',
        width: '90%',
        height: 80,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
    },

    musicName: {
        color: '#9813C7',
        fontWeight: 'bold',
    }
});