# Outsourcd - a Python Django API and React app for freelance workers to find jobs - GA Project Four
**This app has been deployed on Heroku [here](https://outsourcd.herokuapp.com/)**

This is a full-stack application built with Django REST Framework and React, which I submitted as my final project for the General Assembly Software Engineering Immersive course.

The app enables users to register for an account as a freelancer, find and secure posted freelance jobs, and then manage progress in a dashboard. Users can complete specific tasks such as generating a PDF invoice for a particular job. Finally, users can add and modify their profile information in their managed profile area.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.41.16_ivx7xx.png "Homepage")

Brief
------
* Timeframe: 8 days
* Build a full-stack application by making backend and front-end
* Use a Python Django API using Django REST Framework to serve data from a PostgreSQL database
* Consume the API with a separate front-end built with React
* Be a complete product with multiple relationships and CRUD functionality
* Implement thoughtful user stories/wireframes
* Have a visually impressive design
* Be deployed and publicly accessible online
* Write DRY code and build RESTful APIs


Languages/tools used
------
* Django
* Django REST Framework
* Python
* PostgreSQL
* PyJWT
* JavaScript (ES6)
* React.js
* HTML, CSS, Sass
* Material UI
* Axios
* Git + GitHub
* react-router-dom
* react-pdf

App and user journey walkthrough
------
### New user
Upon registering, and logging in (reg form transitions to log in form), the user is required to add their profile information in a 3 step process. Moving between steps is only possible once all essential fields are complete, and step 2 has skippable fields.

https://user-images.githubusercontent.com/96052888/162734094-00170e9a-ec08-4db2-96ae-68fdacac6b32.mp4

#### Profile
Upon clicking "Current jobs" in the responsive side drawer, they have the facility to find jobs (can also be achieved via top nav)

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877037/Habit_tracker_app/Screenshot_2022-03-21_at_15.36.53_n8yxte.png "Current jobs new")

#### Job finder
Users will see a list of available freelance jobs, which can be filtered based on their sector. By clicking a job, the user can access the job detail page

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874133/Habit_tracker_app/Screenshot_2022-03-21_at_14.46.57_vue90o.png "Find jobs")

#### Job detail page
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877280/Habit_tracker_app/Screenshot_2022-03-21_at_14.53.01_txi4vf.png "Job detail page")

Users can also access the detail page for the company that has listed the job

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877281/Habit_tracker_app/Screenshot_2022-03-21_at_14.53.23_dcyytr.png "Company page")

Back on the job detail page, users can sign up for a job by clicking app (this opens a modal)

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877280/Habit_tracker_app/Screenshot_2022-03-21_at_14.53.08_oxwke5.png "Apply modal")

Clicking submit will add the job to the user's "current jobs" section:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647875209/Habit_tracker_app/Screenshot_2022-03-21_at_15.00.22_z4url7.png "Current jobs")

User can then access features that will be demonstrated in the logged-in route below:

### Returning user

After logging in, the user returns to their profile "About me" section

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.44.37_vqz15q.png "About me")

Users can edit their "About me" text:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.10_virzzq.png "Edit about me")

They can also delete skills from their profile by clicking the "x" on the relavant skill chip:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.27_vtyjym.png "Delete skills")

By clicking "add skills" they see a modal, which allows the user to searcg for skills. If the skill exists, it's populated below as a chip. If it doesn't exist, the user has the option to add it. In either case, the user can then add the skill which will appear on the profile as a new chip.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.55_yp4iwl.png "Add skills")

The user can add work experience:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.44.45_esjmmx.png "Add experience")

The "Current jobs" section shows any uncompleted jobs that the user has signed up for. Milestons of the job are automatically populated into a checklist:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.11_shqrok.png "Current jobs")

A calendar allows tracking of progress. It automatically shows today's date, and if the user hovers over a milestone, the calendar will skip to that day:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.19_y8evqi.png "Calendar feature")

