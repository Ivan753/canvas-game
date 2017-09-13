
/*BEGIN*/
width_win = example.width;
height_win = example.height;
//Определяем отступы для поля
x_o = width_win/2 - block_s*length_map/2;
y_o = height_win/2 - block_s*length_map/2;


access_step = false;

speed1 = block_s/10;


//Игрок
player = {
id: 1,
name: 'neo',
type: 'person',
speed: speed1,
health: 100,
state: 'live',
way: 'right',
action: 'nothing',
id_action: 0
}



//Лошадки
horses = [];

//Враги
enemies = [];


//Текстуры игрока----------------------------!Important
/*
image_player = [];

way = '';
action = '';
id_action = 0;

for(i=0; i<4; i++){
	
	switch(i){
	case 0: way = 'left';
	case 1: way = 'right';
	case 2: way = 'top';
	case 3: way = 'bottom';
	}
	
	for(j=0; j<2; j++){
		
		switch(j){
		case 0: action = 'run';
		case 1: action = 'walking';
		}
		
		//for(k=0; k<8; k++){
		
		image_player[i][j] = new Image();
		image_player[i][j].src = 'textures/player/white_mage/'+way+'/'+action+'/'+id_action+'.png';
		//textures/player/white_mage/'+player.way+'/nothing1.png';
		
		//}
	
	}

}
//------------------------------------------
*/


//Загрузка картинок для мини-карты
mini_player_png = new Image;
mini_player_png.src = 'textures/circle.png';

mini_map_k = new Image;
mini_map_k.src = 'textures/drees_mini_map1.png';

h = new Image;
h.src = 'textures/horse_mini_map1.png';



//Земля и деревья для большой карты
var ground = new Image();
var trees = new Image();
ground.src = 'textures/ground.jpg';
trees.src = 'textures/drees.png';





//Создание объектов

function create_obj(){

id_trees = 0;
id_horse = 0;
id_enemy = 0;

for (i=0; i<length_map; i++){
	for (j=0; j<length_map; j++){

	if(map[j][i]=='t'){
	
	id_trees++;
	obj_trees = {
	id: id_trees,
	state: 'live',
	i: i,
	j: j
	}
	
	}
	
	if(map[j][i]=='h'){
	
	wway = '';
	
	ch1 = Math.round(Math.random()*3+0);
	//ch2 = Math.rand(0, 3);
	
	switch(ch1){
	case 0: wway = 'right'; break;
	case 1: wway = 'left'; break;
	case 2: wway = 'top'; break;
	case 3: wway = 'bottom'; break;
	default: break;
	}
	
	ch2 =  Math.round(Math.random()*11+0);
	
	ch3 =  Math.round(Math.random()*2+0);
	switch(ch3){
	case 0: aaction = 'eating'; break;
	case 1: aaction = 'headshaking'; break;
	case 2: aaction = 'nothing'; break;
	default: break;
	}
	
	id_horse++;
	
	horses[id_horse] = {
	id: id_horse,
	name: 'Horse',
	state: 'live',
	way: wway,
	repeat_way: wway,
	repeat_way_id:1,
	action: aaction,
	id_action: ch2,
	kidd: 0,
	delay: 12,
	x: i,
	y: j
	}
	}
	
	
	if(map[j][i]=='O'){
	
	id_enemy++;
	
	enemies[id_enemy] = {
	id: id_enemy,
	name: 'Ogr',
	state: 'live',
	way: 'top',
	action: 'nothing',
	id_action: 0,
	kidd: 0,
	delay: 5,
	x: i,
	y: j
	}
	}
	
}
}
}






//Отрисовка мини-карты
function drow_mini_player(){

//координаты mini player'a
xp = Math.round(135 - x0/5);
yp = Math.round(70 - y0/10);

xz = xp;
yz = yp;

//---------------------------------------------------- отрисовка мини-карты

map_ctx.fillStyle = '#142';
map_ctx.strokeStyle = '#142';
map_ctx.fillRect(0, 0, 300, 150);

//отрисовываем mini карту
for (q = 0; q<15; q++){
	for (w = 0; w<15; w++){
		if(map[w][q] == 't'){
		map_ctx.drawImage(mini_map_k, q*20, w*10, 20, 10);
		}
		if(map[w][q] == 'h'){
		map_ctx.drawImage(h, q*20, w*10, 20, 10);
		}
	}
}
//рисуем круг
map_ctx.drawImage(mini_player_png, xp, yp, 20, 10);

}











//--------------------Отрисовка всех лошадок

var horse_image = new Image();

