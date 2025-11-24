import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const CURRENT_USER_KEY = '@current_user';

// User management
export const saveUser = async (username, password) => {
  try {
    const users = await getUsers();
    if (users[username]) {
      throw new Error('Username already exists');
    }
    users[username] = { username, password, createdAt: new Date().toISOString() };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : {};
  } catch (error) {
    return {};
  }
};

export const authenticateUser = async (username, password) => {
  try {
    const users = await getUsers();
    const user = users[username];
    if (user && user.password === password) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, username);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    return await AsyncStorage.getItem(CURRENT_USER_KEY);
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

// Notes management
export const getNotes = async (username) => {
  try {
    const notesKey = `@notes_${username}`;
    const notesJson = await AsyncStorage.getItem(notesKey);
    return notesJson ? JSON.parse(notesJson) : [];
  } catch (error) {
    return [];
  }
};

export const saveNote = async (username, note) => {
  try {
    const notes = await getNotes(username);
    const noteId = note.id || Date.now().toString();
    const existingIndex = notes.findIndex(n => n.id === noteId);
    
    const noteToSave = {
      ...note,
      id: noteId,
      updatedAt: new Date().toISOString(),
      createdAt: existingIndex >= 0 ? notes[existingIndex].createdAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      notes[existingIndex] = noteToSave;
    } else {
      notes.push(noteToSave);
    }

    const notesKey = `@notes_${username}`;
    await AsyncStorage.setItem(notesKey, JSON.stringify(notes));
    return noteToSave;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (username, noteId) => {
  try {
    const notes = await getNotes(username);
    const filteredNotes = notes.filter(n => n.id !== noteId);
    const notesKey = `@notes_${username}`;
    await AsyncStorage.setItem(notesKey, JSON.stringify(filteredNotes));
    return true;
  } catch (error) {
    throw error;
  }
};

