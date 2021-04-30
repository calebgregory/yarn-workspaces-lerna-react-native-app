/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   useColorScheme,
   View,
 } from 'react-native';

 import { Colors } from 'react-native/Libraries/NewAppScreen';

 import { sum } from '@calebgregory/math'
 import { Words, Thumbs } from '@calebgregory/components'
 import { writeFile, readFile } from '@calebgregory/file-toy'

 const App = () => {
   const [fileContent, setFileContent] = React.useState('')

   const displayFile = async () => {
     setFileContent(await readFile())
   }

   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <TouchableOpacity onPress={writeFile}>
             <Text style={[styles.button, { backgroundColor: 'yellow' }]}>
               write file
             </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={displayFile}>
             <Text style={[styles.button, { backgroundColor: 'orange' }]}>
               show file
             </Text>
           </TouchableOpacity>
           <Words text={'-> '+sum(1,3)+' (in file): '+fileContent} />
           <Thumbs />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   button: {
    height: 100,
    width: 300,
   }
 });

 export default App;
