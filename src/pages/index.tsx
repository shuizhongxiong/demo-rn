import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from '@ant-design/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import LikeButtonDemo from './LikeButtonDemo';
import ApplyForm from './ApplyForm';
const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LikeButtonDemo"
              component={LikeButtonDemo}
              options={{headerShown: false}}
            />
            <Stack.Screen name="ApplyForm" component={ApplyForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
