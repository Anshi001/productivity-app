import { Tabs } from 'expo-router';
import { TaskProvider } from '../context/TaskContext';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <TaskProvider>
      <Tabs screenOptions={{ headerShown: true,}}>
        <Tabs.Screen name="index" options={{ title: 'Inbox' ,tabBarIcon: () => <Ionicons name="mail-outline" size={20}  /> }} />
        <Tabs.Screen name="process" options={{ title: 'Process', tabBarIcon: () => <Ionicons name="construct-outline" size={20} /> }} />
        <Tabs.Screen name="next-actions" options={{ title: 'Next Actions', tabBarIcon: () => <Ionicons name="checkmark-done-outline" size={20} /> }} />
      </Tabs>
    </TaskProvider>
  );
}
