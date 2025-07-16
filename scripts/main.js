const amaranthPurple = "#a63446";
const hunyadiYellow = "#f6ae2d";
const viridian = "#558b6e";
const palatinateBlue = "#5035e9";
const indigo = "#590099";
const eerieBlack = "#222222";

let colors = [amaranthPurple, hunyadiYellow, viridian, palatinateBlue, indigo];
let userList = [];
let shuffle = [];
let picked = document.getElementById("picked");

let users = [
  {
    id: 1,
    firstName: "Rachelle",
  },
  {
    id: 2,
    firstName: "Heydar",
  },
  {
    id: 3,
    firstName: "Lio",
  },
  {
    id: 4,
    firstName: "Stephanie",
  },
  {
    id: 5,
    firstName: "Kai",
  },
];

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const randomIndex = (length) => Math.floor(Math.random() * length);

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function addWeight() {
  for (i = 0; i < 5; i++) {
    users[i].weight = 1;
  }
}

function renderUsers() {
  for (i = 0; i < 5; i++) {
    nameText = document.getElementById("name" + String(i + 1));
    nameText.textContent = users[i].firstName + " : " + users[i].weight;
    userList.push(users[i].firstName);
  }
}

function changeWeight(name, operator) {
  index = name - 1;
  weight = users[index].weight;
  nameText = document.getElementById("name" + String(name));
  if (operator === "+" && weight < 9) {
    weight++;
    users[index].weight = weight;
    nameText.textContent = users[index].firstName + " : " + users[index].weight;
  } else if (operator === "-" && weight > 1) {
    weight--;
    users[index].weight = weight;
    nameText.textContent = users[index].firstName + " : " + users[index].weight;
  } else {
    console.error("Error: Weight cannot go above 9 or below 1.");
  }
  nameText.textContent = users[index].firstName + " : " + users[index].weight;
}

async function spinning() {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 5; j++) {
      picked.textContent = userList[j];
      picked.style.color = colors[j];
      await wait(250);
    }
    shuffleArray(userList);
  }
}

async function spin() {
  shuffle = [];
  shuffleArray(colors);
  shuffleArray(userList);

  for (user of users) {
    for (i = 0; i < user.weight; i++) {
      shuffle.push(user.firstName);
    }
  }

  await spinning();

  randomName = shuffle[randomIndex(shuffle.length)];

  randomColor = colors[2];

  picked.textContent = randomName;
  picked.style.color = randomColor;

  await wait(250);

  for (i = 0; i < 5; i++) {
    nameText = document.getElementById("name" + String(i + 1));

    if (nameText.textContent === picked.textContent + " : " + users[i].weight) {
      nameText.style.color = randomColor;
    } else {
      nameText.style.color = eerieBlack;
    }
  }
}

addWeight();
renderUsers();

// async function getUsers() {
//   await fetch("https://javascript-capstone-backend.onrender.com/users")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => err);
// }

// getUsers();
