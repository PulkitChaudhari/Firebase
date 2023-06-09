import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs,addDoc,deleteDoc,doc, onSnapshot, where,query,orderBy,serverTimestamp,getDoc,updateDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAsmpppFRY7M5qT3IwX2eGLUdRRTQ_pt5s",
    authDomain: "learning-project-510c5.firebaseapp.com",
    projectId: "learning-project-510c5",
    storageBucket: "learning-project-510c5.appspot.com",
    messagingSenderId: "1052107907592",
    appId: "1:1052107907592:web:e344693e4c9016ddb3a7bd"
  };

// Initialized application
initializeApp(firebaseConfig)

// Init services
const db = getFirestore()

//collection Ref
const colRef = collection(db,'books')

const q = query(colRef,orderBy('createdAt'))

// real time Collection data
onSnapshot(q,(snapshot)=>{
    let books = []
    snapshot.docs.forEach((data)=>{
        books.push({...data.data(),id:data.id})
    })
    console.log(books)
})

// Used to add data
const addForm = document.querySelector('.add')
addForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(colRef,{
        title:addForm.title.value,
        author:addForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(()=>{
        addForm.reset()
    })
})

// Used for deleting data
const deleteForm = document.querySelector('.delete')
deleteForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const docRef = doc(db,'books',deleteForm.docId.value)
    deleteDoc(docRef).then(()=>{
        deleteForm.reset()
    })
})

// Get a single document
const docRef = doc(db,'books','2KmEe9i5xSM1lPAMS9J3')
getDoc(docRef).then((doc)=>{
    console.log("here")
    console.log(doc.data(),doc.id)
})

// Displays new data for a single document after making changes in it 
onSnapshot(docRef,(doc)=>{
    console.log(doc.data(),doc.id)
})

const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const docRef = doc(db,'books',updateForm.id.value);
    updateDoc(docRef,{
        title:"updated title222"
    }).then(()=>{
        updateForm.reset();
    })
})

