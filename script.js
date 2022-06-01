 //Баги которые нужно решить:


//Места в которых нужно что то менять для избавления от багов:


//Полезные ссылки
//https://www.delftstack.com/howto/javascript/open-local-text-file-using-javascript/

//интересные ссылки
//https://ru.reactjs.org/

//ссылки для другого проекта
//mvc и c#
//https://professorweb.ru/
//metonit

var json_square = `{
  "position": 0,
  "sq_view": "cornfield",
  "building": false,
  "unit": false
}`;

var json_player = `{
  "live" : true,
  "number_player" : 0,
  "col_zd" : 0,
  "color" : "red",
  "gold" : 0,
  "income" : 0
}`;

var json_build = `{
  "position" : 0,
  "id" : 0,
  "improve" : 1,
  "number_player" : 0,
  "hp" : 3,
  "income" : 1,
  "integrity" : true
}`;

var json_unit = `{
  "position" : 0,
  "id" : 0,
  "number_player" : 0,
  "type" : 0,
  "hp" : 2,
  "attack" : 2,
  "distance_atack": 1,
  "distance" : 2,
  "move" : false
}`;

var cost = {
  warior : 5,
  builder : 2,
  coof_improve : 2,
  build_building: 4
};

var p_square = 0;
var buildings = [];
var units = [];
var un_id = 0;
var zd_id = 0;
var col_player = 0;
var players = [];
var player_hod = 0;
var mesto_click_element;

let pos = 0;
function postanovka_zd(key,value)
{
  if(key == "position")
  {
    pos = value;
  }

  if(key == "building")
    if(value == true)
    {
      build_div_image(pos);
    }
  
  return value;
}


function postanovka_un(key,value)
{
  if(key == "position")
  {
    pos = value;
  }

  if(key == "unit")
    if(value == true)
    {
      unit_div_image(pos);
    }
  
  return value;
}


function postriuka_zd(n,player) {
  let flag = true;
  for (let i = 0; i < buildings.length; i++)
    if(buildings[i].position == n)
      flag = false;
  if(flag){
    
    p_square[n].building = true;
  
    p_square[n] = JSON.stringify(p_square[n], postanovka_zd);
    p_square[n] = JSON.parse(p_square[n]);

    buildings[buildings.length] = JSON.parse(json_build);
    buildings[buildings.length - 1].number_player = player;
    buildings[buildings.length - 1].income = 1;
    buildings[buildings.length - 1].position = n;
    buildings[buildings.length - 1].id = zd_id - 1;

    building_image_url(buildings.length - 1);
    
    players[player].income += buildings[buildings.length - 1].income;
    players[player].col_zd += 1;
  }
  else
    console.log("Ошибка постройки здания");
}


function building_image_url(build_id)
{
  if(buildings[build_id].number_player == 0)
    {
      document.getElementById(`zd_${buildings[build_id].id}`).style.backgroundImage = `url("Image/Buildings/house_0.png")`;
    }
    else if(buildings[build_id].number_player == 1)
    {
      document.getElementById(`zd_${buildings[build_id].id}`).style.backgroundImage = `url("Image/Buildings/house_1.png")`;
    }
}


function postriuka_un(n, player, type) {
  let flag = true;
  for (let i = 0; i < units.length; i++)
    if(units[i].position == n)
      flag = false;
  if(flag){
    p_square[n].unit = true;
  
    p_square[n] = JSON.stringify(p_square[n], postanovka_un);
    p_square[n] = JSON.parse(p_square[n]);
  
    units[units.length] = JSON.parse(json_unit);
    units[units.length - 1].number_player = player;
    units[units.length - 1].id = un_id - 1;
    units[units.length - 1].position = n;
    units[units.length - 1].type = type;
    
    unit_image_url(units.length - 1);
  }
  else
    console.log("Ошибка постройки юнита");
}


function unit_image_url(unit_id)
{

  if(units[unit_id].type == 0)
  {
      document.getElementById(`un_${units[unit_id].id}`).style.backgroundImage = `url("Image/Units/builder_${units[unit_id].number_player}.png")`;
  }
  
  
  if(units[unit_id].type == 1)
  {
      document.getElementById(`un_${units[unit_id].id}`).style.backgroundImage = `url("Image/Units/warior_${units[unit_id].number_player}.png")`;
  }
}


