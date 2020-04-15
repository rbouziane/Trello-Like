/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import {
    SafeAreaView,
    Animated,
    PanResponder,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,  
    StatusBar,
    Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Separator() {
    return <View style={styles.separator} />;
}

const App: () => React$Node = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
    PanResponder.create({
        useNativeDriver:  () => true, 
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([ null,
        { dx: pan.x, dy: pan.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      }
    })
  ).current;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Welcome</Text>
              <Text style={styles.sectionDescription}>
          This is the first version of  <Text style={styles.highlight}>My_Trello</Text>, more changes
                and features are coming for this new app.
              </Text>
            </View>
          </View>
          <Separator />
          <View style={styles.container}>
          <View style={styles.buttonContainer}>
          <Button
      title="Show Description"
      color="#6495ed"
      onPress= {() => Alert.alert('This application in the future will be used like Trello to help you organize your work.')} />
          </View>
          </View>
          <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5,
        alignItems: "center"
    },
    buttonContainer: {
        margin: 40,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    Body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 120,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
