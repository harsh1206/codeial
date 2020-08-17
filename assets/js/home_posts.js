{
     console.log("Script 1 Loaded");  

    // method to submit the form data of new post using ajax
    let createPost=function(){

        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            
            e.preventDefault();
           
            $.ajax({
                type: 'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success: function(data){

                    console.log(data);
                    let newPost=newPostDom(data.data.post);

                    $('#posts-list-container>ul').prepend(newPost);

                    console.log("new post",newPost);

                    new Noty({
                        theme:'relax',
                         text: 'Post Created',
                         type:'success',
                        layout:'topRight',
                        timeout:1500
       
                     }).show();
       

                    deletePost($(' .delete-post-button' , newPost));
                    
                },error:function(error){

                    console.log(error.responseText);
                    new Noty({
                        theme:'relax',
                        text:'Error in creating Post !',
                        type:'error',
                        layout:'topRight',
                        timeout:1500
                    })
                }

            }) 
        });
    }


    // method to create a post in DOM

    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <p>
         
           <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
           </small>
      
            ${post.content}
                
           <br>
    
           <small> 
            ${post.user.name}
           </small> 
    
         </p>
       
         <div class="post-comment">
             
          
              
             <form action="/comments/create" method="POST">
    
               <input type="text" name="content" placeholder="Type here to add comment..." required>
               <input type="hidden" name="post" value="${post._id}">
               <input type="submit" value="add comment">
                     
             </form>
    
           
    
            <div class="post-comments-list">
                <ul id="posts-comments-${post._id}">
    
                  
                </ul>
            </div>
    
         </div>
    
     </li>   `)
    }


    //  method to delete a post from DOM
    let deletePost=function(deleteLink){
        console.log("delete link",deleteLink)
        $(deleteLink).click(function(e){
       
            e.preventDefault();

            $.ajax({
                
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){

                    console.log("data",data.data.post_id);

                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme:'relax',
                        type:'success',
                        text:"Post deleted",
                        layout:"topRight",
                        timeout:1500
                    }).show()

                },error:function(error){
                    console.log(error.responseText);
                }
            });
    
        });
    }
     

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            console.log(postId);
            new PostComments(postId);
        });
    }


    convertPostsToAjax();
    createPost();
  

}