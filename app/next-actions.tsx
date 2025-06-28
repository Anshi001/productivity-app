import React from 'react';
import { View, Text, FlatList, StyleSheet, Switch } from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { Picker } from '@react-native-picker/picker';


export default function NextActionsScreen() {
  const { nextActions, setNextActions, projects, contexts } = useTaskContext();
  const [filterProject, setFilterProject] = React.useState('');
  const [filterContext, setFilterContext] = React.useState('');

  const toggleDone = (id: number) => {
    setNextActions(nextActions.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const filtered = nextActions.filter(task =>
    (filterProject === '' || task.project === filterProject) &&
    (filterContext === '' || task.context === filterContext)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter by Project:</Text>
      <Picker selectedValue={filterProject} onValueChange={setFilterProject}>
        <Picker.Item label="All" value="" />
        {projects.map(p => <Picker.Item key={p} label={p} value={p} />)}
      </Picker>

      <Text style={styles.heading}>Filter by Context:</Text>
      <Picker selectedValue={filterContext} onValueChange={setFilterContext}>
        <Picker.Item label="All" value="" />
        {contexts.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Switch value={item.done} onValueChange={() => toggleDone(item.id)} />
            <Text style={[styles.taskText, item.done && styles.done]}>
              {item.text} ({item.project} - {item.context})
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontWeight: 'bold', marginTop: 10 },
  taskRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  taskText: { marginLeft: 10 },
  done: { textDecorationLine: 'line-through', color: 'gray' }
});
