import React from 'react'; //Necessario para utilizar JSX
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

//Pages
import Home from './pages/Main';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Home' component={Home} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}