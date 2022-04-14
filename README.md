# Outsourcd - a Python Django API and React app for freelance workers to find jobs - GA Project Four
**This app has been deployed on Heroku [here](https://outsourcd.herokuapp.com/)**

This is a full-stack application built with Django REST Framework and React, which I submitted as my final project for the General Assembly Software Engineering Immersive course.

The app enables users to register for an account as a freelancer, find and secure posted freelance jobs, and then manage progress in a dashboard. Users can complete specific tasks such as generating a PDF invoice for a particular job. Finally, users can add and modify their profile information in their managed profile area.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.41.16_ivx7xx.png "Homepage")

Brief
------
* Solo project
* Timeframe of 8 days
* Build a full-stack application by making backend and front-end
* Use a Python Django API using Django REST Framework to serve data from a PostgreSQL database
* Consume the API with a separate front-end built with React
* Be a complete product with multiple relationships and CRUD functionality
* Implement thoughtful user stories/wireframes
* Have a visually impressive design
* Be deployed and publicly accessible online
* Write DRY code and build RESTful APIs


Technologies used
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
### Registration
Upon registering, and logging in (reg form transitions to log in form), the user is required to add their profile information in a 3 step process. Moving between steps is only possible once all essential fields are complete, and step 2 has skippable fields.

https://user-images.githubusercontent.com/96052888/163424232-f1e0ed06-82f4-45c8-98c4-f6d27b94b1ad.mp4

#### Job finder
Upon clicking "Current jobs" in the responsive side drawer, the user has the facility to find jobs (can also be achieved via top nav). Users will see a list of available freelance jobs, which can be filtered based on their sector. By clicking a job, the user can access the job detail page.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874133/Habit_tracker_app/Screenshot_2022-03-21_at_14.46.57_vue90o.png "Find jobs")

#### Job detail page
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877280/Habit_tracker_app/Screenshot_2022-03-21_at_14.53.01_txi4vf.png "Job detail page")

Users can also access the detail page for the company that has listed the job.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877281/Habit_tracker_app/Screenshot_2022-03-21_at_14.53.23_dcyytr.png "Company page")

Back on the job detail page, users can sign up for a job by clicking app (this opens a modal). Clicking submit will add the job to the user's "current jobs" section.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647875209/Habit_tracker_app/Screenshot_2022-03-21_at_15.00.22_z4url7.png "Current jobs")

Users can then access features that will be demonstrated in the logged-in route below.

### Returning user

After logging in, the user returns to their profile "About me" section

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.44.37_vqz15q.png "About me")

Users can edit their "About me" text:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.10_virzzq.png "Edit about me")

They can also delete skills from their profile by clicking the "x" on the relavant skill chip:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.27_vtyjym.png "Delete skills")

By clicking "add skills" they see a modal, which allows the user to searcg for skills. If the skill exists, it's populated below as a chip. If it doesn't exist, the user has the option to add it. In either case, the user can then add the skill which will appear on the profile as a new chip.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.55_yp4iwl.png "Add skills")

The user can also add work experience.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.44.45_esjmmx.png "Add experience")

The "Current jobs" section shows any uncompleted jobs that the user has signed up for. Milestones of the job are automatically populated into a checklist.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.11_shqrok.png "Current jobs")

A calendar allows tracking of progress. It automatically shows today's date, and if the user hovers over a milestone, the calendar will skip to that day.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.19_y8evqi.png "Calendar feature")

Once all milestones are checked off the list, two buttons appear. One is a button to mark the job as complete. When this is clicked, the job moves from "Current jobs" to "Job history".

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.33_f5zpbh.png "Complete job")

The user can also generate a PDF invoice at this point. Data in the PDF is generated from the user and job information in the database.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.50_zghyht.png "Generate PDF")

Planning & process
------
In the first stage of my design process, I focussed on establishing how the application back-end would look. Therefore, I sketched out an Entity Relationship Diagram for the database architecture.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1649950730/Habit_tracker_app/Screenshot_2022-04-12_122408_bzuh1e.png "ERD")

