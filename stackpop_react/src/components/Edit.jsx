import { TiPencil} from "react-icons/ti";
import {Link} from 'react-router-dom'
	
function Edit({ exerciseId, onEdit }) {
    
    return (
        <Link to={`/edit-exercise/${exerciseId}`} >
        <TiPencil/>
    </Link>
    );
  }

  export default Edit;