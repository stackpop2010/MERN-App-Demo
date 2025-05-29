import React from 'react';
import {TiTrash } from "react-icons/ti";
	

function Delete({ exerciseId, onDelete }) {
  
  
  return (
    <div>
      <TiTrash  onClick={() => onDelete(exerciseId)} />
            
    </div>
  );
}


	
export default Delete;
