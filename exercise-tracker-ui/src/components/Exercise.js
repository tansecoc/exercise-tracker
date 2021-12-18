import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td><div class="test">{exercise.name}</div></td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.slice(0,10)}</td>
            <td><MdEdit onClick={() => onEdit(exercise)} /></td>
            <td><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;