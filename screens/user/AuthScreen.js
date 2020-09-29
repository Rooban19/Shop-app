import React, { useState, useReducer, useCallback } from 'react';
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
import { useDispatch } from 'react-redux';
import * as AuthAction from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const AuthScreen = props => {
    const [isSignup, setIsSignup] = useState(false);
    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email: '',
        password: '',
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formIsValid: false,
    });

    const dispatch = useDispatch();
    const authHandler = () => {
      let action;
      if (isSignup) {
        action = AuthAction.signup(
          formState.inputValues.email,
          formState.inputValues.password,
        );
      } else {
        action = AuthAction.login(
          formState.inputValues.email,
          formState.inputValues.password,
        );
      }
      dispatch(action);
    };
    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
        });
      },
      [dispatchFormState],
    );

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
              errorText="Please enter a valid e-mail address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              minlength={5}
              autoCapitalize="none"
              errorText="Please enter a valid Password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.button}>
              <Button
                style={styles.buttons}
                title={isSignup ? 'Sign up' : 'Login'}
                color={Colors.primary}
                onPress={authHandler}
              />
              <Button
                style={styles.buttons}
                title={isSignup ? 'Login' : 'Sign up'}
                color={Colors.primary}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
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
