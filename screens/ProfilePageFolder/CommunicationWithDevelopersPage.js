import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmailValid } from '../../src/Validation/Valid';

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={80}
    />
  );
};

export default function CommunicationWithDevelopersScreen({ navigation }) {
  const [User, setUser] = useState(null);
  const [Email, setEmail] = useState(null);

  const [TopicMessage, setTopicMessage] = useState('');
  const [Message, setMessage] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user', (err, result) => {
      if (result) {
        var localuser = JSON.parse(result);
        setUser(localuser);
        setEmail(localuser.email);
      }
    });
  }, []);

  return (
    <View style={{ marginTop: 60 }}>
      {User != null ? (
        <View>
          <Input
            label="Электронная почта для ответа"
            error={isEmailValid(Email) ? (Email === '' ? false : true) : false}
            errorStyle={{ marginHorizontal: 34 }}
            errorMessage={
              isEmailValid(Email) ? (Email === '' ? false : 'Формат example@mail.ru') : false
            }
            labelStyle={{ marginHorizontal: 30, color: '#808080', fontSize: 18, fontWeight: '600' }}
            autoCorrect={false}
            style={styles.inputData}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={Email}
            inputContainerStyle={{ borderBottomWidth: 0 }}></Input>
          <Input
            onChangeText={(text) => {
              setTopicMessage(text);
            }}
            value={TopicMessage}
            label="Тема сообщения"
            labelStyle={{ marginHorizontal: 30, color: '#808080', fontSize: 18, fontWeight: '600' }}
            autoCorrect={false}
            style={styles.inputData}
            inputContainerStyle={{ borderBottomWidth: 0 }}></Input>
          <Text
            style={{
              marginHorizontal: 30,
              marginBottom: 10,
              marginTop: 30,
              fontSize: 18,
              fontWeight: '700',
              color: 'gray',
            }}>
            Сообщение
          </Text>
          <UselessTextInput
            label="Сообщение"
            style={styles.inputMessage}
            labelStyle={{ marginHorizontal: 30, color: '#808080', fontSize: 18, fontWeight: '600' }}
            multiline
            onChangeText={(text) => {
              setMessage(text);
            }}
            numberOfLines={4}></UselessTextInput>
          <View>
            <View style={{ marginTop: 80 }}>
              <Button
                lab
                disabled={TopicMessage.length < 3}
                title="Отправить письмо"
                disabled={
                  Message.length < 6 || isEmailValid(Email) || TopicMessage.length < 6
                    ? true
                    : false
                }
                color="#FF0000"
                style={{
                  marginHorizontal: '23%',
                  borderRadius: 17,
                  backgroundColor: '#00a86b',
                  color: '#FF0000',
                  textAlign: 'center',
                  fontSize: 22,
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text>Load</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputData: {
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputMessage: {
    backgroundColor: '#e0e0e0',
    height: 180,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    borderRadius: 14,
  },
});
