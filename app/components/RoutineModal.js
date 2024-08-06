import React from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../config/colors';

const getCheckboxColor = (isChecked) => {
  return isChecked ? colors.green : colors.gray;
};

const ModalForm = ({
  modalVisible,
  setModalVisible,
  value,
  onChangeText,
  selectedTypes,
  toggleCheckbox,
  addRoutine, 
  nextId
}) => {

  const handleSave = () => {
    const selectedType = Object.keys(selectedTypes).find(key => selectedTypes[key]);
  
    if (!selectedType) {
      alert("Vänligen välj minst en typ.");
      return;
    }
  
    const newRoutine = {
      id: nextId.toString(),  // Använd nextId som ID
      type: selectedType,
      description: value,
    };
  
    addRoutine(newRoutine);
    onChangeText("");  // Rensa inputfältet
    toggleCheckbox(null);  // Rensa checkboxar
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
                <Text style={styles.modalContentHeading}>Lägg till ny rutin</Text>
                <Text style={styles.modalText}>Välj typ:</Text>
                <View style={styles.modalCheckboxes}>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        value={selectedTypes.Morgon}
                        onValueChange={() => toggleCheckbox('Morgon')}
                        style={styles.checkbox}
                        color={getCheckboxColor(selectedTypes.Morgon)}
                      />
                      <Text style={styles.checkboxLabel}>Morgon</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        value={selectedTypes.Dag}
                        onValueChange={() => toggleCheckbox('Dag')}
                        style={styles.checkbox}
                        color={getCheckboxColor(selectedTypes.Dag)}
                      />
                      <Text style={styles.checkboxLabel}>Dag</Text>
                    </View>
                  </View>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        value={selectedTypes.Kväll}
                        onValueChange={() => toggleCheckbox('Kväll')}
                        style={styles.checkbox}
                        color={getCheckboxColor(selectedTypes.Kväll)}
                      />
                      <Text style={styles.checkboxLabel}>Kväll</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        value={selectedTypes.Övrigt}
                        onValueChange={() => toggleCheckbox('Övrigt')}
                        style={styles.checkbox}
                        color={getCheckboxColor(selectedTypes.Övrigt)}
                      />
                      <Text style={styles.checkboxLabel}>Övrigt</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.modalText}>Skriv in din rutin:</Text>
                <View style={styles.modalInputfield}>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={styles.modalInput}
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
    alignItems: 'center',
  },
  modalContentHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  modalInput: {
    margin: 10,
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
    marginBottom: 10,
  },
  modalButtons:{
    flexDirection: 'row',

  }
});

export default ModalForm;