function drow_horses(){

for(p = 1; p  < horses.length; p++){

if ((horses[p].x * block_s+x0+x_o-5 <= 0 - block_s)||(horses[p].x * block_s+x0+x_o-5 > 1000)||(horses[p].y * block_s+y0+y_o-5 < 0 - block_s)||(horses[p].y * block_s+y0+y_o-5 > 500)){
//ничего
}else{

if(horses[p].delay == 0){

if((horses[p].action=='headshaking') && (horses[p].id_action==12)){
horses[p].id_action = 0;

horses[p].delay = 12;
}

if(horses[p].id_action == 14){

horses[p].id_action = 0;

horses[p].delay = 12;
	
}

if(horses[p].action!='nothing'){
horse_image.src = 'textures/horse/'+horses[p].way+'/'+horses[p].action+'/'+horses[p].id_action+'.png';
}else{
horse_image.src = 'textures/horse/'+horses[p].way+'/'+horses[p].action+'/0.png';
}

ctx.drawImage(horse_image, horses[p].x*block_s+x0+x_o-5, horses[p].y*block_s+y0+y_o-5, block_s+10, block_s+10);

if(horses[p].kidd == 3){
horses[p].kidd = 0;
horses[p].id_action++;
}


horses[p].kidd++;



}else{



	if(horses[p].delay == 1){
	
	if(horses[p].repeat_way_id==0){
	
	horses[p].way=horses[p].repeat_way;
	horses[p].repeat_way_id=1;
	
	}else{
	
	ch1 = Math.round(Math.random()*3);
	
	
	switch(ch1){
	case 0: horses[p].way = 'right'; horses[p].repeat_way = 'right'; break;
	case 1: horses[p].way = 'left'; horses[p].repeat_way = 'left'; break;
	case 2: horses[p].way = 'top'; horses[p].repeat_way = 'top'; break;
	case 3: horses[p].way = 'bottom'; horses[p].repeat_way = 'bottom'; break;
	default: break;
	}
	horses[p].repeat_way_id=0;
	}

	
	ch2 = Math.round(Math.random()*2+0);
	
	switch(ch2){
	case 0: horses[p].action = 'eating'; break;
	case 1: horses[p].action = 'headshaking'; break;
	case 2: 
	ch3 = Math.round(Math.random()*30+30);
	horses[p].delay = ch3; 
	break;
	default: break;
	}
	
}


horses[p].delay--;
horse_image.src = 'textures/horse/'+horses[p].way+'/'+horses[p].action+'/0.png';
ctx.drawImage(horse_image, horses[p].x*block_s+x0+x_o-5, horses[p].y*block_s+y0+y_o-5, block_s+10, block_s+10);
}

}


}
}

//-------------------------------------------------
var ogr_attak_image = new Image();
var ogr_nothing_image = new Image();
ogr_attak_image.src = 'textures/enemy/ogr/attak.png';
ogr_nothing_image.src = 'textures/enemy/ogr/nothing.png';
//Отрисовка врагов-------------------

function drow_ogrs(){

for(p = 1; p  < enemies.length; p++){


if(enemies[p].id_action == 12) {
	enemies[p].id_action = 0;
	enemies[p].delay = Math.round(Math.random()*10);
}



switch(enemies[p].way){
	case 'top': way = 0; break;
	case 'top_right': way = 1; break;
	case 'right': way = 2; break;
	case 'bottom_right': way = 3; break;
	case 'bottom': way = 4; break;
	case 'bottom_left': way = 5; break;
	case 'left': way = 6; break;
	case 'top_left': way = 7; break;
}

ctx.drawImage(ogr_nothing_image, enemies[p].id_action*268, way*250+1, 249, 249, enemies[p].x*block_s+x0+x_o-50, enemies[p].y*block_s+y0+y_o-50, block_s+100, block_s+100);

enemies[p].kidd++;



if(enemies[p].kidd == 5){

//alert(enemies[p].id_action+' '+enemies[p].id_action*283);

enemies[p].kidd = 0;
if(enemies[p].delay <= 0){
enemies[p].id_action++;
}else{
enemies[p].delay--;
}
}



}

}

//-------------------------------



//-----------------------Отрисовка игрока
var player_image = new Image();


function drow_player(){

if(player.id_action==8){ player.id_action = 0 }
if(player.action!='nothing'){
player_image.src = 'textures/player/white_mage/'+player.way+'/'+player.action+'/'+player.id_action+'.png';
}else{
player_image.src = 'textures/player/white_mage/'+player.way+'/nothing1.png';
}

ctx.drawImage(player_image, (length_map/2 - 0.5)*block_s + x_o, (length_map/2 - 0.5)*block_s + y_o, block_s, block_s);
if(kid == 2){
kid = 0;
player.id_action++;
}
}
//---------------------------------------





