const userlogin = () => {
    var email = document.getElementById('email')
    var password = document.getElementById('password')
    var loginRole = document.getElementById('login-role')
    if(email.value!='' && password.value!='' && loginRole.value=='user'){
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(`login User .... ${JSON.stringify(user.uid)}`);
            location.href = '../dashboard/user/dashboard.html'
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`Login Error .... ${errorMessage.slice(0,16)} with these Credentials`);
        });
    }
    if(email.value!='' && password.value!='' && loginRole.value=='restaurant'){
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(`login User .... ${JSON.stringify(user.uid)}`);
            location.href = '../dashboard/restaurant/dashboard.html'
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`Login Error .... ${errorMessage.slice(0,16)} with these Credentials`);
        });
    }
    if(email.value=='' && password.value==''){
        alert('Fill Credentials')
    }
}





// const restlogin = () => {
//     var restaurantEmail = document.getElementById('restaurantEmail')
//     var restaurantPassword = document.getElementById('restaurantPassword')
//     if(restaurantEmail.value!='' && restaurantPassword.value!=''){
//         firebase.auth().signInWithEmailAndPassword(restaurantEmail.value, restaurantPassword.value)
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             console.log(`login User .... ${JSON.stringify(user.uid)}`);
//             location.href = '../dashboard/restaurant/dashboard.html'
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert(`Login Error .... ${errorMessage.slice(0,16)} with these Credentials`);
//         });
//     }
//     if(email.value=='' && userPassword.value==''){
//         alert('Fill Credentials')
//     }
// }





