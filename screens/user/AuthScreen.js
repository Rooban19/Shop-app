import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import Input from '../../components/UI/input';
import Card from '../../components/UI/Card';
import { LinearGradient } from 'expo-linear-gradient';

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behaviour="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authcontainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid e-mail address"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              minlength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid Password"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.button}>
              <Button
                style={styles.buttons}
                title="Login"
                color={Colors.primary}
                onPress={() => {}}
              />
              <Button
                style={styles.buttons}
                title="Sign up"
                color={Colors.primary}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Please Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authcontainer: {
    width: '90%',
    height: '38%',
    padding: 10,
    maxWidth: 400,
    marginVertical: 100,
  },
  button: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    borderRadius: 20,
  },
});

export default AuthScreen;