create_obj();




function drow_map(){

ctx.fillStyle = '#000000';
ctx.strokeStyle = '#000000';
ctx.fillRect(0, 0, 1000, 500);

for (i=0; i<length_map; i++){
	for (j=0; j<length_map; j++){
	
	if ((i*block_s+x0+x_o < 0 - block_s)||(i*block_s+x0+x_o > 1000)||(j*block_s+y0+y_o < 0 - block_s)||(j*block_s+y0+y_o>500)){
	continue;
	}
	

	ctx.drawImage(ground, i*block_s+x0+x_o, j*block_s+y0+y_o, block_s, block_s);
	
	if(map[j][i]=='t'){
	ctx.drawImage(trees, i*block_s+x0-5+x_o, j*block_s+y0-50+y_o, block_s+10, block_s+50);
	}

}

}
drow_horses();
drow_ogrs();
drow_player();
kid++;
drow_mini_player();
moveRect_player();
}
//-------------------------------------


//-------Move player's object
function moveRect_player(){

if(player.action!='nothing'){
step();

if(access_step == true){

switch(player.way){
	case 'left':
		x0+=player.speed;
	break;

	case 'right':
		x0-=player.speed;
	break;

	case 'top':
		y0+=player.speed;
	break;

	case 'bottom':
		y0-=player.speed;
	break;
}

}

}

}


//----------Собития по нажатии на клавишы
function moveRect(e){
     
    //var blueRect = document.getElementById("blueRect");
    // получаем стиль для blueRect
    //var cs = window.getComputedStyle(blueRect);
     
    //var left = parseInt(cs.marginLeft);
    //var top = parseInt(cs.marginTop);
	
	
     
    switch(e.keyCode){
         
        case 65:  // если нажата клавиша влево
				if(e.shiftKey){
				player.action = 'walking';
				player.speed = Math.round(block_s/10/3);
				}else{
				player.action = 'run';
				player.speed = block_s/10;
				}
				player.way = 'left';
				
            break;
        case 87:   // если нажата клавиша вверх
				if(e.shiftKey){
				player.action = 'walking';
				player.speed = Math.round(block_s/10/3);
				}else{
				player.action = 'run';
				player.speed = block_s/10;
				}
				player.way = 'top';
				
            break;
        case 68:   // если нажата клавиша вправо
				if(e.shiftKey){
				player.action = 'walking';
				player.speed = Math.round(block_s/10/3);
				}else{
				player.action = 'run';
				player.speed = block_s/10;
				}
				player.way = 'right';
				
            break;
        case 83:   // если нажата клавиша вниз
				if(e.shiftKey){
				player.action = 'walking';
				player.speed = Math.round(block_s/10/3);
				}else{
				player.action = 'run';
				player.speed = block_s/10;
				}
				player.way = 'bottom';
				
            break;
    }
}
//--------------------------------------------





//---------Проверка столкновений ТОЛЬКО ДЛЯ ИГРОКА
function step(){

//настроим чувствительность
ux = 0;
uy = 0;
switch(player.way){
	case 'right': ux = -0.85; break;
	case 'left': ux = 1; break;
	case 'top': uy = 0.1; break;
	case 'bottom': uy = -0.7; break;
	default: break;
}
//-------индексы ячеек
xp = Math.round((-x0 + (length_map/2 - 0.5)*block_s)/block_s + ux);
yp = Math.round((-y0 + (length_map/2 - 0.5)*block_s)/block_s + uy);

access_step = true;

switch(player.way){
	case 'right':
	if(map[yp][xp+1] == 't'){
	access_step = false;
	}
	if(map[yp][xp+1] == 'h'){
	access_step = false;
	}
	break;
	
	case 'left':
	if(map[yp][xp-1] == 't'){
	access_step = false;
	}
	if(map[yp][xp-1] == 'h'){
	access_step = false;
	}
	break;
	
	case 'top':
	if(map[yp][xp] == 't'){
	access_step = false;
	}
	if(map[yp][xp] == 'h'){
	access_step = false;
	}
	break;
	
	case 'bottom':
	if(map[yp+1][xp] == 't'){
	access_step = false;
	}
	if(map[yp+1][xp] == 'h'){
	access_step = false;
	}
	break;
	
	default: break;
}

}
//----------------------

//событие Keyup
function nothing_player(){
player.action = 'nothing';
}


//Активация событий
addEventListener("keydown", moveRect);
addEventListener("keyup", nothing_player);

//Основной цикл
setInterval(drow_map, 40);