After I was satisfied with my ERD, I then focussed my attention on the front-end and created some wireframes of my UIs on Miro to indicate the design and functionality.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1649950779/Habit_tracker_app/Screenshot_2022-04-12_123319_fxcdzi.png "Wireframe")

I then began the development process by building my models, views and serialisers using Django REST Framework and integrating Django with PostgreSQL to create a database. I dedicated around 2 full days to this phase, as while I built I also spent time testing the endpoints using the Insomnia REST client, visualising my database using TablePlus, and running SQL queries so I could better understand the relationships/joins I was making. This was crucial in determining that all relationships between models were correct and that I was getting the appropriate JSON responses.

Once I was happy with the CRUD features of my back-end, I was then able to move on to the front-end. My aim was to have as few pages as possible and make components as re-usable where possible, in order to minimise code and to keep the components as clear and simple as I could. I started by building the authorization components as the whole application is log-in gated. Once these were done I was able to then focus on building other components in accordance with my priority list on Trello. This was a substantial job due to the number of different components I needed to build, but I was able to work my way through progressively.
For data requests from the back-end I used Axios, and tested that I was getting the expected data using console logs and the React dev tools. I used react-router-dom for page navigation.

#### Styling
As I felt comfortable with Boostrap and Chakra from previous projects, I wanted to push myself to learn another UI framework for this project. Given its popularity and applicability to this particular application, I chose Material UI. While it was a challenge to learn another new framework, and I had to do a lot of reading of the documentation and stack overflow, this ultimately made my life a lot easier in the long run as it provided me with a number of pre-built components, which I was able to customise for my own purposes.

Featured code
-----
### User model and serialiser
The most crucial part of setting up the back-end was establishing the user model and the necessary relationships. Below you can see what the user model looked like, and the corresponding populated serialiser I used for the view on my get requests

```python
class User(AbstractUser):
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.TextField(max_length=500, blank=True)
    is_freelancer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    business_name = models.CharField(max_length=100, blank=True)
    address = models.TextField(max_length=500, blank=True)
    city = models.TextField(max_length=100, blank=True)
    country = models.TextField(max_length=100, blank=True)
    postcode = models.TextField(max_length=7, blank=True)
    business_website = models.CharField(max_length=100, blank=True)
    personal_website = models.CharField(max_length=100, blank=True)
    linkedin_url = models.CharField(max_length=100, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    sector = models.ManyToManyField(
        "sectors.Sector",
        related_name="users",
        blank=True,
    )
    about_me = models.TextField(max_length=800, blank=True)
    skills = models.ManyToManyField(
        "skills.Skill",
        related_name="users",
        blank=True
    )
    applied_jobs = models.ManyToManyField(
        "jobs.Job",
        related_name="job_applicants",
        blank=True,
    )
  ```

```python
class PopulatedUserSerializer(UserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = PopulatedJobSerializer(many=True)
    skills = SkillSerializer(many=True)
    experience = PopulatedExperienceSerializer(many=True)
    received_reviews = PopulatedReviewSerializer(many=True)
    given_reviews = PopulatedReviewSerializer(many=True)
```

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
Known bugs or errors
------
When adding a new skill to a user profile that doesn’t exist in the database (after searching), the post request is not functioning predictably.

Key learnings
------
Going solo for the final project was a challenge compared to the previous project, where we could progress more quickly and bounce ideas off each other, solving issues together. However, it was hugely positive in giving me the confidence that I can build a full-stack app on my own, as all the challenges I faced and was able to overcome in this project helped boost my confidence as a developer.

I felt my planning was good and I made a concerted effort to make detailed database relationship diagrams and UI wireframes, and to manage my workflows via Trello. Nonetheless, a big learning experience was appreciating the trade-off between functionality and robust, bug-free code. The latter was a priority for me in the project, so I was perhaps over-ambitious as my initial vision was to build a fully functional marketplace, where a user could also register as a client and post jobs and hire freelancers. However, I kept my MVP as a job finder for freelancers and I am happy that I managed to build the fully functioning MVP in the timeframe.

