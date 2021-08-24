
const addItem = () => {
    // console.log(item);
    // if (name.value != '' && description.value != '' && category.value != '' && price.value != 0) {
    //     alert(`item Added`)
    // }
    // else {
    //     alert('Fill All Details to Add Items')
    // }
    var name = document.getElementById('name')
    var description = document.getElementById('description')
    var category = document.getElementById('categories')
    var price = document.getElementById('price')

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            console.log(`login as ${uid}`);
            firebase.database().ref(`restaurants/users/${uid}/foods/${name.value}`).set({
                name: name.value,
                description: description.value,
                category: category.value,
                price: price.value
            });
            // firebase.database().ref(`${uid}/admin/foods`).on('child_added', function (data) {
            //     console.log(data.val());

            // })
            // ...
        } else {
            // User is signed out
            console.log('Error Adding Item');
            // ...
        }
    });

}








const currentUser = () => {
    var currentUserName = document.getElementById('currentUserName');
    var currentUserEmail = document.getElementById('currentUserEmail');
    var currentUserCountry = document.getElementById('currentUserCountry');
    var currentUserCity = document.getElementById('currentUserCity');

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            firebase.database().ref(`restaurants/users/${uid}/info`).on('value', function (data) {
                try {

                    console.log(data.val());
                    if (data.val().signupRole == 'restaurant') {
                        console.log('login as  Restaurant');
                        currentUserName.innerHTML = data.val().name
                        currentUserEmail.innerHTML = data.val().email
                        currentUserCountry.innerHTML = data.val().country
                        currentUserCity.innerHTML = data.val().city
                    }
                    throw error
                } catch (error) {
                    console.log('error');
                }

            
            })
            firebase.database().ref(`customers/users/${uid}/info`).on('value', function (data) {
                try {
                    console.log(data.val().city);
                    if (data.val().signupRole == 'user') {
                        console.log('login as  user');
                        currentUserName.innerHTML = data.val().name
                        currentUserEmail.innerHTML = data.val().email
                        currentUserCountry.innerHTML = data.val().country
                        currentUserCity.innerHTML = data.val().city


                    }
                    throw error
                } catch (error) {
                    console.log('error');
                }
            })
            firebase.database().ref(`restaurants/users/${uid}/foods`).on('child_added', function (data) {
                console.log('items ', data.val());

                var post = document.getElementById('foodDiv');
                var divMain = document.createElement('div');
                var h5 = document.createElement('h5');
                var divInner = document.createElement('div');
                var image = document.createElement('img');
                var para = document.createElement('p')
                var delBtn = document.createElement('button')
                var divTosetSize = document.createElement('div')
                divTosetSize.setAttribute('class', 'main-cards')
                divMain.setAttribute("class", "card")
                divMain.setAttribute("style", "width: 18rem;")
                image.setAttribute("class", "card-img-top")
                image.setAttribute("src", "../../images/burger.jpg")
                divInner.setAttribute("class", "card-body")
                h5.setAttribute("class", "card-title")
                para.setAttribute("class", "card-text")
                delBtn.setAttribute('class', 'btn btn-primary')
                var h5Text = document.createTextNode(`${data.val().name}`);
                h5.appendChild(h5Text)
                var paraText = document.createTextNode(`Rs ${data.val().price}`);
                para.appendChild(paraText)
                var delText = document.createTextNode('Delete')
                delBtn.appendChild(delText)
                divInner.appendChild(h5)
                divInner.appendChild(para)
                divInner.appendChild(delBtn)
                divMain.appendChild(image)
                divMain.appendChild(divInner);
                divTosetSize.appendChild(divMain);
                post.appendChild(divTosetSize);

            })
        }
    });
}



const logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert(' Logout Session ?')
        location.href = '../../login/userlogin.html'

    }).catch((error) => {
        // An error happened.
        alert('Error in logging out');
    });
}