function build_div_image(position)
{
    let image = document.createElement("div");
    image.style.backgroundImage = `url("Image/Buildings/house.png")`;
    image.style.width="30px";
    image.style.height="28px";
    image.style.backgroundSize = "100% 100%";
    image.style.position = "absolute";
    image.id = `zd_${zd_id}`;
    zd_id++;
    document.getElementById(`sq_${position}`).appendChild(image);
}


function unit_div_image(position)
{
    let image = document.createElement("div");
    image.style.backgroundImage = `url("Image/Units/warior.png")`;
    image.style.marginTop = `3px`;
    image.style.marginLeft = `22px`;
    image.style.width="30px";
    image.style.height="25px";
    image.style.backgroundSize = "100% 100%";
    image.style.position = "absolute";
    image.id = `un_${un_id}`;
    un_id++;
    document.getElementById(`sq_${position}`).appendChild(image);
}


function sozd_b_hod()
{
  let button = document.createElement(`button`);
  button.innerHTML = "Res";
  button.style.className = `res_button`;
  button.id = `b_res`;
  button.onclick = novi_hod;

  document.body.appendChild(button);
}

function sozd_pop_up(pop_up)
{
  ud_pop_zd(pop_up, "popSozdUnit");
  ud_pop_zd(pop_up, "popSozdBuilder");
  ud_pop_zd(pop_up, "popZahvatBuild");
  ud_pop_zd(pop_up, "popImproveBuild");
  ud_pop_zd(pop_up, "popUnichtozhBuild");
  ud_pop_zd(pop_up, "popBuildBuilding");
  
  pop_up.className = "pop_up";
  pop_up.id = "popUp";
  document.body.appendChild(pop_up);
}

function sozd_pop_zd_unit(pop_up)
{
  let button = document.createElement(`button`);
  button.innerHTML = "Создать воина";
  button.onclick = buy_warior;
  button.id = "popSozdUnit";

  pop_up.appendChild(button);
}


function sozd_pop_zd_builder(pop_up)
{
  let button = document.createElement(`button`);
  button.innerHTML = "Создать строителя";
  button.onclick = buy_builder;
  button.id = "popSozdBuilder";

  pop_up.appendChild(button);
}


function sozd_pop_improve(pop_up) 
{
  let button = document.createElement(`button`);
  button.innerHTML = "Улучшить здание";
  button.onclick = improve;
  button.id = "popImproveBuild";

  pop_up.appendChild(button);
}


function sozd_pop_build_zd(pop_up)
{
  let button = document.createElement(`button`);
  button.innerHTML = "Построить здание";
  button.onclick = build_zd;
  button.id = "popBuildBuilding";

  pop_up.appendChild(button);
}


function sozd_pop_zahv_zd(pop_up)
{
  let button = document.createElement(`button`);
  button.innerHTML = "Захватить здание";
  button.onclick = zahv_zd;
  button.id = "popZahvatBuild";
  
  pop_up.appendChild(button);
}

function sozd_pop_unich_zd(pop_up)
{
  let button = document.createElement(`button`);
  button.innerHTML = "Уничтожить здание";
  button.onclick = unich_zd;
  button.id = "popUnichtozhBuild";

  pop_up.appendChild(button);
}


function ud_pop_zd(pop_up, pop_id) {
  if(pop_up)
    for (let i = 0; i < pop_up.childNodes.length; i++)
      if(pop_up.childNodes[i].id == `${pop_id}`)
        pop_up.removeChild(document.getElementById(`${pop_id}`));
}


function buy_warior()
{
  console.log("покупка");
  let coincidence = false;
  for (let i = 0; i < buildings.length; i++)
    if(buildings[i].position == mesto_click_element)
      for (let j = 0; j < units.length; j++) 
        if(units[j].position == mesto_click_element)
          coincidence = true;

  if(!coincidence)
  {
    if(players[player_hod].gold - cost.warior >= 0)
    {
      postriuka_un(mesto_click_element, player_hod, 1);
      
      players[player_hod].gold -= cost.warior;
      document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;
    }
    else
      player_info.innerText = "Не хватило денег";
  }
  else
    player_info.innerText = "Место занято другим юнитом";
}


