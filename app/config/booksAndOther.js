import { db } from './database';
import { collection, doc, setDoc } from 'firebase/firestore';

const books = [
  { id: '1', 
    type: 'Bok', 
    name: 'Depphjärnan', 
    img: 'https://image.bokus.com/images/9789178871148_200px_depphjarnan-varfor-mar-vi-sa-daligt-nar-vi-har-det-sa-bra'
  },
  { id: '2', 
    type: 'Bok', 
    name: 'Sex subsatnser som förändrar ditt liv', 
    img: 'https://prod-bb-images.akamaized.net/book-covers/coverimage-9789198704709-publit-2022-12-20t01-03.jpg?w=640' 
  },
  { id: '3', 
    type: 'Bok', 
    name: 'ADHD från duktig kvinna till utbränd kvinna', 
    img: 'https://s1.adlibris.com/images/55090250/adhd---fran-duktig-flicka-till-utbrand-kvinna.jpg' 
  },
  { id: '4', 
    type: 'Podd', 
    name: 'Livscoacherna', 
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/90/a6/12/90a61286-88e0-bf2b-52f6-ebdced7b8bdf/mza_117753607676678442.jpg/900x900bb-75.jpg' 
  },
];

const seedBooks = async () => {
try {
    const bookRef = collection(db, 'books');

    // Skapa en array med alla setDoc-anrop
    const addPromises = books.map(async (book) => {
      const docRef = doc(bookRef, book.id); // Använd setDoc med ett specifikt dokument-ID
      await setDoc(docRef, {
        type: book.type,
        name: book.name,
        img: book.img
      });
      console.log(`Lade till: ${book.type} med ID: ${book.id} i Firestore-databasen.`);
    });

    // Vänta tills alla dokument är tillagda
    await Promise.all(addPromises);

    console.log('Alla böcker har lagts till i Firestore-databasen.');
  } catch (error) {
    console.error('Fel vid lagring av rutiner:', error);
  }
};

export default seedBooks;
