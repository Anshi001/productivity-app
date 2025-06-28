import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { Picker } from '@react-native-picker/picker';


export default function ProcessScreen() {
  const { inboxTasks, setInboxTasks, projects, contexts, nextActions, setNextActions } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedContext, setSelectedContext] = useState(contexts[0]);

  const processTask = () => {
    if (selectedTask) {
      setNextActions([...nextActions, { ...selectedTask, project: selectedProject, context: selectedContext, done: false }]);
      setInboxTasks(inboxTasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Select a task to process:</Text>
      {inboxTasks.map((task) => (
  <View key={task.id} style={{ marginVertical: 6 , borderRadius:20}}>
    <Button title={task.text} onPress={() => setSelectedTask(task)} />
  </View>
))}


      {selectedTask && (
        <View style={styles.pickers}>
          <Text>Assign Project:</Text>
          <Picker selectedValue={selectedProject} onValueChange={setSelectedProject}>
            {projects.map(p => <Picker.Item key={p} label={p} value={p} />)}
          </Picker>

          <Text>Assign Context:</Text>
          <Picker selectedValue={selectedContext} onValueChange={setSelectedContext}>
            {contexts.map(c => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>

          <Button title="Mark as Next Action" onPress={processTask} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, 
    
  },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  pickers: { marginTop: 20 }
});
