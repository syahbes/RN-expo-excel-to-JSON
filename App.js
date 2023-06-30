import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import parseExcelToJson from './ExcelParser';

const ALLOWED_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
];

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFilePick = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: ALLOWED_TYPES });

      if (file.type === 'success') {
        const data = await parseExcelToJson(file.uri)
        console.log(data)
        setJsonData(data);
      }
    } catch (error) {
      console.error('Error picking the file:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Button title="Select Excel File" onPress={handleFilePick} />
      {jsonData && (
        <Text style={styles.jsonData}>{JSON.stringify(jsonData, null, 2)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jsonData: {
    marginTop: 20,
    fontFamily: 'monospace',
  },
});

export default App;
