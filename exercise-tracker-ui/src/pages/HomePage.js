import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async () => {
        const response = await fetch('/exercises', { method: 'GET' });
        const data = await response.json();
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push('/edit-exercise');
    };
    
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    return (
        <>
            <h2>Exercise Tracker</h2>
            <ExerciseList exercises={exercises} onEdit={onEdit} onDelete={onDelete}></ExerciseList>
            <br></br>
            <Link to="/add-exercise">Create an exercise</Link>
        </>
    );
}

export default HomePage;