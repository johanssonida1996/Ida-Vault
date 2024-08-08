import { db } from './database';
import { collection, doc, setDoc } from 'firebase/firestore';

const exercises = [
  { id: '1', type: 'Meditation', name: 'Släpp taget', description: 'Det här är en övning för meditation', link:'https://youtu.be/uTN29kj7e-w?si=ifqXfAu5fspNOsKj' },
  { id: '2', type: 'Yoga', name:'Strech för ländryggen', description: 'Det här är en övning för ryggen', link:'' },
  { id: '3', type: 'Andning', name:'Lär dig andas', description: 'Det här är en övning för andning', link:'' },
  { id: '4', type: 'Övrigt', name:'Lär dig le', description: 'Det här är en övning för övrigt', link:'' },
  { id: '5', type: 'Meditation', name:'Innan läggdags', description: 'Det här är en övning för innan du ska sova', link:'' },
  { id: '6', type: 'Yoga', name:'Strech för nacken', description: 'Det här är en övning för nacken', link:'' },
];

const seedExercises = async () => {
  try {
    const exerciseRef = collection(db, 'exercises');

    // Skapa en array med alla setDoc-anrop
    const addPromises = exercises.map(async (exercise) => {
      const docRef = doc(exerciseRef, exercise.id); // Använd setDoc med ett specifikt dokument-ID
      await setDoc(docRef, {
        type: exercise.type,
        name: exercise.name,
        description: exercise.description,
        link: exercise.link
      });
      console.log(`Lade till: ${exercise.type} med ID: ${exercise.id} i Firestore-databasen.`);
    });

    // Vänta tills alla dokument är tillagda
    await Promise.all(addPromises);

    console.log('Alla övningar har lagts till i Firestore-databasen.');
  } catch (error) {
    console.error('Fel vid lagring av rutiner:', error);
  }
};

export default seedExercises;
