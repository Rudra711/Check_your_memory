var x = ["red", "blue", "yellow", "green"];
var lev = 1;
var cur_index = 0;
var cur_on = false;
var game_s = false;
var ongoing_list = [];

function rmv(cls) {
    $("."+cls).removeClass("pressed");
    console.log("removed");
}
function clr_rmv(cls){
    $(cls).removeClass("game-over");
    console.log("clr-rmv");
}
$(document).keypress(function () {
    if (cur_on == false && game_s==false) {
        $("h1").html("Level " + lev);
        var cls = x[Math.floor(Math.random() * 4)];
        $("."+cls).addClass("pressed");
        var adi = new Audio("sounds/"+cls + ".mp3");
        adi.play();
        ongoing_list.push(cls);
        cur_on=true;
        game_s = true;

        setTimeout(function () {
            rmv(cls);
        }, 200);
    }
});

$(".btn").click(function () {
    if (game_s == true) {
        var idx = $(this).attr("id");
        var adi = new Audio("sounds/"+idx + ".mp3");
        adi.play();
        $("."+idx).addClass("pressed");
        setTimeout(function () {
            rmv(idx);
        }, 200);
        // Delay the rest of the logic after the audio has finished playing
        
        if (cur_index >= ongoing_list.length) {
            game_s = false;
            lev = 1;
            var wrng = new Audio("sounds/"+"wrong.mp3");
            wrng.play();
            $("h1").html("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                clr_rmv("body");
            } ,200);
            cur_on=false;
            ongoing_list =[];
        }
        else if (idx != ongoing_list[cur_index]) {
            var wrng = new Audio("sounds/"+"wrong.mp3");
            wrng.play();
            game_s = false;
            lev = 1;
            $("h1").html("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                clr_rmv("body");
            } ,200);
            cur_on=false;
            ongoing_list =[];
        }
        else if (cur_index == ongoing_list.length - 1) {
            setTimeout(function(){
                cur_index = 0;
                var cls = x[Math.floor(Math.random() * 4)];
                $("."+cls).addClass("pressed");
                var audio = new Audio("sounds/"+cls + ".mp3");
                audio.play();
                ongoing_list.push(cls);
                // Delay the removal of the "pressed" class after the audio has finished playing
                setTimeout(function () {
                    rmv(cls);
                }, 200); // Multiply by 1000 to convert seconds to milliseconds
                lev++;
                $("h1").html("Level " + lev);
            },1000);
        } // Multiply by 1000 to convert seconds to milliseconds
        else{
            cur_index++;
        }
    }
    else{
        var wrng = new Audio("sounds/wrong.mp3");
        wrng.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            clr_rmv("body");
        } ,200);
    }
});
