import React from 'react';
import { View, Text }  from 'react-native';

import getPaths from '../../services/getPaths';


//"CSS"
import styles from './styles';

export default function Home() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>MusicApp</Text>
            </View>

            <View style={styles.musics}>
                <View style={styles.musicFirst}>
                    <Text style={styles.musicName}>Can you feel my heart</Text>
                </View>

                <View style={styles.music}>
                    <Text style={styles.musicName}>Can you feel my heart</Text>
                </View>

                <View style={styles.music}>
                    <Text style={styles.musicName}>Can you feel my heart</Text>
                </View>
            </View>
        </View>
    );
}