Once all milestones are checked off the list, two buttons appear. One is a button to mark the job as complete. When this is clicked, the job moves from "Current jobs" to "Job history".

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.33_f5zpbh.png "Complete job")

The user can also generate a PDF invoice at this point. Data in the PDF is generated from the user and job information in the database.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.50_zghyht.png "Generate PDF")

When a user hasn't yet completed any jobs, "Job history" is empty:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877280/Habit_tracker_app/Screenshot_2022-03-21_at_14.46.07_ezjn7j.png "No job history")

But once a job is complete, it is populated as decsribed above:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.46.21_zsyhcf.png "Complete job history")

Code examples
------

### Building calendar
```javascript
  useEffect(() => {
    let numOfDaysInMonth
    if (month === 'February') {
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 )) {
        numOfDaysInMonth = 29
      } else numOfDaysInMonth = 28
    } else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
      numOfDaysInMonth = 30
    }
    else numOfDaysInMonth = 31
    setDaysInMonth(numOfDaysInMonth)
  }, [month, year])
  ```
```javascript
  const CalendarBuild = () => {
    const arr = []
    for (let i = 0; i < 42; i++) {
      arr.push(<Box sx={{ pl: '8px', mr: '8px', height: '35px' }} key={i} id={i}></Box>)
    }
    let inc = 1
    for (let i = new Date(`${month} 1, ${year}`).getDay(); i < new Date(`${month} 1, ${year}`).getDay() + daysInMonth; i++) {
      let idDate = new Date(`${month} ${inc}, ${year}`)
      if (idDate.toLocaleDateString() === today.toLocaleDateString())
        arr[i] = <Box id={idDate} key={idDate} sx={{ backgroundColor: '#eceff1', pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      else if (idDate.toLocaleDateString() === new Date(hoveredDate).toLocaleDateString()) arr[i] = <Box id={idDate} key={idDate} sx={{ backgroundColor: '#d81b60', pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      else arr[i] = <Box id={idDate} key={idDate} sx={{ pl: '8px', mr: '8px', height: '35px' }}>{inc}</Box>
      inc++
      idDate.setDate(idDate.getDate() + 1)
    }
    return arr
  }
  CalendarBuild()
  ```
### Updating profile
#### Searching for a skill to add to profile in the modal

If a skill is found, the search results are mapped to generate chip components:
```javascript
      <Box mt={4} p={1} width='100%' spacing={1} display='flex' flexWrap='wrap' justifyContent='flex-start'>
        {searchResults.length ? searchResults.map((result, i) => (
          <Chip
            onClick={() => handleChipClick(result.name)}
            key={i}
            id={result.name}
            label={result.name}
            sx={activeIndices.includes(result.name) ? coloured : uncoloured}
            icon={<AddIcon />}
          />
        ))
          :
          ''
        }
      </Box>
```

If a skill isn't found, a button appears that has an event handler that runs the function to add the skill to the user's profile:

```javascript
 {!skill.found &&
    <Box>
       <Alert severity="warning">
          {skill.message} <Button onClick={handleAddSkill}>Add?</Button>
       </Alert>
    </Box>
  }
```

```javascript
const handleAddSkill = () => {
    const addSkill = async () => {
      const token = localStorage.getItem('outsourcd-token')
      const dataToSend = { 'name': skill.name }
      console.log(dataToSend)
      try {
        await axios.post('/api/skills/', dataToSend,
          {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          })
        setSearchResults([{ ...skill }])
        setSkill({ name: '', found: true, message: '' })
      } catch (error) {
        setError({
          error: true,
          message: error.response.data.name[0]
        })
      }
    }
    addSkill()
  }
```



### Altering current job status

Updating the milestones checklist:
```javascript
    const updatedCompletedStatus = async () => {
      try {
        await axios.put(`/api/milestones/${milestone.id}/`, { ...milestone, completed: updatedCompletion },
          {
            'headers': {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        setChecklistUpdated(true)
       } catch (err) {
        setError({ error: true, message: err.message })
       }
    }  
```

