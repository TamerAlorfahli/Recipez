const firebaseConfig = {
    apiKey: "AIzaSyBVcert8eFEYq8lvTbpX9K7gdM84eVX2DQ",
    authDomain: "recipez-ed63b.firebaseapp.com",
    projectId: "recipez-ed63b",
    storageBucket: "recipez-ed63b.appspot.com",
    messagingSenderId: "240558922178",
    appId: "1:240558922178:web:d0beb84e7db1b25cfede5b"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database() 

function register(){
 var email = document.getElementById('email').value
 var password = document.getElementById('password').value
console.log(email)
console.log(password)


//fixed register
auth.createUserWithEmailAndPassword(email,password)
.then(function(){
var user = auth.currentUser

var database_ref = database.ref()

var user_data = {
   email : email,
   last_login : Date.now()
}

database_ref.child('users/' + user.uid).set(user_data)

alert('Account Created')
})


.catch (function(error) {
var error_code = error.code
var error_message = error. message

alert (error_message)
})
}
function login(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email)
    console.log(password)
    auth.signInWithEmailAndPassword(email,password)

    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()

            var user_data = {
                email : email,
                last_login : Date.now()
}

database_ref.child('users/' + user.uid).update(user_data)

alert('Logged In')
    })
    .catch (function(error) {
        var error_code = error.code
        var error_message = error. message
    })
}

