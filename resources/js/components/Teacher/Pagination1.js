import React from 'react';
const Pagination1=({totalpage,perpage,paginate})=>{
const pageNumber=[];
    for(let i=1;i<=Math.ceil(totalpage/perpage);i++){

        pageNumber.push(i);
        }
  return(
     <div>

       <nav>
           <ul className="pagination justify-content-center">
               {pageNumber.map((page)=>(


               <li className="page-item " >
             <a onClick={()=>paginate(page)}  className="page-link" style={{textAlign:'center'}}>{page}</a>
               </li>
                 ))}
           </ul>
       </nav>
     </div>

  );
}
export default Pagination1;