function buy_builder()
{
  console.log("покупка");
  let coincidence = false;
  for (let i = 0; i < buildings.length; i++)
    if(buildings[i].position == mesto_click_element)
      for (let j = 0; j < units.length; j++) 
        if(units[j].position == mesto_click_element)
          coincidence = true;

  if(!coincidence)
  {
    if(players[player_hod].gold - cost.builder >= 0)
    {
      postriuka_un(mesto_click_element, player_hod, 0);
      
      players[player_hod].gold -= cost.builder;
      document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;
    }
    else
      player_info.innerText = "Не хватило денег";
  }
  else
    player_info.innerText = "Место занято другим юнитом";
}


function improve() 
{
  for (let i = 0; i < buildings.length; i++)
    if(buildings[i].position == mesto_click_element)
    {
      if(buildings[i].improve < 5)
      {
        if(players[player_hod].gold - cost.coof_improve * buildings[i].improve >= 0)
        {
          players[player_hod].gold -= cost.coof_improve * buildings[i].improve;
          document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;
          
          buildings[i].improve++;
          buildings[i].income++;
          players[player_hod].income++;
        }
        else
          player_info.innerText = `Вам не хватило ${-1 * (players[player_hod].gold - cost.coof_improve * buildings[i].improve)}`;
      }
      else
      {
        player_info.innerText = "Вы достигли предела улучшений этого здания";
      }
    }
}


function build_zd() 
{
  if(players[player_hod].gold - cost.build_building >= 0)
  {
    for (let i = 0; i < units.length; i++) 
    {
      if(units[i].position == mesto_click_element)
      {
        died_unit(units[i].id);
  
        postriuka_zd(mesto_click_element, player_hod);

        players[player_hod].gold -= cost.build_building;
        
        document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;
      }
    }
  }
  else
    player_info.innerText = `Вам не хватило ${(-1) * (players[player_hod].gold - cost.build_building) }`;
}


function zahv_zd()
{
  for (let i = 0; i < buildings.length; i++) 
  {
    if(buildings[i].position == mesto_click_element)
    {
      let zap_unit = null;
      for (let j = 0; j < units.length; j++)
        if(units[j].position == mesto_click_element)
        {
          zap_unit = units[j];
          break;
        }

      player_info.innerText = `Игрок ${zap_unit.number_player} захватил здание игрока ${buildings[i].number_player}`;
      
      players[buildings[i].number_player].income -= buildings[i].income;
      players[buildings[i].number_player].col_zd -= 1;
      players[zap_unit.number_player].income += buildings[i].income - 1;
      
      buildings[i].number_player = zap_unit.number_player;
      document.getElementById(`sq_${mesto_click_element}`).removeChild(document.getElementById(`zd_${buildings[i].id}`));

      build_div_image(mesto_click_element);
      buildings[i].id = zd_id - 1;
      building_image_url(i);
      break;
    }
  }
}


function unich_zd()
{
  for (let i = 0; i < buildings.length; i++) 
    if(buildings[i].position == mesto_click_element)
    {
      if(buildings[i].number_player != player_hod)
      players[player_hod].gold += buildings[i].income * 2;
      players[buildings[i].number_player].income -= buildings[i].income;
      players[buildings[i].number_player].col_zd--;

      document.getElementById(`sq_${buildings[i].position}`).removeChild(document.getElementById(`zd_${buildings[i].id}`));

      document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;

      buildings[i].position = -1;
      buildings[i].number_player = -1;
      buildings[i].id = -1;

      p_square[mesto_click_element].building = false;
    }
}


function sozd_pl(col_pl)
{
  for (let i = 0; i < col_pl; i++) {
    players[players.length] = JSON.parse(json_player);
    players[players.length - 1].number_player = players.length - 1; 
  }
}


function move_image_unit(clickElement, ind_1, ind_2)
{
    player_info.innerText = "Юнит переместился";
    p_square[ind_2].unit = true;
    p_square[click_unit.position].unit = false;

    document.getElementById(`${clickElement}`).appendChild
      (document.getElementById(`un_${click_unit.id}`));
    
    click_unit.position = p_square[ind_2].position;

    click_unit.move = false;
}


