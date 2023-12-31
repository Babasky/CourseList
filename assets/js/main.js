window.onload = ()=>{
   const form = document.querySelector('#todoForm');
   const resetButton = document.querySelector('#reset')
   
   const saveCourses = (data)=>{
    if('localStorage' in window){
        localStorage.setItem("courses", JSON.stringify(data))
    }
   }

    const getCourses = ()=>{
        if('localStorage' in window){
            return JSON.parse(localStorage.getItem("courses")) || []
        }else{
            return "Pas de courses sur la liste"
        }
    }

    // Fonction pour ajouter des courses à la liste
    const addCourse = ()=>{
        const ul = document.querySelector('#courseList');
        ul.innerHTML = ""
        courses.forEach((course) => {
            
            const li = document.createElement('li');
            
            const checkedButton = document.createElement('button');
            checkedButton.classList.add('btn-warning');
            checkedButton.innerHTML = `<i class="fa-solid fa-check">`;

            checkedButton.onclick = (event)=>handleChecked(event, course)

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn-danger');
            deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

            deleteButton.onclick = ()=> handleDelete(course)
            const updateButton = document.createElement('button');
            
            if (course.isUpdating) {
                const input = document.createElement('input');
                input.value = course.name;
                input.onchange = (event)=> handleUpdate(event, course);
                updateButton.classList.add('btn-primary');
                updateButton.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`
                li.appendChild(input);
            }else{
                const span = document.createElement('span');
                span.innerHTML = course.name;
                updateButton.classList.add('btn-primary')
                updateButton.innerHTML = `<i class="fa-solid fa-pen">`;
                li.appendChild(span);
            }
            updateButton.onclick = ()=>toggleUpdate(course)
            li.appendChild(checkedButton);
            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            ul.appendChild(li)
        });
    }
   
    let courses = getCourses();
    addCourse()
   // Fonction pour supprimer un element de la liste
   const handleDelete = ({id})=>{
        courses = courses.filter(course => course.id !== id)
        saveCourses(courses);
        addCourse()
   }

   // Fonction pour mettre à jour une course
   const toggleUpdate = (course)=>{
       const index = courses.findIndex(c => c.id === course.id)
       courses[index].isUpdating = !course.isUpdating
       saveCourses(courses);
       addCourse()
   }

   // Fonction pour changer le nom d'une course
   const handleUpdate = (event, course)=>{
        let name = event.target.value.trim()
        if (name) {
            course.name = name
            const index = courses.findIndex(c => c.id === course.id)
            courses[index] = course
            addCourse()
        }

   }

   // Fonction pour marquer une course comme effectuée
    const handleChecked = (event,course)=>{
        const index =  event.target.parentNode
        index.classList.toggle('completed')
    
    }

    // Fonction pour vider la liste des courses
    const handleReset = () => {
        courses = [];
        saveCourses(courses); 
        addCourse(); 
    }

    


    form.onsubmit = (e)=>{
        e.preventDefault()
        const input = document.querySelector('#courseInput')
        const courseName = input.value.trim();
        if (courseName) {
            const course = {
                id: Math.round(Math.random()*1000),
                name: courseName,
                isUpdating: false,
                createdAt: new Date(),
            }
        
            courses.push(course)
            saveCourses(courses);
            addCourse()
        }
        
        form.reset() 

    }

   resetButton.onclick = handleReset
}