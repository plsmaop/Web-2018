const app = document.getElementById('app');

let exercises = [];
let isTraining = false;

class Exercise {
    constructor(exercise, duration, index) {
        this.exercise = exercise;
        this.duration = duration;
        this.index = index;
        this.active = false;
    }
}

const shwoTime = (exer, duration) => {
    const start = new Date();
    const updateTime = () => {
        const cur = new Date();
        const gapTime = new Date(cur - start);
        const gap = gapTime.getMinutes()*60 + gapTime.getSeconds();
        if(gap > duration) {
            exer.classList.add('done');
            exer.innerHTML = 'DONE';
            alert('Congratulation! You Have Finished ONE Exercise!')
            alert('You can Remove the Finished Exercise by Clicking it');
            exer.addEventListener('click', () => {exer.remove();});
            isTraining = false;
            return;
        }
        exer.innerHTML = `${duration - gap} sec`;
        setTimeout(() => updateTime(), 100);
    };
    updateTime();
};

const animation = (exer, exercise) => {
    const exerText = exer.innerHTML;
    exer.addEventListener('mouseover', () => {
        if(exercise.active) return;
        exer.innerHTML = 'CLICK TO START';
        exer.classList.add('hover');
    });
    exer.addEventListener('mouseleave', () => {
        if(exercise.active) return;
        exer.innerHTML = exerText;
        exer.classList.remove('hover');
    });
    exer.addEventListener('click', () => {
        if(exercise.active) return;
        if(isTraining) {
            alert('You cannot do more than one exercise in the same time!!');
            return;
        }
        exer.classList.add('exercising');
        isTraining = true;
        exercise.active = true;
        shwoTime(exer, exercise.duration);
    });
}; 

const addExercise = (exercise) => {
    const exer = document.createElement('div');
    exer.className = 'exercise';
    exer.innerHTML = `${exercise.exercise}: ${exercise.duration/60} min(s)`;
    exer.duration = exercise.duration;
    animation(exer, exercise);

    const delButtion = document.createElement('div');
    delButtion.className = 'del';
    const X = document.createElement('div');
    X.innerHTML = 'X';
    X.className = 'X';
    delButtion.appendChild(X);

    const exerciseItem = document.createElement('div');
    exerciseItem.className = 'item';
    exerciseItem.appendChild(exer);
    // exerciseItem.appendChild(delButtion);

    const exerList = document.getElementById('list');
    exerList.appendChild(exerciseItem);
};

const createMenu = () => {
    const menu = document.createElement('div');

    const exercise = document.createElement('form');
    exercise.className='menu';
    const select = document.createElement('select');
    select.name = 'exercise';
    const defaultOp = document.createElement('option');
    defaultOp.setAttributeNode(document.createAttribute('selected'));
    defaultOp.setAttributeNode(document.createAttribute('disabled'));
    defaultOp.setAttributeNode(document.createAttribute('hidden'));
    defaultOp.value ='';
    defaultOp.innerHTML = 'exercise';
    select.appendChild(defaultOp);
    let choosenExercise ='';

    const options = ['Plank', 'Push UP', 'Ab crunch', 'Glute Bridge', 'Burpee'];
    for(let i = 0; i < options.length; i+=1) {
        const option = document.createElement('option');
        option.value = option.innerHTML = options[i];
        select.appendChild(option);
    }
    select.addEventListener('change', () => {choosenExercise = select.value;});

    exercise.appendChild(select);
    menu.appendChild(exercise);

    const duration = document.createElement('form');
    duration.className='menu';
    const select2 = document.createElement('select');
    select2.name = 'duration';
    const defaultOp2 = document.createElement('option');
    defaultOp2.setAttributeNode(document.createAttribute('selected'));
    defaultOp2.setAttributeNode(document.createAttribute('disabled'));
    defaultOp2.setAttributeNode(document.createAttribute('hidden'));
    defaultOp2.value ='';
    defaultOp2.innerHTML = 'duration(mins)';
    select2.appendChild(defaultOp2);
    let choosenTime = '';

    const options2 = ['1', '2', '3'];
    for(let i = 0; i < options2.length; i+=1) {
        const option = document.createElement('option');
        option.innerHTML = options2[i];
        option.value = parseInt(options2[i])*60;
        select2.appendChild(option);
    }
    select2.addEventListener('change', () => {choosenTime = select2.value;});
    duration.appendChild(select2);
    menu.appendChild(duration);

    const add = document.createElement('div');
    add.className='menu';
    const button = document.createElement('input');
    button.type='button';
    button.value='add exercise';
    button.addEventListener('click', () => {
        select.selectedIndex = 0;
        select2.selectedIndex = 0;
        if(choosenExercise === '') {
            alert('Empty Exercise is not Allowed!!');
            choosenExercise = '';
            choosenTime = '';
            return;
        }
        else if (choosenTime === '') {
            alert('Empty Duration is not Allowed!!');
            choosenExercise = '';
            choosenTime = '';
            return;
        }
        let newExercise = new Exercise(choosenExercise, choosenTime, exercises.length);
        addExercise(newExercise);
        choosenExercise = '';
        choosenTime = '';
        exercises.push(newExercise);
    });
    add.appendChild(button);
    menu.appendChild(add);  
    return menu;
};

const main = () => {
    // header
    const header = document.createElement('h1');
    header.innerHTML = 'TRAINING PROGRAM';
    app.appendChild(header);

    // menu
    const menu = createMenu();
    app.appendChild(menu);

    // Exercise List
    const list = document.createElement('div');
    list.id='list';
    app.appendChild(list);
};

main();