#### Git
Thanks to our collaborative Git approach, I saw a significant improvement in my understanding of Git and my comfortability in using and merging different branches and versions of code, and dealing with any merge conflicts. My key learnings were understanding how branches work, and the importance of understanding where you are in the version control tree at any given time.

#### Django & PostgreSQL
Having only built a back-end previously with Node/Express, learning Python and a whole new back-end framework was a challenge in the time I had available. My main areas of difficulty were around populating my serialisers optimally in order to serve appropriate data to the front-end, and raising appropriate exceptions and handling errors on the backend. However, through plenty of further reading and testing with Insomnia, I was ultimately able to get the backend functioning stably and predictably, to enable the CRUD I need for this app, which was pleasing.

Having previously worked with NoSQL databases only, I wanted to gain a better understanding on whether I was capturing the data and relationships correctly. Therefore, I spent some time running SQL queries on my data in TablePlus. This was extremely useful in consolidating concepts like data joins and visualising how my Django views were actually working from the database side, because my database involved a number of different one-to-many and many-to-many relationships that were needed. Getting these relationships set up correctly was probably my biggest challenge on the backend, but I learned a lot about Postgres and Django through the process.

#### React
Though I was beginning to feel more comfortable with React at the beginning of this project, I still experienced plenty of improvement. There were some new things for me, a lot of which came from using Material UI components for the first time, but also I felt like some familiar concepts like event handlers, controlled inputs, and hooks were cemented through this project. One thing that was new was the scale of the React work - this app was quite simple in its overall architecture (a few pages) but there is a lot of conditional rendering that uses data from the backend, and a lot of UI changes/updates that occur as a result of user interaction. As a result, I had to think much harder about state management and ensure that state was being passed correctly to components, in order to generate the appropriate UI. One aspect that was particularly difficult was getting the calendar to skip to the correct date based on the user's hover of a checklist item. However, I was very pleased with how this turned out.

#### Challenges & wins
My main struggles were also my two biggest victories. Firstly, the quantity and breadth of work required on the front-end was substantial and I definitely underestimated the work required to build lots of robust components, even if the functionality did not seem overly complicated. However, I am particularly proud of the quantity of bug-free code I managed to write in the timeframe, and consequently the level of functionality I was able to build into this app. There was no part of MVP left undeveloped or poorly styled at the end. There were definitely times when I felt overwhelmed by what I still needed to do, but a combination of clear and detailed planning, solid workflow prioritisation/management, and extra self-directed learning enabled me to get everything done. As part of this, I would say an additional win is that I learned a huge amount about a wide range of tools and I feel I am a much better developer as a result of this project. 

The second main area was working with Django and a NoSQL database. I spent quite some time going back to my models and serialisers because I wasn’t quite able to get or send the data I wanted. I initially found errors very difficult to understand and debug.  However, on the flip side, I would say that learning Django and getting this back-end to work was my greatest win. There were some moments where I felt like completely going back to scratch, but I pushed on by staying calm, reading Django documentation, and running SQL queries on my database, and ultimately I was able to understand how things were actually working and how to solve any issues.

Future features
-------
As mentioned above, my complete app vision includes the functionality for users to register as clients (rather than freelancers), and then search and secure freelancers, and review and rate them. The way this works is that the user model has a boolean field for 'client' as well as 'freelancer', which I don't currently use for anything on the front-end. However, this will ultimately be used to conditionally render a client environment instead of the freelancer environment (which is all you see currently). Users will be searchable and filterable, and will be populated using a GET request with a view that serves the relevant data of all users. Rather than a freelance user simply being able to add themselves to a job, they will need to apply and the client can accept or decline them after reviewing their profile. Once this part of the app is built, I would like to then focus on a chat function so that clients and freelancers can communicate.
