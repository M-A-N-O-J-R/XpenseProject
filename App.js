import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './Home';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ResetpassScreen from './screens/resetPass';
import ForgotPassScreen from './screens/ForgotPass';
import NewUserScreen from './screens/newuser';


// const stackNavigator = createStackNavigator(
//   {
//     Signup:SignupScreen,
//     Signin:SigninScreen,
//     Home:HomeScreen,
//   }
// );

const stackNavigator = createStackNavigator ({
    
    
    Signup:SignupScreen,
    Signin:SigninScreen,
    Reset:ResetpassScreen,
    ForgotPassword:ForgotPassScreen,
    NewUser: {
        screen: NewUserScreen, 
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: HomeScreen, 
        navigationOptions: {
            header: null,
        },
    },
    
})

const App=createAppContainer(stackNavigator);

export default App;

 