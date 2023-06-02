const Add = () => {
  // btn selectors
  let add_map = document.querySelector(".add-map-btn");
  let add_topic = document.querySelector(".add-topic-btn");
  let select_map = document.querySelector(".select-map > div");
  let select_btn = document.querySelector(".select-map > button");
  const topic_list = document.querySelector(".list-topic");

  let get_key = "";
  //  iterate map
  const iterate_select_map_func = () => {
    select_map.querySelectorAll("button").forEach((element) => {
      element.addEventListener("click", () => {
        select_btn.innerText = element.innerText;
        get_key = element.dataset.key;
        get_topic_func();
      });
    });
  };

  // update topic send
  const update_topic_send_func = (topic_name, topic_key) => {
    $.ajax({
      url:"http://127.0.0.1:5000/update-topic",
      type:"GET",
      data:{topic_name:topic_name, topic_key:topic_key},
      success:(resp) =>{
        console.log(resp)
      },
      error:(error) =>{
        console.log(error);
      }
    })
  }

  // update topic
const update_topic_func = () =>{
  let updates = document.querySelectorAll(".update-topic");
  updates.forEach(element => {
    element.addEventListener("click", () => {
      let input_topic_update = document.querySelector(".input-topic")
      input_topic_update.value = element.parentElement.querySelector('span').innerText;
      input_topic_update.dataset.key = element.dataset.key;
    })
  })
}


// delete topic send
const delete_topic_send_func = (topic_key) =>{
  $.ajax({
    url:"http://127.0.0.1:5000/delete-topic",
    type:"GET",
    data:{topic_key:topic_key},
    success:(resp) =>{
      console.log(resp)
    },
    error:(error) =>{
      console.log(error);
    }
  })
}

// delete topic
const delete_topic_func = () =>{
  let deletes = document.querySelectorAll(".delete-topic");
  deletes.forEach(element => {
    element.addEventListener("click",() => {
      if(confirm("Are sure to delete this topic ?")){
        delete_topic_send_func(element.dataset.key);
      }
    })
  })
}

  // function get map
  const get_map_func = () => {
    fetch("http://127.0.0.1:5000/get-map")
      .then((res) => res.json())
      .then((data) => {
        for (let x in data) {
          const id = data[x].id;
          const map_name = data[x].map_name;
          const key = data[x].key;
          const time = data[x].time;
          const element = document.createElement("button");
          element.innerText = map_name;
          element.setAttribute("class", "w3-bar-item w3-button");
          element.dataset.key = key;
          select_map.prepend(element);
        }
        iterate_select_map_func();
      });
  };
  get_map_func();

  // function add map
  const add_map_func = (map_name) => {
    $.ajax({
      url: "http://127.0.0.1:5000/add-map",
      type: "POST",
      data: { map: map_name.toString() },
      success: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  // function get topic
  const get_topic_func = () => {
    $.ajax({
      url: "http://127.0.0.1:5000/get-topic",
      type: "POST",
      data: { map_key: get_key },
      success: (response) => {
        topic_list.innerHTML = null;
        if (response != undefined) {
          for (let x in response) {
            const key = response[x].key;
            const topic_name = response[x].topic_name;
            let li = document.createElement("li");
            li.setAttribute("class",'mb-2 w3-border w3-white shadow-sm')
            li.innerHTML = `
            <span>${topic_name}</span>
            <b class="w3-text-teal rounded-0 update-topic" data-key='${key}'>Update</b>
            <b class="w3-text-red rounded-0 delete-topic" data-key='${key}'>Trash</b>
            `;
            topic_list.appendChild(li)
          };
          update_topic_func();
          delete_topic_func();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  // function add topic
  const add_topic_func = (topic_name, key) => {
    $.ajax({
      url: "http://127.0.0.1:5000/add-topic",
      type: "POST",
      data: { topic_name: topic_name, key: key},
      success: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  // add map event
  add_map.addEventListener("click", () => {
    let input_map = document.querySelector(".input-map").value;
    add_map_func(input_map);
  });

  // add topic event
  add_topic.addEventListener("click", () => {
    let input_topic = document.querySelector(".input-topic");
    if (get_key != null && confirm("Are you sure to add topic ?") && input_topic.value != null) {
      if (input_topic.dataset){
        update_topic_send_func(input_topic.value, input_topic.dataset.key);
      }else{
        add_topic_func(input_topic, get_key);
      }
    };
  });
};

$(document).ready(() => {
  Add();
});
