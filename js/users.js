const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");

const todoContainer = document.getElementById('todo-container');

function renderTime()
{
    var mydate=new Date();
    var year=mydate.getYear();
    if(year<1000)
        year+=1900;
    var day=mydate.getDay();
    var month=mydate.getMonth();
    var daym=mydate.getDate();
    var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    var currentTime=new Date();
    var hour=currentTime.getHours();
    var minute=currentTime.getMinutes();
    var second=currentTime.getSeconds();
    if(hour==24)
        hour=0;
    else if(hour>12)
        hour=hour-0;
    if(hour<10)
        hour="0"+hour;
    if(minute<10)
        minute="0"+minute;
    if(second<10)
        second="0"+second;
    var myClock=document.getElementById("clockDisplay");
    myClock.textContent=""+dayarray[day]+" "+daym+" "+montharray[month]+" "+year+" | "+hour+":"+minute+":"+second;
    myClock.innerText=""+dayarray[day]+" "+daym+" "+montharray[month]+" "+year+" | "+hour+":"+minute+":"+second;

    setTimeout("renderTime()",1000);
}
renderTime();

auth.onAuthStateChanged(user => {
    if (user)
    {
        console.log('user is signed in Successfully !!!');
    }
    else 
    {
        //alert('your login session has expired, login to continue');
        //location = "logout.html";
        showAlertBox();
    }
})


function renderData(individualDoc) 
{
    let parentDiv = document.createElement("div");
    parentDiv.className = "container todo-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    let todoDiv = document.createElement("div");
    todoDiv.textContent = individualDoc.data().todos;

    let trash = document.createElement("button");

    let i = document.createElement("i");
    i.className = "fas fa-trash";

    trash.appendChild(i);

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(trash);

    // todoContainer.innerHTML += `
    //     <div class="container todo-box" id ="${individualDoc.doc.id}">
    //       <div>${individualDoc.doc.data().todos}</div>
    //       <button onClick="deleteTodo('${individualDoc.doc.id}','${user.uid}')"><i class='fas fa-trash'></i></button>
    //     </div>
    //     `
    todoContainer.appendChild(parentDiv);

    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection(user.uid).doc(id).delete();
            }
        })
    })
}

auth.onAuthStateChanged(user => {
    const username = document.getElementById('username');
    if (user)
     {
        fs.collection('users').doc(user.uid).get().then((snapshot) => {
            username.innerText = snapshot.data().Name;
        })
    }
    else {
        // console.log('user is not signed in to retrive username');
    }
})

const form = document.getElementById('form');
let date = new Date();
let time = date.getTime();
let counter = time;
form.addEventListener('submit', e => {
    e.preventDefault();
    const todos = form['todos'].value;
    // console.log(todos);
    let id = counter += 1;
    form.reset();
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection(user.uid).doc('_' + id).set({
                id: '_' + id,
                todos
            }).then(() => {
                console.log('todo added');
            }).catch(err => {
                console.log(err.message);
            })
        }
        else {
            // console.log('user is not signed in to add todos');
        }
    })
})

function logout() 
{
    auth.signOut();
    //location = "logout.html";
}

auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection(user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == "added") {
                    renderData(change.doc);
                }
                else if (change.type == 'removed') {
                    let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})

const floating_btn = document.querySelector('.floating-btn1');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

const model_container = document.getElementById("model_container");
function showAlertBox()
{
    model_container.classList.add('show');
    setTimeout(function(){
            window.location.href = 'logout.html';
         }, 5000);
}
