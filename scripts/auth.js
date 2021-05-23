//sign in users as artists
const artistForm = document.querySelector('#artist-form');

    artistForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
    const email = artistForm['artist-email'].value;
    const password = artistForm['artist-password'].value;
    
    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        var uid = cred.user.uid;
        return db.collection('artists').doc(cred.user.uid).set({
            name: artistForm['artist-name'].value,
            uid: uid,
            email: email,
            artistType: document.getElementById('artist-type').value,
            genre: document.getElementById('genre').value,
            instrument: document.getElementById('instrument').value,
            links: document.getElementById('link1').value,
            state: document.getElementById('artist-state').value,
            phone: document.getElementById('artist-phone').value,
            fee: document.getElementById('artist-fee').value
        }).then(()=>{
            db.collection('artists').where("uid", "==", uid).get().then((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                   console.log(doc.data())
                    artistForm.reset();
                })
              })    
              })
        })
    });

//sign up users as clients
const clientForm = document.querySelector('#client-form');
    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get user info
        const email = clientForm['client-email'].value;
        const password = clientForm['client-password'].value;
      
        // sign the user in
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            var uid = cred.user.uid;
            return db.collection('clients').doc(cred.user.uid).set({
                name: clientForm['client-name'].value,
                uid: uid,
                email: email,
                state: document.getElementById('client-state').value,
                phone: document.getElementById('client-phone').value,
            }).then(()=>{
                db.collection('clients').where("uid", "==", uid).get().then((snapshot)=>{
                    snapshot.docs.forEach((doc)=>{
                       console.log(doc.data())
                        clientForm.reset();
                    })
                  })    
                  })
            })
      });      

// //create profile display with firestore data
// function renderProfileDisplay(doc){
//     // document.getElementById('profile-name').innerHTML = `Username: ${doc.data().name}`

// }

//  //get documents from firestore
//  db.collection('artists').get().then((snapshot)=>{
//     snapshot.docs.forEach((doc)=>{
//       console.log(doc.data())
//     //   renderProfileDisplay(doc);
//     })
//   })