function proverka_move(mesto_1, mesto_2)
{
  flag = false;
  
  if(mesto_1 > mesto_2)
        if(mesto_1 - mesto_2 == 1 || 
mesto_1 - mesto_2 == 11 || mesto_1 - mesto_2 == 11 + 1 || mesto_1 - mesto_2 == 11 + 2)
          flag = true;
      
  if(mesto_1 < mesto_2)
    if(mesto_2 - mesto_1 == 1 || 
mesto_2 - mesto_1 == 11 || mesto_2 - mesto_1 == 11 + 1 || mesto_2 - mesto_1 == 11 + 2)
    flag = true;
}


function proverka_move_image_unit(clickElement_id, ind_1, ind_2)
{
    if(click_unit.distance >= 1)
    {
      proverka_move(click_unit.position, p_square[ind_1].position);
      if(flag)
        move_image_unit(`${clickElement_id}`, ind_1, ind_2);
      
      click_unit = null;
    }
}


function died_unit(id)
{
  let flag = false;
  for (let i = 0; i < units.length; i++) {
    if(units[i].id == id)
    {
      document.getElementById(`sq_${units[i].position}`).removeChild(document.getElementById(`un_${id}`));

      units[i].position = -1;
      units[i].number_player = -1;
      units[i].id = -1;
      
      flag = true;
    }
  }
  if (!flag)
    console.log("Умирающий юнит не был найден");
}


function ud_pop_up_window() 
{
  for (let i = 0; i < document.body.childNodes.length; i++) 
    {
      if(document.body.childNodes[i] == pop_up)
      {
        mesto_click_element = null;
        document.body.removeChild(pop_up);
        two_click = false;
      }
    }
}


let click_unit;
let pop_up;
let one_click;
let two_click = false;
let flag = true;
document.onmousedown = find_point_down;
function find_point_down(event)
{
  flag = true;
  let catch_click = false;
	let clickElement = document.elementFromPoint(event.clientX,event.clientY);
	for(let i = 0; i < p_square.length;i++)
    if(clickElement.id == `sq_${p_square[i].position}`)
			{
				player_info.innerText = "Вы попали в ячейку \n";

        mesto_click_element = i;

        if(!two_click)
          pop_up = document.createElement("div");
        sozd_pop_up(pop_up);

        one_click = "sq";
        
        two_click = true;
        
        catch_click = true;

        if(click_unit)
          {
            if(click_unit.move)
            {
              player_info.innerText += click_unit.position;

              flag = true

              if(!p_square[i].unit)
              {
                proverka_move_image_unit(`${clickElement.id}`, i, p_square[i].position);
                ud_pop_up_window();
              }
              else
              {
                player_info.innerText += " Там уже кто то есть \n";
                ud_pop_up_window();
              }
            }
          }
			}
  
  for(let i = 0; i < zd_id;i++)
    if(clickElement.id == `zd_${i}`)
			{
				player_info.innerText = `Вы попали в здание ${buildings[i].number_player} \n`;

        let zap_build = null;
        
        for (let j = 0; j < buildings.length; j++)
          if(buildings[j].id == i)
            zap_build = buildings[j];
        
        if(zap_build.number_player == player_hod)
        {
        
          mesto_click_element = zap_build.position;
          
          if(!two_click)
            pop_up = document.createElement("div");
          sozd_pop_up(pop_up);
          sozd_pop_zd_builder(pop_up);
          
          sozd_pop_zd_unit(pop_up);
          sozd_pop_improve(pop_up);
  
          one_click = "zd";
          
          two_click = true;
          
          catch_click = true;
        }
        else
          player_info.innerText += "Это не ваше здание \n";
      }
  
  for(let i = 0; i < un_id;i++)
    if(clickElement.id == `un_${i}`)
			{
        
				player_info.innerText = `Вы попали в юнита ${units[i].number_player}\n`;
        player_info.innerText += `Бодрость юнита - ${units[i].move}`;

        if(units[i].number_player == player_hod)
        {
        
          mesto_click_element = units[i].position;
          
          if(!two_click)
            pop_up = document.createElement("div");
          sozd_pop_up(pop_up);

          if(units[i].move)
            for (let j = 0; j < buildings.length; j++) 
            {
              if(buildings[j].position == units[i].position)
              {
                if(buildings[j].number_player != units[i].number_player)
                {
                  sozd_pop_zahv_zd(pop_up);
                  sozd_pop_unich_zd(pop_up);
                }
                flag = false;
                break;
              }
            }
          
          if(units[i].type == 0 && flag && units[i].move)
          {
            if(p_square[units[i].position].building == false)
              sozd_pop_build_zd(pop_up);
          }

          flag = true;
          
  
          one_click = "un";
  
          two_click = true;
          catch_click = true;

          click_unit = units[i];
        }
        else
        {

          if(click_unit)
          {
                if(units[i].number_player == player_hod && i != i)
                {
                  flag = false;
                  player_info.innerText = "Это место занято другим вашим юнитом";
                  break;
                }
                  
                else if(units[i].number_player != player_hod)
                {
                  proverka_move(click_unit.position, units[i].position);
                  if(click_unit.type == 1 && flag && click_unit.move)
                  {
                    units[i].hp -= click_unit.attack;
                    if(units[i].hp <= 0)
                    {
                      player_info.innerText = `Юнит игрока ${player_hod} убил ${units[i].number_player}`;

                      let zap_mesto_smerti = units[i].position;

                      died_unit(units[i].id);

                      if(click_unit.type = 1)
                      {
                        move_image_unit(`sq_${zap_mesto_smerti}`, i, zap_mesto_smerti);
                      }
                      
                      break;
                    }
                    else
                    {
                      player_info.innerText = `Юнит игрока ${player_hod} атаковал ${units[i].number_player}`;
                      flag = false;
                      break;
                    }
                  }
                }
          }

          else
            player_info.innerText = "Это не ваш юнит";
        }
			}
  
  if(clickElement.id == "popUp" || clickElement.id == "popSozdUnit" || clickElement.id == "popZahvatBuild" || clickElement.id == "popImproveBuild" || clickElement.id == "popUnichtozhBuild" || clickElement.id == "popSozdBuilder" || clickElement.id == "popBuildBuilding")
    catch_click = true;
  
  if(!catch_click)
  {
    ud_pop_up_window();
  } 
}


