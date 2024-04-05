
window.addEventListener("load", () => {
  const sortableList = document.querySelector(".body-elements");
  const items = sortableList.querySelectorAll(".item");
  var list = document.getElementById("element-list");

  document.getElementById("add-body-pg").addEventListener("click", () => {
    list = document.getElementById("element-list");
    list.appendChild(generateElement("body", "", items.length, list));
    makeDraggable();
  });

  document.getElementById("add-sources-pg").addEventListener("click", () => {
    list = document.getElementById("element-sources-list");
    list.appendChild(generateElement("source", "", items.length, list));
    makeDraggable();
  });

  document.getElementById("add-pull-quote").addEventListener("click", () => {
    list = document.getElementById("element-list");
    list.appendChild(generateElement("pull", "", items.length, list));
    makeDraggable();
  });
  document.getElementById("submit").addEventListener("click", () => {
    updateFormFields();
  });
  document.getElementById("delete-source-button").addEventListener("click", () => {
    list = document.getElementById("element-sources-list");
    list.removeChild(list.children[0]);
  });
});

function generateElement(type, text, index, list) {
  //textarea
  let textarea = document.createElement("textarea");
  textarea.classList.add("input-text", type);
  textarea.placeholder = type;
  textarea.innerHTML = text;

  //div to contain the textarea
  let div = document.createElement("div");
  div.classList.add("details");
  div.appendChild(textarea);

  //delete button
  let deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = `delete-item-${list.children.length}`; 
  deleteButton.addEventListener("click", () => {
    console.log(deleteButton.parentNode);
    list.removeChild(deleteButton.parentNode);
  });

  //delete image icon
  let deleteImg = document.createElement("img");
  deleteImg.src = "/public/assets/trashcan.webp";
  deleteImg.classList.add("ui-delete-element");

  //delete button with icon
  deleteButton.appendChild(deleteImg);

  //draggable dots icon
  let dragImg = document.createElement("img");
  dragImg.classList.add("ui-draggable-dots");
  dragImg.src = "/public/assets/draggabledots.webp";

  //list element object to contain all
  let li = document.createElement("li");
  li.classList.add("item");
  li.draggable = true;
  li.appendChild(div);
  li.appendChild(deleteButton);
  li.appendChild(dragImg);
  return li;
}

function updateFormFields() {
  const sp = JSON.stringify(getAllSources());
  const bps = JSON.stringify(getAllBodyParagraphs());
  const pqs = JSON.stringify(getAllPullQuotes());
  const order = JSON.stringify(getOrder()); 

  document.getElementById("source-list").value = sp;
  document.getElementById("body-list").value = bps;
  document.getElementById("pull-list").value = pqs;
  document.getElementById("order").value = order;
}

//may want to abstract in the future when there are more dynamic text-based elements

function getAllBodyParagraphs() {
  const bodyElements = document.querySelectorAll(".body");
  const bodyParagraphs = [];
  for (let bp of bodyElements) {
    bodyParagraphs.push(bp.value);
  }
  return bodyParagraphs;
}

function getAllSources() {
  const sourcesElements = document.querySelectorAll(".source");
  const sourcesParagraphs = [];
  for (let sp of sourcesElements) {
    sourcesParagraphs.push(sp.value);
  }
  return sourcesParagraphs;
}

function getAllPullQuotes() {
  const pullElements = document.querySelectorAll(".pull");
  const pullQuotes = [];
  for (let pq of pullElements) {
    pullQuotes.push(pq.value);
  }
  return pullQuotes;
}

function getOrder() {
  const elements = document.querySelectorAll(".body, .pull");
  const order = [];
  for (let e of elements) {
    if (e.classList.contains("body")) {
      order.push("body");
    } else if (e.classList.contains("pull")) {
      order.push("pull");
    }
  }
  return order;
}