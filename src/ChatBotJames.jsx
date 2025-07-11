// Firebase setup
import { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDrIe9iLDu5YF9uwRKktIVfrZ3LxetBqgU",
  authDomain: "project-james-e07c9.firebaseapp.com",
  projectId: "project-james-e07c9",
  storageBucket: "project-james-e07c9.firebasestorage.app",
  messagingSenderId: "149150094527",
  appId: "1:149150094527:web:0872e6a611e3228919620a",
  measurementId: "G-7H9F1CY0TV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Main component
function ChatBotJames() {
  // Your chatbot logic goes here...
  return (
    <Card>
      <CardContent>
        <p>Hello from James</p>
      </CardContent>
    </Card>
  );
}

// ✅ Export after definition
export default ChatBotJames;
