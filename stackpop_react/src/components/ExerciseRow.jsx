import '../App.css';
import Edit from './Edit';
import Delete from './Delete';

function ExerciseRow({ exercise, onDelete, onEdit }) {
    return (
        <tr >
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td className="no-border-row"><Delete exerciseId={exercise._id} onDelete={onDelete} /></td>
            <td className="no-border-row"> <Edit exerciseId={exercise._id} onEdit={onEdit}/> </td>

            
        </tr>
    );
}

export default ExerciseRow;