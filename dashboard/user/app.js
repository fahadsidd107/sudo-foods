const allRestaurentOwners = () => {
    try {

        firebase.database().ref(`owners/`).on('child_added', function (data) {
            var ownerDrpdown = document.getElementById('owners')
            var li = document.createElement('li')
            var a = document.createElement('a')
            var ownerName = document.createTextNode(data.val().name)
            a.appendChild(ownerName)
            a.setAttribute('class', 'dropdown-item')
            a.setAttribute('href', '#menus')
            a.setAttribute('id', data.val().uid)
            a.setAttribute('onclick', 'getId(this)')
            li.appendChild(a)
            ownerDrpdown.appendChild(li)
        })
        throw error

    } catch (error) {
        console.log("Error in getting Restaurants");
    }
}





const currentUser = () => {
    var currentUserName = document.getElementById('currentUserName');
    var currentUserEmail = document.getElementById('currentUserEmail');
    var currentUserCountry = document.getElementById('currentUserCountry');
    var currentUserCity = document.getElementById('currentUserCity');

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            firebase.database().ref(`customers/users/${uid}/info`).on('value', function (data) {
                console.log(data.val().name);
                console.log('login as  user');
                currentUserName.innerHTML = data.val().name
                currentUserEmail.innerHTML = data.val().email
                currentUserCountry.innerHTML = data.val().country
                currentUserCity.innerHTML = data.val().city
            })
        }
    });
    allRestaurentOwners();
}



function getId(e) {
    console.log(e.id);
    firebase.database().ref(`restaurants/users/${e.id}/foods`).once('child_added', function (data) {
        console.log('items ', data.val());
        if (data.val().name != undefined) {
            var post = document.getElementById('foodDiv');
            var divMain = document.createElement('div');
            var h5 = document.createElement('h5');
            var divInner = document.createElement('div');
            var image = document.createElement('img');
            var para = document.createElement('p')
            var orderBtn = document.createElement('button')
            var divTosetSize = document.createElement('div')
            divTosetSize.setAttribute('class', 'main-cards')
            divMain.setAttribute("class", "card")
            divMain.setAttribute("style", "width: 18rem;")
            image.setAttribute("class", "card-img-top")
            image.setAttribute("src", "../../images/burger.jpg")
            divInner.setAttribute("class", "card-body")
            h5.setAttribute("class", "card-title")
            h5.setAttribute("class", "food-name")

            para.setAttribute("class", "card-text")
            para.setAttribute("class", "food-price")

            orderBtn.setAttribute('class', 'btn btn-primary')
            orderBtn.setAttribute('onclick', 'order(this)')
            var h5Text = document.createTextNode(`${data.val().name}`);
            h5.appendChild(h5Text)
            var paraText = document.createTextNode(`Rs ${data.val().price}`);
            para.appendChild(paraText)
            var orderText = document.createTextNode('Order')
            orderBtn.appendChild(orderText)
            divInner.appendChild(h5)
            divInner.appendChild(para)
            divInner.appendChild(orderBtn)
            divMain.appendChild(image)
            divMain.appendChild(divInner);
            divTosetSize.appendChild(divMain);
            post.appendChild(divTosetSize);
        }
        if (data.val().name == '') {
            document.getElementById('foodDiv').innerHTML = " Shop not Found"

        }
    })

}



//orders 
function order(e) {
    const name = e.parentNode.childNodes[0].innerHTML
    const price = e.parentNode.childNodes[0].innerHTML
    // console.log();  // name
    // console.log(e.parentNode.childNodes[1].innerHTML);  // price
    firebase.database().ref(`restaurants/users/order/pendingorders`).set({
       name:name,
       price:price
    });
}













const logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert(' Logout Session ?')
        location.href = '../../login/userlogin.html'

    }).catch((error) => {
        // An error happened.
    });
}

