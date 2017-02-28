/* 
    Author     : PTLdeveloper
    Created on : 25-feb-2017
    Last update: 27-feb-2017
*/

//Event when switching game mode
$(document).ready(function(){
    $('.slider').click(function(){
        if($.fn.switchIsOn() === false)
        {
            $('#rockleft').hide();
            $('#paperleft').hide();
            $('#scissorsleft').hide();
            $('.namePlayer').text('Computer');
        }
        else
        {
            $('#rockleft').show();
            $('#paperleft').show();
            $('#scissorsleft').show();
            $('.namePlayer').text('Opponent'); 
        }
        
        //Restoring values
        $('#scoreyou').text('0');
        $('#scorecomputer').text('0');
        $.fn.initialize('all');
        
    });
});

//Function to obtain game mode switch state
$(document).ready(function(){
    $.fn.switchIsOn = function(){ 
        
        if($('#switcher:checkbox:checked').length === 0)
        {
            return false;
        }
        else
        {
            return true;
        }

    };
});

//Event when clicking rock RIGHT
$(document).ready(function(){
    $('#rockright').click(function(){
        
        $.fn.initialize('right');
        
        if($.fn.switchIsOn() === false)
        {
            $.fn.playMulti($(this), 'right');
        }
        else
        {
            $('#img_righthand').attr('src','images/handrightrock.png');
            $.fn.challenge($(this).attr('name'));
        }
        
    });
});

//Event when clicking rock LEFT
$(document).ready(function(){
    $('#rockleft').click(function(){
        
        $.fn.initialize('left');
        
        $.fn.playMulti($(this), 'left');

    });
});

//Event when clicking paper RIGHT
$(document).ready(function(){
    $('#paperright').click(function(){
        
        $.fn.initialize('right');
        
        if($.fn.switchIsOn() === false)
        {
            $.fn.playMulti($(this), 'right');
        }
        else
        {
            $('#img_righthand').attr('src','images/handrightpaper.png');
            $.fn.challenge($(this).attr('name'));
        }

    });
});

//Event when clicking paper LEFT
$(document).ready(function(){
    $('#paperleft').click(function(){
        
        $.fn.initialize('left');
        
        $.fn.playMulti($(this), 'left');

    });
});

//Event when clicking scissors RIGHT
$(document).ready(function(){
    $('#scissorsright').click(function(){

        $.fn.initialize('right');
        
        if($.fn.switchIsOn() === false)
        {
            $.fn.playMulti($(this), 'right');
        }
        else
        {
            $('#img_righthand').attr('src','images/handrightscissors.png');
            $.fn.challenge($(this).attr('name'));
        }

    });
});

//Event when clicking scissors LEFT
$(document).ready(function(){
    $('#scissorsleft').click(function(){

        $.fn.initialize('left');
        
        $.fn.playMulti($(this), 'left');

    });
});

//Actions to do in multiplayer mode
$(document).ready(function(){
    $.fn.playMulti = function(element, handside){ 
        
        $('.'+handside+'hand').css('border', '3px green solid');
        element.attr('longdesc', 'selected'+handside);
        $.fn.versus();
      
    };  
});

//Game against computer
$(document).ready(function(){
    $.fn.challenge = function(myItem){ 
        
        var iWin = null;
        
        //Array of domination
        var rock = {'paper': false, 'scissors': true};
        var paper = {'rock': true, 'scissors': false};
        var scissors = {'rock': false, 'paper': true};
        
        //Obtains the item used by computer
        var computerItem = $.fn.computerHand();
        
        $('#img_lefthand').attr('src','images/handleft' + computerItem + '.png');
        
        //Conditions to win/lose if I use rock
        if(myItem === 'rock')
        {
            iWin = rock[computerItem];
        }
        
        //Conditions to win/lose if I use paper
        if(myItem === 'paper')
        {
            iWin = paper[computerItem];
        }
        
        //Conditions to win/lose if I use scissors
        if(myItem === 'scissors')
        {
            iWin = scissors[computerItem];
        }
        
        //Show results on screen
        if(iWin === true)
        {
            $('.computerResult').text('LOSER');
            $('.myResult').text('WINNER');
            
            $('.lefthand')
            .animate({backgroundColor: "#f93333"}, 500)
            .animate( { 'backgroundColor': "transparent" }, 500 );
            $('.righthand')
            .animate({backgroundColor: "#78f89c"}, 500)
            .animate( { 'backgroundColor': "transparent" }, 500 );
            
            $('#scoreyou').text(Math.floor($('#scoreyou').text())+1);
        }
        else if(iWin === false)
        {
            $('.computerResult').text('WINNER');
            $('.myResult').text('LOSER');
            
            $('.righthand')
            .animate({backgroundColor: "#f93333"}, 500)
            .animate( { 'backgroundColor': "transparent" }, 500 );
            $('.lefthand')
            .animate({backgroundColor: "#78f89c"}, 500)
            .animate( { 'backgroundColor': "transparent" }, 500 );
    
            $('#scorecomputer').text(Math.floor($('#scorecomputer').text())+1);
        }
        else
        {
            $('.computerResult').text('TIE');
            $('.myResult').text('TIE');
            
            $('.righthand')
            .animate({backgroundColor: "#b9eaf3"}, 500)
            .animate( { 'backgroundColor': "transparent" }, 500 );
            $('.lefthand')
            .animate({backgroundColor: "#b9eaf3"}, 500)
            .animate( { 'backgroundColor': "transparent" }, 500 );
        }
    };  
});

