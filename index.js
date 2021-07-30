var game = new Vue({
  el: '#game',
  data: {
    fields :
    {
      your: [
      ],
      enemy: [
      ]
    },
    test: [],
    ships: [],
    size: 0,
    direction: "h",
    id: -1,
    ship: ''
  },
  computed :{
    // createFields: function() {
    //   for(let i = 0; i < 10; i++){
    //     for(let j =0; j < 10; j++){
    //       this.fields.your[i][j] = i+j
    //       this.fields.enemy[i][j] = i + ':' + j
    //     }
    //   }
    // }
  },
  
  methods: {
    clearFields: function(ship){
      for(let i = 0; i < 100; i++)
      {
        if(this.fields.your[i].idShip == ship)
        {
          this.fields.your[i].idShip = null;
          this.fields.your[i].empty = true;
        }
      }
    },
    checkFields: function(position, direction){  // проверка игровых полей на наличе других кораблей
      let n = position;               // при h слева-направа, при v сверху-вниз
      
      for(let i = 0; i < this.size-1; i++){
        
        if(direction != "h")
        {
          n+=1;
        } else {
          n+=10;
        }
        console.log("Position: " + n)
        if((this.fields.your[n].idShip != null) || (n < 0) || (this.fields.your[n].belong != false))
        {
          return false;
        }
      }
      // this.direction = this.direction!="h" ? this.direction="h" : this.direction="v"
      console.log("direction: "+direction)
      return true;
    },
    rotateShip: function(event){
      if(event.target.parentElement.className.includes("cell")){
        this.ship = event.target.getAttribute("id");
        this.id = parseInt(event.target.parentElement.getAttribute("data-id"));
        console.log("Parent id: " + this.id)
        if(!(this.checkFields(this.id, event.target.getAttribute("data-direction")))){
          console.log("Occupied")
          return 0;
        } else {
          console.log("Free")
          this.clearFields(this.ship)
        }
        let id = event.target.getAttribute('style').replace(/\s+/g, '');;
        let x = id.slice(id.indexOf(':', id.indexOf('height'))+1, id.indexOf('px'))
        console.log(x)
        let y = id.slice(id.indexOf(':', id.indexOf('width'))+1, id.indexOf('px', id.indexOf('width:')))
        console.log(y)
        event.target.setAttribute("style", `height: ${y}px; width:${x}px;`)
        if(event.target.getAttribute("data-direction") == "v")
        {
          event.target.setAttribute("data-direction", "h")
        } else {
          event.target.setAttribute("data-direction", "v")
        }
        console.log('height: '+y+'px; width: '+x);
      } else {
        console.log("denied");
        return 0;
      }
      
      
      // console.log(`height: ${y}px; width:${x}px;`);
      
      // return `height: ${y}px; width: ${x}px;`
      // console.log(size)
    },

    // drag_handler: function(ev) {
    //   // console.log(ev.target.id)
    //   console.log("Drag");
    // },

    createField: function(array, size){
      let n = 0
      for(let i = 0; i < size; i++){
        for(let j =0; j < size; j++){
          array[++n] = i + ':' + j
        }
      }
    },
    drag_handler: function(ev) {
      // console.log(ev.target.id)
      console.log("Drag");
      console.log("Event: " + ev.target.parentElement.id)
    },
    
    dragstart_handler: function(ev) {
      // Add the target element's id to the data transfer object
      console.log(ev.target.id);
      ev.dataTransfer.setData("text/plain", ev.target.id);
          
      console.log(ev.target.getAttribute("data-size"));
      this.direction = ev.target.getAttribute("data-direction");
      this.size = ev.target.getAttribute("data-size");
      this.ship = ev.target.getAttribute("id");
      
      console.log("Id = " + ev.target.getAttribute("id").charAt(1))
      // 
      ev.dataTransfer.effectAllowed = "move";
      // size = ev.target.
      ev.target.style.visibility = "hidden";
      // ev.target.style.opacity = 0.5;
      // if(ev.target.parentElement.className=="cell")
      // {
      //     console.log(ev.target.parentElement.children = "")
      // }
      
      // console.log(ev.target.id)
    },

    dragover_handler: function(ev) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
    },

    dragenter_handler: function(ev){
      // ev.preventDefault();
      this.id = parseInt(ev.target.getAttribute("data-id"));
      console.log(this.id);
      if(ev.target.className == "cell")
      {
        ev.target.style.background = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(192,254,227,1) 64%, rgba(244,3,3,1) 100%)";  
      }
      
      // console.log(ev.target.id)
    },

    dragleave_handler: function (ev) {
      if(ev.target.className == "cell")
      {
        ev.target.style.background = ''
      }
      // console.log("Event: " + ev.target.id)
    },

    drop_handler: function(ev) {
        ev.preventDefault();
        //  if(ev.target.className(ev.target.className.data)
        // Get the id of the target and add the moved element to the target's DOM
        //  console.log(document.getElementById(ev.target.id).innerText);
        //  console.log(ev.target.id)
        // if(ev.target.id == ){

        // }
        // this.id = 0;
      this.clearFields(this.ship);
      let p = this.id;
      this.checkFields(p, this.direction)
        if(this.fields.your[p].empty != true)
        {
          ev.target.style.background = ''
          console.log("None")
          return 0;
        }
        // console.log(`p=${p}`)
        for(let i = 0; i < this.size; i++)
        {
            
          this.fields.your[p].idShip = this.ship;
          this.fields.your[p].empty = false;
          console.log(this.fields.your[p].coordinate)
          console.log(`p=${p}`)
          if(this.direction === "h")
          {
            p = p + 1;
          } else {
            p = p + 10;
          }
            
        }
        console.log(this.fields.your)
        ev.target.style.background = "";
        const data = ev.dataTransfer.getData("text/plain");
        //  console.log(ev)
        ev.target.appendChild(document.getElementById(data));
        console.log(ev.target.className)
    
    },

    dragend_handler: function(ev) {
        console.log(ev.target.id)
        // ev.target.style.opacity = 1;
        ev.target.style.visibility = "visible";
    },
  },

  computed: {
    // fillFields: function() {
    //   this.fields.your[1] = {
    //     idShip: 0,
    //     empty: true,
    //     belong: false,
    //     coordinate: '0:0'
    //   }
    //   console.log(this.fields.your[1])
    // }
    
    
  },

  created: function() {
    // this.fields.your[1] = {
    //   idShip: 0,
    //   empty: true,
    //   belong: false,
    //   coordinate: '0:0'
    // }

    let n = 0
      for(let i = 1; i <= 10; i++){
        for(let j =1; j <= 10; j++){
          this.fields.your.push({
            id: n++,
            idShip: null,
            empty: true,
            belong: false,
            coordinate: `${i}:${j}`
          })

          this.fields.enemy.push({
            idShip: null,
            empty: true,
            belong: false,
            coordinate: `${i}:${j}`
          })
        }
      }
    console.log(this.fields.your)
    console.log(this.fields.enemy)

      ///test
    for(let fis = 0; fis < 10; fis++){
      this.test.push([]);
      
      for(let sif = 0; sif < 10; sif++){
          this.test[fis].push({
            idShip: null,
            empty: true,
            belong: false,
            coordinate: `${fis+1}:${sif+1}`
          })
      }
    }
    for(let i = 0; i < 10; i++){
      let size = 0;
      switch (i) {
        case 0:
          size = 4;
          break;
        case 1:
        case 2:
          size = 3;
          break;
        case 3:
        case 4:
        case 5:
          size = 2;
          break;
        default:
          size = 1;
          break;
      }
      this.ships.push({
        size: size,
        health: size,
        direction: "h",
        startLoc: "-1:-1"
      })
      console.log(this.ships[i].size)
    }

    
    console.log(this.ships[4].startLoc.slice(0, this.ships[4].startLoc.indexOf(':'))); //y
    console.log(this.ships[4].startLoc.slice(this.ships[4].startLoc.indexOf(':') + 1, this.ships[4].startLoc.length)); //x
    
    console.log(this.test)
    console.log(typeof (this.test[9][9]))
    // if (typeof this.test[10][10] != 'object') {
    //   console.log("None")
    // }
  }

  
})


// {
//   idShip: 0,
//   empty: true,
//   belong: false,
//   coordinate: '0:0'

// }


// {
//   pointType : 0
// }