import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View, Text, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { db } from "../config/database";
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";
import ExerciseModalForm from "../components/ExerciseModal";

export default function ExerciseScreen() {
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [valueText, onChangeText] = useState("");
  const [valueType, onChangeType] = useState("");
  const [valueLink, onChangeLink] = useState("");
  const [valueName, onChangeName] = useState("");
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "exercises"));
        const exercisesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExercises(exercisesList);

        // Uppdatera nextId till det största existerande ID:t + 1
        if (exercisesList.length > 0) {
          const maxId = Math.max(...exercisesList.map(exercise => Number(exercise.id)));
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

  const handleDelete = async (id) => {
    try {
      const exerciseDocRef = doc(db, "exercises", id);
      await deleteDoc(exerciseDocRef);
      setExercises(exercises.filter((exercise) => exercise.id !== id));
    } catch (error) {
      console.error("Error removing document:", error);
    }
  };

  const addExercise = async (exercise) => {
    try {
      // Använd setDoc med nästa ID
      const newExercise = { ...exercise, id: nextId.toString() };
      const docRef = doc(db, 'exercises', newExercise.id);
      await setDoc(docRef, newExercise);

      // Öka nextId efter att rutinen har lagts till
      setNextId(prevId => prevId + 1);

      // Uppdatera rutinerna efter att ha lagt till en ny rutin
      fetchExercises();

      // Stäng modalen
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchExercises = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'exercises'));
      const exercisesList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      setExercises(exercisesList);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  // Gruppar övningarna efter deras typ
  const groupedExercises = exercises.reduce((groups, exercise) => {
    const { type } = exercise;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(exercise);
    return groups;
  }, {});

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {Object.keys(groupedExercises).map((type) => (
          <View key={type} style={styles.section}>
            <Text style={styles.sectionHeader}>{type}</Text>
            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {groupedExercises[type].map(({ id, name, description, link }) => (
                <View key={id} style={styles.exerciseCard}>
                  <View>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={18} color="black" />
                  </TouchableOpacity>
                  </View>
                  <View>
                  <Text style={styles.exerciseName}>{name}</Text>
                  <Text style={styles.exerciseDesc}>{description}</Text>
                  {link ? (
                    <Text 
                      style={styles.link} 
                      onPress={() => Linking.openURL(link)}
                    >
                      Länk
                    </Text>
                  ) : null}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <View>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons color={colors.white} name="plus" size={40} />
          </TouchableOpacity>
          <ExerciseModalForm 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            valueText={valueText} 
            onChangeText={onChangeText}
            valueLink={valueLink}
            onChangeLink={onChangeLink}
            valueType={valueType}
            onChangeType={onChangeType}
            valueName={valueName}
            onChangeName={onChangeName}
            addExercise={addExercise}  
            nextId={nextId} 
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  exerciseCard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start'
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseDesc:{
    marginBottom: 10,
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
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10
  },
  deleteButton:{
    
  }
});