//Game between two humans
$(document).ready(function(){
    $.fn.versus = function(){ 
        
        var iWin = null;
        
        //Array of domination
        var rock = {'paper': false, 'scissors': true};
        var paper = {'rock': true, 'scissors': false};
        var scissors = {'rock': false, 'paper': true};
        
        //Obtains the item used by computer
        var opponentItem = $('img[longdesc="selectedleft"]').attr('name');
        var youItem = $('img[longdesc="selectedright"]').attr('name');
        
        if(opponentItem !== undefined && youItem !== undefined)
        {
        
            $('#img_lefthand').attr('src','images/handleft' + opponentItem + '.png');
            $('#img_righthand').attr('src','images/handright' + youItem + '.png');

            //Conditions to win/lose if I use rock
            if(youItem === 'rock')
            {
                 iWin = rock[opponentItem];
            }

            //Conditions to win/lose if I use paper
            if(youItem === 'paper')
            {
                iWin = paper[opponentItem];
            }

            //Conditions to win/lose if I use scissors
            if(youItem === 'scissors')
            {
                iWin = scissors[opponentItem];
            }

            //Show results on screen
            if(iWin === true)
            {
                $('.computerResult').text('LOSER');
                $('.myResult').text('WINNER');

                $('.lefthand')
                .animate({backgroundColor: "#f93333"}, 500)
                .animate( { 'backgroundColor': "transparent" }, 500 );
                $('.righthand')
                .animate({backgroundColor: "#78f89c"}, 500)
                .animate( { 'backgroundColor': "transparent" }, 500 );

                $('#scoreyou').text(Math.floor($('#scoreyou').text())+1);
            }
            else if(iWin === false)
            {
                $('.computerResult').text('WINNER');
                $('.myResult').text('LOSER');

                $('.righthand')
                .animate({backgroundColor: "#f93333"}, 500)
                .animate( { 'backgroundColor': "transparent" }, 500 );
                $('.lefthand')
                .animate({backgroundColor: "#78f89c"}, 500)
                .animate( { 'backgroundColor': "transparent" }, 500 );

                $('#scorecomputer').text(Math.floor($('#scorecomputer').text())+1);
            }
            else
            {
                $('.computerResult').text('TIE');
                $('.myResult').text('TIE');

                $('.righthand')
                .animate({backgroundColor: "#b9eaf3"}, 500)
                .animate( { 'backgroundColor': "transparent" }, 500 );
                $('.lefthand')
                .animate({backgroundColor: "#b9eaf3"}, 500)
                .animate( { 'backgroundColor': "transparent" }, 500 );
            }
            
            //Restoring values
            $.fn.initialize('leftright');
            
        }
    };  
});

//Function to obtain randomly the choice of computer
$(document).ready(function(){
    $.fn.computerHand = function(){ 
        
        //Generates a random number
        var hand = Math.floor(1+(Math.random()*3));
        
        //Each number corresponds to an item
        if(hand === 1)
        {
            return 'rock';
        }
        else if(hand === 2)
        {
            return 'paper';
        }else if(hand === 3)
        {
            return 'scissors';
        }
    };
});

//Function to initialize data
//param: deleteall ('all', 'left', 'right', 'leftright')
$(document).ready(function(){
    $.fn.initialize = function(deleteall){ 
        
        //Restauring borders
        $('.lefthand').css('border', 'none');
        $('.righthand').css('border', 'none');

        if(deleteall === 'all')
        {
            //Restauring images
            $('#img_righthand').attr('src','images/handrightrock.png');
            $('#img_lefthand').attr('src','images/handleftrock.png');
            
            //Restauring texts
            $('.computerResult').text('---');
            $('.myResult').text('---');
        }
        
        if(deleteall === 'left' || deleteall === 'leftright' || deleteall === 'all')
        {
            //Restauring attributes
            $('#rockleft').attr('longdesc', 'none');
            $('#paperleft').attr('longdesc', 'none');
            $('#scissorsleft').attr('longdesc', 'none');
        }
        if(deleteall === 'right' || deleteall === 'leftright' || deleteall === 'all')
        {
            //Restauring attributes
            $('#rockright').attr('longdesc', 'none');
            $('#paperright').attr('longdesc', 'none');
            $('#scissorsright').attr('longdesc', 'none');
        }
        
    };
});