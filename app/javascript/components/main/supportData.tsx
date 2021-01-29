const data = {
  manual: [
    {
      title: "Login/Registration page ",
      content: `
    Registration requires unique email. 
    After registration/login, a session is created until the browser is closed. 
    After registration/login , the user will be redirected to the homepage. 
    If login is successful, the user should see a [user’s name] in the Jumbotron.`,
    },
    {
      title: "Header",
      content: `
    TodoApp NavBrand 
    Clicking this will redirect the user to the homepage. 
    
    Sidebar toggler 
    Opens and closes the sidebar When the sidebar closes, all opened lists(Projects, Tags, Labels, Filters) in the sidebar will be closed. 
    
    Home link 
    Redirects to the homepage 
    
    Search bar 
    If the current route does not begin with “/tasks”, the user will be redirected to “/tasks” with the relevant search parameters as long the search bar text field is non-empty. The tasks will be filtered based on whether the task name contains the search term. Note that search is case-sensitive. If the user is currently on a “/tasks…” page, with certain filters applied, then the page will filter by both the applied filter as well as the search term. 
    
    Quick Add New Task 
    Allows the user to quickly add a task on any page. 
    
    Support 
    Links to support page. 
    
    Statistics 
    A graph showcasing the number of tasks for the next 10 or so days. 
    
    All activities 
    An activity log. Records task-related activities, e.g. creation of tasks, and creation/deletion of comments and subtasks. Being a rather basic implementation, each activity item does not actually say exactly which task/subtask/comment is added/deleted. 
    
    Other Users
    Shows a list of other accounts using this app.
    
    Logout 
    Logs the user out and resets the session.`,
    },
    {
      title: "Sidebar",
      content: ` 
    Homepage 
    Links to the homepage 
    
    All tasks 
    View all tasks without filters. 
    
    Projects 
    The numbers next to the project indicate the following: Number of projects owned by you/Number of projects shared with you.
    Click to open a list consisting of the current projects. 
    Click the corresponding projects to view the project’s details and the tasks associated with the project. 
    Projects with a 2-person icon are those that are shared with you.
    
    Tags 
    Tags are essentially permanent labels that cannot be deleted. The tags “Work”, “Social”, “Personal” are created per-user during registration. 
    
    Labels 
    Labels work just like tags, however, the user can assign bootstrap colors to the label during label creation. 
    
    Filters 
    A filter is a collection of filter fields, which will all be applied in the app view. The user can specify a start date and end date (at the backend it is required that start date is smaller than end date), as well as a group of tags and labels that will become part of the filter.`,
    },
    {
      title: "Main view",
      content: `
    All task view 
    Shows all tasks ordered by date. Under the overdue section, the user is not allowed to create tasks. (However, the user can still create an overdue task using Quick Add Task). 
    Click add new task to create a task without any tags or labels. 
    Click on each task to see its details, like subtasks, comments and activity log for that specific task. 
    Click on the edit button of any task to edit its parameters. 
    Click on the round checkbox next to any task to toggle its state of completion. 
    Click on hide tasks to collapse the date groups that separate tasks by date.
    Editing of subtasks and comments is not supported. 
    
    Project View 
    Shows a list of tasks (not ordered by date) that are relevant to the project. 
    Any task created here will belong to the project. 
    Click on the share button on your own projects to share your projects with other users.
    
    Tag/Label View 
    Shows the tasks with the currently selected tag/label. Any task created here will have the currently selected tag/label. 
    
    Filter View 
    Shows the tasks after filtering by the currently selected filter.`,
    },
    {
      title: "Deletion",
      content: ` 
    The following items can be deleted: 
    Labels (Click on the cross next to the label on the sidebar to delete it) 
    Projects (In the project view there is a delete project button that will also delete the associated tasks) 
    Tasks (Click on the circled cross on the left of each task) 
    Subtasks and Comments (Click on the circled cross) 
    Note: Deletion of filters is not implemented.`,
    },
  ],
};

export default data;
