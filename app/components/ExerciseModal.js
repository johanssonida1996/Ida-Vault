import React from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../config/colors';


const ExerciseModalForm = ({
  modalVisible,
  setModalVisible,
  valueText,
  valueLink,
  valueType,
  valueName,
  onChangeType,
  onChangeText,
  onChangeLink,
  onChangeName,
  addExercise, 
  nextId
}) => {

  const handleSave = () => {
  
    if (!valueType) {
      alert("Du måste skriva i en kategori");
      return;
    }
    if (!valueName) {
      alert("Du måste skriva i en titel");
      return;
    }
    if (!valueText) {
      alert("Du måste skriva i en övning");
      return;
    }
  
    const newExercise = {
      id: nextId.toString(), 
      type: valueType,
      name: valueName,
      description: valueText,
      link: valueLink
    };
  
    addExercise(newExercise);
    onChangeType(""); 
    onChangeText(""); 
    onChangeLink(""); 
    onChangeName(""); 
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent}>
                <Text style={styles.modalContentHeading}>Lägg till ny övning</Text>
                <Text style={styles.modalText}>Skriv i vilken typ:</Text>
                <TextInput 
                 editable
                 numberOfLines={1}
                 maxLength={200}
                 onChangeText={type => onChangeType(type)}
                 value={valueType}
                 style={styles.modalInput1}
                />
               <Text style={styles.modalText}>Skriv i titel:</Text>
                <TextInput 
                 editable
                 numberOfLines={1}
                 maxLength={200}
                 onChangeName={name => onChangeName(name)}
                 value={valueName}
                 style={styles.modalInput1}
                />
                <Text style={styles.modalText}>Skriv in din övning:</Text>
                <View style={styles.modalInputfield}>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={7}
                    maxLength={1000}
                    onChangeText={text => onChangeText(text)}
                    value={valueText}
                    style={styles.modalInput}
                  />
                </View>
                <Text style={styles.modalText}>Skriv in länk:</Text>
                <View style={styles.modalInputfield}>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={1000}
                    onChangeText={link => onChangeLink(link)}
                    value={valueLink}
                    style={styles.modalInput1}
                  />
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.closeButtonText}>Spara</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Stäng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};


const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: 340,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalContentHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalCheckboxes: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderColor: colors.gray,
  },
  modalInputfield: {
    marginBottom: 10,
  },
  modalInput1: {
   borderWidth: 1,
   borderRadius: 10,
   padding: 20,
   minWidth: 250,
   borderColor: colors.gray
 },
  modalInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    minWidth: 250,
    minHeight: 100,
    borderColor: colors.gray
  },
  saveButton: {
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10
  },
  closeButton: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'medium',
    marginTop: 10,
    marginBottom: 10
  },
  modalButtons:{
    flexDirection: 'row',
   justifyContent: 'center'
  }
});

export default ExerciseModalForm;