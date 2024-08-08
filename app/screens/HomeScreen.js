import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { db } from "../config/database";
import { collection, getDocs, doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";



const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksList);

        // // Uppdatera nextId till det största existerande ID:t + 1
        // if (booksList.length > 0) {
        //   const maxId = Math.max(...booksList.map(book => Number(book.id)));
        //   setNextId(maxId + 1);
        // } else {
        //   setNextId(1); // Om det inte finns några rutiner, börja med 1
        // }
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, []);

  const groupedBooks = books.reduce((groups, book) => {
    const { type } = book;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(book);
    return groups;
  }, {});
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      {Object.keys(groupedBooks).map((type) => (
        <View  style={styles.list}>
          <View key={type} style={styles.listHeader}>
            <Text style={styles.listTitle}>{type}</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {groupedBooks[type].map(({ id, name, img }) => (
                      <TouchableOpacity
                        key={id}
                        onPress={() => {
                          // handle onPress
                        }}>
                        <View style={styles.card}>
                          <Image
                            alt=""
                            source={{ uri: img }}
                            style={styles.cardCover} />

                          <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{name}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        ))}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** List */
  list: {
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
    color: '#000',
  },
  listAction: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'right',
    letterSpacing: -0.24,
    color: '#0067ff',
  },
  listContent: {
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 0,
  },
  /** Card */
  card: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 12,
  },
  cardCover: {
    width: 74,
    height: 74,
    borderRadius: 18,
    marginRight: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    fontWeight: '500',
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: 0.38,
    color: '#070b11',
    marginBottom: 6,
  },
  cardAction: {
    paddingHorizontal: 8,
  },
});