function sozd_d_g()
{
  let money = document.createElement(`div`);
  money.style.height = "20px";
  money.style.width = "50px";
  money.style.border = "solid #fff 0.1px";
  money.style.marginTop = "5px";
  money.style.marginLeft = "10px";
  money.id = "moneti";

  let mon_im = document.createElement(`div`);
  mon_im.style.width = "23px";
  mon_im.style.height = "20px";
  mon_im.style.backgroundSize = "100% 100%";
  mon_im.style.background = `url("Image/Others/money.png")`;
  mon_im.style.cssFloat = "left";
  
  let mon_text = document.createElement(`div`);
  mon_text.innerHTML = "0";
  mon_text.id = `player_gold`;
  mon_text.style.marginTop = "2px";
  mon_text.style.marginLeft = "26px";

  document.body.appendChild(money);
  money.appendChild(mon_im);
  money.appendChild(mon_text);
}

function sozd_d_h()
{
  let hod = document.createElement(`div`);
  hod.style.height = "20px";
  hod.style.width = "20px";
  hod.style.marginTop = "5px";
  hod.style.marginLeft = "10px";
  hod.innerHTML = "0";
  hod.id = `player_hod`;

  document.body.appendChild(hod);
}


function sozd_d_otobr_info()
{
  let info = document.createElement(`div`);
  info.className = "information_framework";
  info.innerHTML = "";
  info.id = `player_info`;

  document.body.appendChild(info);
}


