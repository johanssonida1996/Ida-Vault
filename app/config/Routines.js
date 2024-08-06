import { db } from './database';
import { collection, doc, setDoc } from 'firebase/firestore';

const routines = [
  { id: '1', type: 'Morgon', description: 'Det här är en rutin för morgonen' },
  { id: '2', type: 'Dag', description: 'Det här är en rutin för dagen' },
  { id: '3', type: 'Kväll', description: 'Det här är en rutin för kvällen' },
  { id: '4', type: 'Övrigt', description: 'Det här är en rutin för övrigt' },
];

const seedRoutines = async () => {
  try {
    const routineRef = collection(db, 'routines');

    // Skapa en array med alla setDoc-anrop
    const addPromises = routines.map(async (routine) => {
      const docRef = doc(routineRef, routine.id); // Använd setDoc med ett specifikt dokument-ID
      await setDoc(docRef, {
        type: routine.type,
        description: routine.description,
      });
      console.log(`Lade till: ${routine.type} med ID: ${routine.id} i Firestore-databasen.`);
    });

    // Vänta tills alla dokument är tillagda
    await Promise.all(addPromises);

    console.log('Alla rutiner har lagts till i Firestore-databasen.');
  } catch (error) {
    console.error('Fel vid lagring av rutiner:', error);
  }
};

export default seedRoutines;
