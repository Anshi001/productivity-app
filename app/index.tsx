import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { useTaskContext } from '../context/TaskContext';




export default function InboxScreen() {
  const { inboxTasks, setInboxTasks } = useTaskContext();
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      setInboxTasks([...inboxTasks, { id: Date.now(), text: taskText }]);
      setTaskText('');
    }
  };

  return (
        <View style={styles.container}>
      <TextInput style={styles.input} value={taskText} onChangeText={setTaskText} placeholder="Add a new task..." />
      <Button title="Add" onPress={addTask} />
      <FlatList
        data={inboxTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 }
});
