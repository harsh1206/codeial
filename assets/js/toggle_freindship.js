console.log('freindship script loaded');

class ToggleFreindship{


    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleFreindship();
    }

    toggleFreindship(){


        $(this.toggler).click(function(e){


            e.preventDefault();
            let self=this;
             
            $.ajax({
                type:'POST',
                url:$(self).attr('href')
            })
            .done(function(data){
                
                console.log(data);

                if(data.data.added==true){
                    
                    $(self).html('ADD');
                     
                    new Noty({
                        theme:'relax',
                         text: 'Removed Freind',
                         type:'success',
                        layout:'topRight',
                        timeout:1500
       
                     }).show();


                }else{

                    $(self).html('REMOVE');
                    new Noty({
                        theme:'relax',
                         text: 'Added Freind',
                         type:'success',
                        layout:'topRight',
                        timeout:1500
       
                     }).show();
                }

            })
            .fail(function(errData){

                console.log('error in completing the request');

            });

        });



    }



}