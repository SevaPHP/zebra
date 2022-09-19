window.addEventListener('DOMContentLoaded', () => {
      'use strict';
      
      const dataId = document.querySelector("#dataId"),
            back = document.querySelector("#back"),
            submit = document.querySelector("#submite"),
            postsName = document.querySelector("#postsName");
            let pag = 1 ;
            let totalCount = 0;
            const paginationss = document.querySelector(".pagination");

      //фильтрация по дате
      dataId.addEventListener("click", (e)=>{
            document.querySelector("#tbody").innerHTML = ``;
            getPost(`http://localhost:8888/postsId=${1}`);
            let postsId = 'postsId'
            paginations(pag,postsId);
            
      });
    
       //фильтрация по имени
       postsName.addEventListener("click", (e)=>{
            document.querySelector("#tbody").innerHTML = ``;
            getPost(`http://localhost:8888/postsName=${1}`);
            let postsId = 'postsName';
            paginations(pag,postsId);
      });
      //Назад
      back.addEventListener("click", (e)=>{
            e.preventDefault();
            document.querySelector("#tbody").innerHTML = ``;
            getPost(`http://localhost:8888/posts=${1}`);
            paginations(pag);
      });


      async function setNewTend(){
            let col1 = document.querySelector("#col1").value;
            let col2 = document.querySelector("#col2").value;
            let col3 = document.querySelector("#col3").value;
            let col4 = document.querySelector("#col4").value;
            console.log(col1,col2,col3,col4);
            //имитация формы
            let formData = new FormData();
            formData.append('col1', col1);
            formData.append('col2', col2);
            formData.append('col3', col3);
            formData.append('col4', col4);

            let res = await fetch("http://localhost:8888/posts",{
                  method: 'POST',
                  body: formData
            });
            let data = await res.json();
            console.log(data);
            if (data.status === true){
                  document.querySelector("#tbody").innerHTML = ``;
                  getPost("http://localhost:8888/posts");
                  alert("Тендер добавлен");
                 
            }else{
                  alert("Ошибка обратитесь к программисту")
            }
      }

     submit.addEventListener("click", (e)=>{

            console.log('ворк');
            setNewTend();
      });

      async function getPost(url){
            let res = await fetch(url);
            let post = await res.json();
            console.log(post);
            post.forEach((element,index) => {
                  if(index != 0 ){
                  document.querySelector("#tbody").innerHTML += `
                  <tr class="idTend" id="${element['COL 1']}">
                        <td>${element['COL 1']}</td>
                        <td>${element['COL 2']}</td>
                        <td>${element['COL 3']}</td>
                        <td>${element['COL 4']}</td>
                        <td>${element['COL 5']}</td>
                  </tr>
                  `;
                  }
            });


            let idTend = document.querySelectorAll('.idTend');
            //console.log(idTend);
            idTend.forEach(item => {
                  item.addEventListener("click", (e)=>{
                        document.querySelector("#tbody").innerHTML = ``;
                        getIdtend(item.id);
                  });
            });
           
      }
      
      let asd = async function getCountPAgs(){
            let res = await fetch("http://localhost:8888/pags.php/");
            let post = await res.json();
            return post
           // console.log(post);
            
      }


      
      const strins = 'posts'
      function paginations(pag,strins){
            paginationss.innerHTML = ``;
            asd().then((data) => {
                  document.querySelector(".hint-text").innerHTML = `
                  Показано <b>10</b> из <b>${data['total']}</b> записей
                  `;
             
                  let div = document.createElement('li');
                  div.className = "page-item btn btn-success";
                  div.setAttribute("id", "prev");
                  div.innerHTML = "Назад";
                  paginationss.prepend(div);
                   document.querySelector("#prev").addEventListener("click", (e)=>{
                           //document.querySelector("#tbody").innerHTML = ``;  
                           if(pag <= 1){
                              document.querySelector("#tbody").innerHTML = ``;
                              getPost(`http://localhost:8888/${strins}=${1}`);
                              document.querySelector(".hint-text").innerHTML = `
                              Показано <b>${10}</b> из <b>${data['total']}</b> записей
                              `;
                           }else{
                              let totals = [];
                              pag--;
                              document.querySelector(".hint-text").innerHTML = `
                              Показано <b>${pag * 10}</b> из <b>${data['total']}</b> записей
                              `;
                              //document.querySelector("#tbody").innerHTML = ``;
                              //getPost(`http://localhost:8888/posts=${pag}`);
                              for (let index = (pag + 1) * 10; index >= pag * 10; index--) {
                                    console.log(index);
                              let a  = document.querySelectorAll(".idTend")[index];
                              console.log(a);
                              if(a){
                                    a.remove();
                                     }   
                              }
                             
                              
                           }
                         
                  });
     
               
                   let div2 = document.createElement('li');
                   div2.className = "page-item btn btn-success";
                   div2.setAttribute("id", "next");
                   div2.innerHTML = "Вперед";
                   paginationss.append(div2);
     
                   document.querySelector("#next").addEventListener("click", (e)=>{
                              //document.querySelector("#tbody").innerHTML = ``;
                              if(pag >= data['total'] ){
                                    document.querySelector("#tbody").innerHTML = ``;
                                    getPost(`http://localhost:8888/${strins}=${1}`);
                                    document.querySelector(".hint-text").innerHTML = `
                                    Показано <b>${pag * 10}</b> из <b>${data['total']}</b> записей
                                    `;
                              }else{
                                    pag++;
                                    getPost(`http://localhost:8888/${strins}=${pag}`);
                                    document.querySelector(".hint-text").innerHTML = `
                                    Показано <b>${pag * 10}</b> из <b>${data['total']}</b> записей
                                    `;
                              }
                            
                        });
     
                    })    
                };
            
      
      getPost(`http://localhost:8888/posts=${pag}`);
      paginations(pag,strins);



      async function getIdtend($id){
            paginationss.innerHTML = ``;
            document.querySelector(".hint-text").innerHTML = `
            
            `;
            let res = await fetch("http://localhost:8888/posts/" + $id);
            let post = await res.json();
            console.log(post);
                  document.querySelector("#tbody").innerHTML += `
                  <tr >
                        <td>${post['COL 1']}</td>
                        <td>${post['COL 2']}</td>
                        <td>${post['COL 3']}</td>
                        <td>${post['COL 4']}</td>
                        <td>${post['COL 5']}</td>
                  </tr>
                  `;
          
      }
      
    
      //

});