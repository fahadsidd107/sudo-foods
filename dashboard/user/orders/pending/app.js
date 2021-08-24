const pending = () => {
    firebase.database().ref(`restaurants/users//orders/pending`).on('child_added', function (data) {
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