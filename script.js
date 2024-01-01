let m = 'm'; //représente un mur
let p = 'p'; //représente le personnage
let b = 'b'; //représente le chemin
let f = 'f'; //représente le trophée 

let xperso = 1; //position initial du personnage sur l'axe X
let yperso = 1; //postition initial du personnage sur l'axe Y 



//tableau à double entrée représentant votre labyrinthe, vous pouvez le modifier pour comprendre le fonctionnement
let labyCoordinate = [[m, m, m, m, m, m, m, m, m, m],
                     [m, p, m, b, b, b, b, b, b, m],
                     [m, b, m, b, m, m, m, b, m, m],
                     [m, b, m, b, m, b, m, b, b, m],
                     [m, b, b, b, m, b, m, m, b, m],
                     [m, b, m, b, m, b, b, b, b, f],
                     [m, m, m, m, m, m, m, m, m, m]];

function initGame() {
    // Position initiale du personnage
    labyCoordinate[yperso][xperso] = p;
                        
    // Affiche le labyrinthe initial
affichage();
}
                    
function affichage() //ne rien modifier dans cette fonction
{
    let elementLaby = document.querySelector("#laby");

    let html = "<table border=0 cellspacing=0 cellpadding=0'>";

        // i => y
        // j => x

    for (i = 0; i < 7; i++) {
        html += "<tr>";
        for (j = 0; j < 10; j++) {

            if (labyCoordinate[i][j] == m) {
                html += "<td>";
                html += "<img width='52px' height='52px' src='assets/stonewall.png'>";
                html += "</td>";
            }
            if (labyCoordinate[i][j] == p) {
                html += "<td>";
                html += "<img width='52px' height='52px' style='background-image:assets/ground.png' src='assets/kappa.png'>";
                html += "</td>";
            }
            if (labyCoordinate[i][j] == b) {
                html += "<td>";
                html += "<img width='52px' data-y=" + i + " data-x=" + j + " height='52px' src='assets/ground.png' onclick='movePlayer(this)'>";
                html += "</td>";
            }
        
            if (labyCoordinate[i][j] == f) {
                html += "<td>";
                html += "<img width='52px' data-y=" + i + " data-x=" + j + " height='52px' src='assets/trophy.png' onclick='movePlayer(this)'>";
                html += "</td>";
            }
        }

    }
    html += "</tr>";
    html += "</table>";
    elementLaby.innerHTML = html;
}
/*  axe y = vertical
axe x = horizontal */
function down() {
    if (labyCoordinate[yperso+1][xperso] == b) {
        labyCoordinate[yperso][xperso] = b; // donne la position actuelle de mon personnage sur un chemin 
        labyCoordinate[yperso+1][xperso] = p; // donne la prochaine position de mon personnage
        yperso += 1; /* incrémente sont déplacement sur l axe y */
        affichage()
    }
}
/* if coordonnée du labyrinthe de xperso et de yperso augmente et que c'est un chemin et que coordonnée du labyrinthe de xperso et de yperso augmente et que ce n'est pas un mur

Alors les coordonées du personnage dans le labyrinthe sont égale à un chemin 
'p'; //représente le personnage  */

function up() {
    if (labyCoordinate[yperso - 1][xperso] == b) {
        labyCoordinate[yperso][xperso] = b;
        labyCoordinate[yperso - 1][xperso] = p;
        yperso -= 1;
        affichage()
    }
}

function right() { 
    if (labyCoordinate[yperso][xperso+1] == b) {
        labyCoordinate[yperso][xperso] = b;
        labyCoordinate[yperso][xperso+1] = p;
        xperso += 1;
        affichage()
    }
   else if (labyCoordinate[yperso][xperso+1] == f) {
        labyCoordinate[yperso][xperso] = b;
        labyCoordinate[yperso][xperso+1] = p;
        xperso += 1;
        affichage()
        alert("Félicitations, vous avez gagné.") 
   }    
}

function left() { 
    if (labyCoordinate[yperso][xperso -1] == b && labyCoordinate[xperso][yperso - 1] != m) {
        labyCoordinate[yperso][xperso] = b;
        labyCoordinate[yperso][xperso -1] = p;
        xperso -= 1;
        affichage()
    }
}
function getVictory(newPositionx,newPositiony) {
    if (labyCoordinate[newPositionx][newPositiony] == f) {
        console.log(newPositionx);
        console.log(newPositiony);
        alert("Félicitations, vous avez gagné.")
        xperso = newPositionx
        yperso = newPositiony
        affichage()
        console.table(labyCoordinate)
        return true
    }
    return false
 } 

function movePlayer(e) {

    console.log('x', e.getAttribute("data-x"))
    console.log('y', e.getAttribute("data-y"))
    let x = e.getAttribute("data-x")
    let y = e.getAttribute("data-y")

    if (y == yperso+1 && x == xperso) {
        if(!getVictory(yperso+1, xperso)) {
        down()
        console.log('yperso',yperso);
    }
    }
    else if (y == yperso-1 && x == xperso) {
        if(!getVictory(yperso-1, xperso)) {
        up()
        console.log('yperso',yperso);
       } 
    }
    else if (y == yperso && x == xperso+1) {
        if(!getVictory(yperso, xperso+1)) {
        right()
        console.log('xperso',xperso);
        }
    }
    else if (y == yperso && x == xperso-1) {
        if (!getVictory(yperso, xperso-1)) {
        left()
        console.log('xperso',xperso);
        }
    }
 }