import * as exercises from './tracker_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

/**
 * Create a new exercise with name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 500.
            res.status(500).json(error);
        });
});

/**
 * Retrieve all exercises
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date provdied in the body
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(
            req.params._id, 
            req.body.name, 
            req.body.reps, 
            req.body.weight, 
            req.body.unit, 
            req.body.date
            )
        .then(numUpdated => {
            let date = formatDate(req.body.date)
            // console.log(date)
            // console.log(typeof date)
            if (numUpdated === 1) {
                res.json({
                    // _id: req.params._id, 
                    // name: req.body.name, 
                    // reps: req.body.reps, 
                    // weight: req.body.weight, 
                    // unit: req.body.unit, 
                    // date: req.body.date,
                    // date: date
                    _id: req.params._id, 
                    name: req.body.name, 
                    date: req.body.date,
                    unit: req.body.unit, 
                    reps: req.body.reps, 
                    weight: req.body.weight
                })
            } else {
                res.status(500).json(error)
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
});

function formatDate(d) {
    let date = new Date(d);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getYear() % 100;

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [day, month, year].join('-');
}

/**
 * Delete the exercise whose id is provided as a path parameter
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log("Deleted: ", deletedCount)
                res.status(204).send();
            } else {
                res.status(500).json(error);
            }
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});