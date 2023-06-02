// selectors
const list = document.querySelector("div > ul.ul");
const search_btn = document.querySelector(".search-btn");
const topic_undo = document.querySelector(".topic-undo");
let topic_undo_boolen = true;
topic_undo.parentElement.parentElement.parentElement.classList.add("hide");

// get map function
const get_map_func = () => {
  fetch("http://127.0.0.1:5000/get-map")
    .then((res) => res.json())
    .then((data) => {
      list.innerHTML = null;
      for (let x in data) {
        const id = data[x].id;
        const map_name = data[x].map_name;
        const key = data[x].key;
        const time = data[x].time;
        const element = document.createElement("li");
        element.setAttribute(
          "class",
          "item w3-white shadow mb-2 d-lg-flex justify-content-between w-100"
        );
        element.innerHTML = `<div class='d-flex w-100 justify-content-between'>
        <strong>${map_name}</strong
        >
        <ion-icon data-key='${key}' class="toggler-down" name="chevron-down-outline"></ion-icon>
        
      </div>`;
        list.appendChild(element);
      }
      toggler_topic_func();
    });
};
get_map_func();

// get map by searching function
const get_map_search_func = (search_input) => {
  $.ajax({
    url: `http://127.0.0.1:5000/get-map/${search_input}`,
    type: "GET",
    success: (data) => {
      list.innerHTML = null;
      for (let x in data) {
        const id = data[x].id;
        const map_name = data[x].map_name;
        const key = data[x].key;
        const time = data[x].time;
        const element = document.createElement("li");
        element.setAttribute(
          "class",
          "item w3-white shadow mb-2 d-lg-flex justify-content-between w-100"
        );
        element.innerHTML = `<div class='d-flex w-100 justify-content-between'>
        <strong>${map_name}</strong
        >
        <ion-icon data-key='${key}' class="toggler-down" name="chevron-down-outline"></ion-icon>
        
      </div>`;
        list.appendChild(element);
      }
      toggler_topic_func();
    },
    error: (error) => {
      console.log(error);
    },
  });
};

// topic undo
topic_undo.addEventListener("click", () => {
  topic_undo_boolen = false;
  topic_undo.parentElement.parentElement.parentElement.classList.add("hide");
});

// topic complate send 
const complate_topic_send = (complate_key) => {
  console.log(complate_key)
  $.ajax({
    url:"http://127.0.0.1:5000/complate-topic/",
    type:"GET",
    data:{'topic-key':complate_key},
    success:(response) => {
      console.log(response);
    },
    error:(error) => {
      console.log(error);
    }
  })
}

// topic complate function
const topic_complate_func = () => {
  const complate = document.querySelectorAll("ul li .complate-input");
  let boolean = true;
  complate.forEach((element) => {
    element.addEventListener("input", () => {
      topic_undo.parentElement.parentElement.parentElement.classList.remove(
        "hide"
      );
      if (element.checked && boolean) {
        boolean = false;
        setTimeout(() => {
          if (topic_undo_boolen) {
            topic_undo.parentElement.parentElement.parentElement.classList.add(
              "hide"
            );
            element.parentElement.querySelector('span').classList.add('w3-text-teal');
            console.log(element.parentElement.removeChild(element))
            topic_undo_boolen = true;
            complate_topic_send(element.dataset.key);
          }
          boolean = true;
        }, 6000);
      }else{
        topic_undo.parentElement.parentElement.parentElement.classList.add(
          "hide"
        );
        element.checked = false;
      }
    });
  });
};

// get topic function
const get_topic_func = (map_key, parentelement) => {
  $.ajax({
    url: "http://127.0.0.1:5000/get-topic",
    type: "POST",
    data: { map_key: map_key },
    success: (response) => {
      console.log();
      if (response != undefined) {
        let ul = document.createElement("ul");
        for (let x in response) {
          const id = response[x].id;
          const key = response[x].key;
          const topic = response[x].topic_name;
          const time = response[x].time;
          const complate = response[x].complate;
          const element = document.createElement("li");
          if (complate) {
            element.innerHTML = `<span class='w3-text-teal'>${topic}</span>`;
          } else {
            element.innerHTML = `<span>${topic}</span>
            <input type="checkbox" data-key='${key}' class="form-check-input complate-input" />`;
          }
          element.setAttribute("class", "items");
          ul.appendChild(element);
        }
        parentelement.appendChild(ul);
        topic_complate_func();
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
};

// toggler  list topic
const toggler_topic_func = () => {
  const toogler_btn = document.querySelectorAll(".item div .toggler-down");
  toogler_btn.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.parentElement.parentElement.querySelector("ul")) {
        element.parentElement.parentElement
          .querySelector("ul")
          .classList.toggle("hide");
        if (element.name == "chevron-down-outline") {
          element.name = "chevron-up-outline";
        } else {
          element.name = "chevron-down-outline";
        }
      } else {
        get_topic_func(
          element.dataset.key,
          element.parentElement.parentElement
        );
      }
    });
  });
};

// search map
search_btn.addEventListener("click", () => {
  const search_input = document.querySelector(".search-input").value;
  if (search_input != null) {
    get_map_search_func(search_input);
  }
});

//  key press search
let boolean = true;
let input_value = "";

// timeout method
const key_search_func = () => {
  setTimeout(() => {
    input_value = document.querySelector(".search-input").value;
    if (input_value != null) {
      get_map_search_func(input_value);
    }
    boolean = true;
  }, 500);
};

// search on input
document.querySelector(".search-input").addEventListener("input", () => {
  if (boolean) {
    key_search_func();
    boolean = false;
  }
});