How I worked
------
### Process
1. Researched and brainstormed features
2. Established MVP
3. Wireframed the app UIs using Miro, including detailing the functionality of the app
4. Generated database models and relationship diagrams (using [quickDBD](https://www.quickdatabasediagrams.com/))
5. Set up feature workflows on Trello, with lists for features that were "in progress", "stuck", and "to-do", and a separate list for bugs. Priority was indicated with a colour label.

What I got from the project
------
### General points
Going solo for the final project was a challenge compared to the previous project, where we could progress more quickly and bounce ideas off each other, solving issues together. However, it was hugely positive in giving me the confidence that I can build a full-stack app on my own, as all the challenges I faced and was able to overcome in this project helped boost my confidence as a developer.

I felt my planning was good and I made a concerted effort to make detailed database relationship diagrams and UI wireframes, and to manage my workflows via Trello. Nonetheless, a big learning experience was appreciating the trade-off between functionality and robust, bug-free code. The latter was a priority for me in the project, so I was perhaps over-ambitious as my initial vision was to build a fully functional marketplace, where a user could also register as a client and post jobs and hire freelancers. However, I kept my MVP as a job finder for freelancers and I am happy that I managed to build the fully functioning MVP in the timeframe.

### Technical points
*Git* - Thanks to our collaborative Git approach, I saw a significant improvement in my understanding of Git and my comfortability in using and merging different branches and versions of code, and dealing with any merge conflicts. My key learnings were understanding how branches work, and the importance of understanding where you are in the version control tree at any given time.

*Django & PostgreSQL* - Having only built a backend previously with Node/Express, learning Python and a whole new back-end framework was a challenge in the time I had available. My main areas of difficulty were around populating my serialisers optimally in order to serve appropriate data to the front-end, and raising appropriate exceptions and handling errors on the backend. However, through plenty of further reading and testing with Insomnia, I was ultimately able to get the backend functioning stably and predictably, to enable the CRUD I need for this app, which was pleasing.

Having previously worked with NoSQL databases only, I wanted to gain a better understanding on whether I was capturing the data and relationships correctly. Therefore, I spent some time running SQL queries on my data in TablePlus. This was extremely useful in consolidating concepts like data joins and visualising how my Django views were actually working from the database side, because my database involved a number of different one-to-many and many-to-many relationships that were needed. Getting these relationships set up correctly was probably my biggest challenge on the backend, but I learned a lot about Postgres and Django through the process.

*React* - Though I was beginning to feel more comfortable with React at the beginning of this project, I still experienced plenty of improvement. There were some new things for me, a lot of which came from using Material UI components for the first time, but also I felt like some familiar concepts like event handlers, controlled inputs, and hooks were cemented through this project. One thing that was new was the scale of the React work - this app was quite simple in its overall architecture (a few pages) but there is a lot of conditional rendering that uses data from the backend, and a lot of UI changes/updates that occur as a result of user interaction. As a result, I had to think much harder about state management and ensure that state was being passed correctly to components, in order to generate the appropriate UI. One aspect that was particularly difficult was getting the calendar to skip to the correct date based on the user's hover of a checklist item. However, I was very pleased with how this turned out.


Future features
------
As mentioned above, my complete app vision includes the functionality for users to register as clients (rather than freelancers), and then search and secure freelancers, and review and rate them. The way this works is that the user model has a boolean field for 'client' as well as 'freelancer', which I don't currently use for anything on the front end. However, this will ultimately be used to conditionally render a client environment instead of the freelancer environment (which is all you see currently). Users will be searchable and filterable, and will be populated using a GET request with a view that serves the relevant data of all users. Rather than a freelance user simply being able to add themselves to a job, they will need to apply and the client can accept or decline them after reviewing their profile. Once this part of the app is built, I would like to then focus on a chat function so that clients and freelancers can communicate.



