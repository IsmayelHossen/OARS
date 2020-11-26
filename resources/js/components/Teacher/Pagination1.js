import React from 'react';
const Pagination1=({totalpage,perpage,paginate})=>{
const pageNumber=[];
    for(let i=1;i<=Math.ceil(totalpage/perpage);i++){

        pageNumber.push(i);
        }
  return(
     <div>
         <h3>pagination</h3>
       <nav>
           <ul className="pagination">
               {pageNumber.map((page)=>(


               <li className="page-item">
             <a onClick={()=>paginate(page)}  className="page-link">{page}</a>
               </li>
                 ))}
           </ul>
       </nav>
     </div>

  );
}
export default Pagination1;
