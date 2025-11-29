

const priorityCapture = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
}


export const filteredSortedTask = (tasks, search, priority, sortorder,status) => {
    
    //1. Filter Logic
    const filterSearch = tasks.filter((item)=>{
        const searchMatched = item.title?.toLowerCase().includes(search.toLowerCase());
        const searchPriority = priority === '' || priority === 'All'
        ? true
        : item.priority?.toLowerCase().includes(priority.toLowerCase());
        
        // status Logic
        const completedTasks = status === 'All'?true:item.status === status;
         
        return searchMatched && searchPriority && completedTasks
    });

    // 2. SORTING LOGIC
    if (!sortorder || sortorder === 'reset') {
        return filterSearch; // Koi bhi changes mT karna
    }

     return [...filterSearch].sort((a,b)=>{ //filtersearch Copy Taaki Main Data mein changes na hon
        
      //Convert This With Self Made Number
        const A = priorityCapture[a.priority] //priorityCapture[high/low] Bracket Notation ka use kiya hai
        const B = priorityCapture[b.priority] //fetching from data
        
        if(sortorder === 'high'){
            return A - B;
        }else{
            return B - A;
        }
    });}