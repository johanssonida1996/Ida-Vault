import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View, AppRegistry } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { db } from "../config/database";
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc  } from "firebase/firestore";
import RoutineCard from "../components/RoutineCard";
import ModalForm from "../components/RoutineModal";

const sortOrder = {
  Morgon: 1,
  Dag: 2,
  Kväll: 3,
  Övrigt: 4,
};

export default function RoutineScreen() {
  const [routines, setRoutines] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [swipedIndex, setSwipedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = useState("Skriv in dina rutiner här..");
  const [selectedTypes, setSelectedTypes] = useState({
    Morgon: false,
    Dag: false,
    Kväll: false,
    Övrigt: false,
  });
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "routines"));
        const routinesList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => sortOrder[a.type] - sortOrder[b.type]);
        setRoutines(routinesList);
  
        // Uppdatera nextId till det största existerande ID:t + 1
        if (routinesList.length > 0) {
          const maxId = Math.max(...routinesList.map(routine => Number(routine.id)));
          setNextId(maxId + 1);
        } else {
          setNextId(1); // Om det inte finns några rutiner, börja med 1
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
  
    fetchData();
  }, []);

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = async (id) => {
    try {
      const routineDocRef = doc(db, "routines", id);
      await deleteDoc(routineDocRef);
      setRoutines(routines.filter((routine) => routine.id !== id));
    } catch (error) {
      console.error("Error removing document:", error);
    }
  };

  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
      <MaterialCommunityIcons name="trash-can-outline" size={30} color="black" />
    </TouchableOpacity>
  );

  const handleSwipeStart = (index) => {
    setSwipedIndex(index);
  };

  const handleSwipeEnd = () => {
    setSwipedIndex(null);
  };

  const toggleCheckbox = (type) => {
    setSelectedTypes({
      Morgon: type === "Morgon",
      Dag: type === "Dag",
      Kväll: type === "Kväll",
      Övrigt: type === "Övrigt",
    });
  };


  const addRoutine = async (routine) => {
    try {
      // Använd setDoc med nästa ID
      const newRoutine = { ...routine, id: nextId.toString() };
      const docRef = doc(db, 'routines', newRoutine.id);
      await setDoc(docRef, newRoutine);

      // Öka nextId efter att rutinen har lagts till
      setNextId(prevId => prevId + 1);

      // Uppdatera rutinerna efter att ha lagt till en ny rutin
      fetchRoutines();

      // Stäng modalen
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchRoutines = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'routines'));
      const routinesList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => sortOrder[a.type] - sortOrder[b.type]);
      setRoutines(routinesList);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {routines.map(({ id, type, description }, index) => (
          <RoutineCard key={id} id={id} type={type} description={description} index={index} expandedIndex={expandedIndex} swipedIndex={swipedIndex} handlePress={handlePress} handleSwipeStart={handleSwipeStart} handleSwipeEnd={handleSwipeEnd} renderRightActions={renderRightActions} />
        ))}
      </ScrollView>
      <View>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons color={colors.white} name="plus" size={40} />
          </TouchableOpacity>
          <ModalForm 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            value={value} 
            onChangeText={onChangeText} 
            selectedTypes={selectedTypes} 
            toggleCheckbox={toggleCheckbox}
            addRoutine={addRoutine}  // Passa ner funktionen här
            nextId={nextId}  // Passa ner nästa ID
          />
        </View>
      </View>
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  deleteButton: {
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: 10,
  },
  modalButtonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: 50,
    padding: 10,
    elevation: 10,
  },
});
