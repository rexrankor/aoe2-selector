
var civs = {}
civs['vanilla'] = ['Britons', 'Byzantines', 'Celts', 'Chinese', 'Franks',
                   'Goths', 'Japanese', 'Mongols', 'Persians', 'Saracens',
                   'Teutons', 'Turks', 'Vikings'];
civs['conquerors'] = ['Aztecs', 'Huns', 'Koreans', 'Mayans', 'Spanish'];
civs['forgotten'] = ['Incas', 'Indians', 'Italians', 'Magyars', 'Slavs'];
civs['kingdoms'] = ['Berbers', 'Ethiopians', 'Malians', 'Portuguese'];
civs['rajas'] = ['Burmese', 'Khmer', 'Malay', 'Vietnamese'];

function setup(){
  // prepare list of all civilizations
  let all_civs = []
  for(let type of Object.keys(civs))
    for(let civ of civs[type])
      all_civs.push([civ, type]);
  all_civs.sort();
  // construct civ toggling table
  let i=0, table=document.getElementById("civ_table"),row=-1;
  for(let p of all_civs){
    if(i==0)
      row = table.insertRow(-1);
    let cell = row.insertCell(-1);
    cell.innerHTML = "<input type='checkbox' name='"+p[1]+"' id='"+p[0]+"' checked>"+p[0];
    i = (i+1)%4;
  }
}

function toggle(source, name){
  var checkboxes = document.getElementsByName(name);
  for(let checkbox of checkboxes){
    checkbox.checked = source.checked
  }
}

// normal version
function choose(){
  // get list of all checked civilizations
  var cands = [];
  for(let name of Object.keys(civs))
    for(let checkbox of document.getElementsByName(name))
      if(checkbox.checked)
        cands.push(checkbox.id);
  // randomly select civ
  var civ = cands[Math.floor(Math.random()*cands.length)];
  document.getElementById('output').value = civ;
}


// run setup on page load
if(window.attachEvent){
  window.attachEvent('onload', setup);
}else{
  if(window.onload){
    var curronload = window.onload;
    var newonload = function(evt){
      curronload(evt);
      setup(evt);
    };
    window.onload = newonload;
  }else
    window.onload = setup;
}
