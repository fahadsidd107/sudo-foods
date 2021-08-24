const signup = () => {
    const inputs = document.getElementsByTagName('input')
    var flag = true;
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var country = document.getElementById('country');
    var city = document.getElementById('city')
    var signupRole = document.getElementById('signup-role')
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            flag = false
        }
    }
    if (flag == false) {
        alert('Fill Credentials First !')
    }
    if (flag == true && signupRole.value == 'restaurant') {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                console.log(`Sign in SuccesFully`);
                firebase.database().ref(`restaurants/users/${userCredential.user.uid}/info`).set({
                    name: name.value,
                    email: email.value,
                    country: country.value,
                    city: city.value,
                    signupRole: signupRole.value,
                    uid: userCredential.user.uid
                });
                firebase.database().ref(`owners/`).push({
                    name: name.value,
                    email: email.value,
                    country: country.value,
                    city: city.value,
                    signupRole: signupRole.value,
                    uid: userCredential.user.uid
                });
                setTimeout(() => {
                    location.href = '../login/userlogin.html'
                }, 5000);
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    //for user
    if (flag == true && signupRole.value == 'user') {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                console.log(`Sign in SuccesFully`);
                firebase.database().ref(`customers/users/${userCredential.user.uid}/info`).set({
                    name: name.value,
                    email: email.value,
                    country: country.value,
                    city: city.value,
                    signupRole: signupRole.value,
                    uid: userCredential.user.uid
                });

                setTimeout(() => {
                    location.href = '../login/userlogin.html'
                }, 5000);
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

}

