
document.addEventListener("DOMContentLoaded", function() {

   
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

   
    let tasks = [];

    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

      
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn"); // استخدمنا classList.add كما طُلب

       
        removeButton.addEventListener('click', function() {
            
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        
        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

  
    function addTask(taskTextArg, save = true) {
        // إذا جاؤنا بمهمة كوسيط نستخدمها، وإلا نأخذها من مربع الإدخال
        const taskText = (typeof taskTextArg === 'string') ? taskTextArg.trim() : taskInput.value.trim();

       
        if (taskText === "") {
            alert("من فضلك أدخل مهمة أولاً!");
            return;
        }

        
        createTaskElement(taskText);

        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

       
        taskInput.value = "";
    }

    
    function loadTasks() {
        try {
            const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
            if (Array.isArray(stored)) {
                tasks = stored; // نضع المصفوفة في الذاكرة
                
                stored.forEach(task => addTask(task, false));
            } else {
                tasks = [];
            }
        } catch (err) {
            console.error("خطأ في قراءة المهام من Local Storage:", err);
            tasks = [];
        }
    }

    // ربط الأحداث
    addButton.addEventListener('click', function() {
        addTask();
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    
    loadTasks();
});