function novi_hod() 
{
  for (let i = 0; i < players.length; i++) 
    if(players[i].col_zd <= 0)
      players[i].live = false;

  let zhiv = 0;
  
  for (let i = 0; i < players.length; i++)
    if(players[i].live == true)
      zhiv++;

  if(zhiv <= 1)
  { 
    document.body.removeChild(pole);
    document.body.removeChild(document.getElementById(`moneti`));
    document.body.removeChild(document.getElementById(`player_hod`));
    document.body.removeChild(document.getElementById(`b_res`));
    
    for (let i = 0; i < players.length; i++)
      if(players[i].live == true)
        zhiv = i;

    let win_window = document.createElement(`div`);
    win_window.style.marginLeft = `200px`;
    win_window.style.marginTop = `200px`;
    win_window.innerHTML = `Победил игрок команды номер ${zhiv}`;
    document.body.appendChild(win_window);
  }
    
  else
  { 
    if(player_hod < players.length - 1)
    {
      player_hod++;
      document.getElementById(`player_hod`).innerHTML = `${player_hod}`;
    }
    else
    {
      player_hod = 0;
      document.getElementById(`player_hod`).innerHTML = `${player_hod}`;
    }
  
    players[player_hod].gold += players[player_hod].income;
    document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;

    player_info.innerText = `Сейчас ход игрока №${player_hod + 1}\n`;
    player_info.innerText += `Инком игрока состовляет ${players[player_hod].income} монеты\n`;
  }
  
  for (let i = 0; i < units.length; i++) {
    units[i].move = true;
  }
}

function sozd_vsego() 
{
    for(let i = 0; i < 12; i++)
  {
    let square;
    for(let j = 0; j < 12; j++)
    {
      square = document.createElement("div");
      square.className = "square";
      if(j == 11)
        square.style.cssFloat = "bottom";
      square.id = `sq_${p_square}`;
      p_square++;
      pole.appendChild(square);
    }
  }
  
  p_square = [];
  
  for(let i = 0; i < 144; i++)
  {
    p_square[i] = JSON.parse(json_square);
    p_square[i].position = i;
  }
  
  sozd_b_hod();
  
  sozd_pl(2);
  sozd_d_g();
  sozd_d_h();
  sozd_d_otobr_info();
  postriuka_zd(13,0);
  postriuka_zd(130,1);
  
  players[player_hod].gold += players[player_hod].income;
      document.getElementById(`player_gold`).innerHTML = `${players[player_hod].gold}`;
  
      player_info.innerText = `Сейчас ход игрока №${player_hod + 1}\n`;
      player_info.innerText += `Инком игрока состовляет ${players[player_hod].income} монеты\n`;
}


function izm_color_window(first_window, n) {
  n++;
  if(n == 10)
    n = 'a';
  if(n == 11)
    n = 'b';
  if(n == 12)
    n = 'c';
  if(n == 13)
    n = 'd';
  if(n == 14)
    n = 'e';
  if(n == 15)
    n = 'f';
  
  first_window.style.background = `#${n}${n}${n}`;

  if(n == 'a')
    n = 10;
  if(n == 'b')
    n = 11;
  if(n == 'b')
    n = 13;
  if(n == 'd')
    n = 13;
  if(n == 'd')
    n = 14;
  if(n == 'f')
    n = 15;
}


let first_window = document.createElement(`div`);
first_window.className = "first_window";
document.body.appendChild(first_window);

let first_window_text = document.createElement(`div`);
first_window_text.style.marginTop = "100px";
first_window_text.style.marginLeft = "50px";
first_window_text.style.color = "#1f5";
first_window_text.innerHTML = `Что бы играть нужно нажимать мышкой на обьекты.<br>
Что бы купить воина нужно накопить ${cost.warior} монет.<br>
Что бы купить строителя нужно накопить ${cost.builder} монет.<br>
Что бы построить здание нужно накопить ${cost.build_building} монет.<br>
Что бы прокачать инком нужно накопить ${2} монеты и улучшить здание.<br>
Если вы достигните предела возможностей своего здание то вы можете построить новое.<br>
Каждый раз инком дорожает в ${cost.coof_improve} раза.<br>
Вы можете разрушить здание, а можете захватить.<br>
Прочтя это можете нажать на кнопку`;
first_window.appendChild(first_window_text);


let button = document.createElement(`button`);
button.style.marginTop = "40px";
button.style.marginLeft = "150px";
button.style.border = "solid 1px";
button.style.background = "#92c";
button.innerHTML = "Нажми меня";
button.id = `b_ud`;
button.onclick = function ()
{ 
  document.body.removeChild(first_window);

  sozd_vsego();
};

first_window.appendChild(button);

