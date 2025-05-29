import ExerciseRow from './ExerciseRow';
import '../App.css';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>

                </tr>
            </thead>
            <tbody>
                
            {exercises.map((exercise) => <ExerciseRow  exercise={exercise} key={exercise._id} onDelete={onDelete} onEdit={onEdit} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;