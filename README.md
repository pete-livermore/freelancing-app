# Outsourcd - a Python Django API and React app for freelance workers to find jobs - GA Project Four
**This app has been deployed on Heroku [here](https://outsourcd.herokuapp.com/)**
This is a full-stack application built with Django REST Framework and React, which I submitted as my final project for the General Assembly Software Engineering Immersive course.

The app enables users to register for an account as a freelancer, find and secure posted freelance jobs, and then manage progress in a dashboard. Users can complete specific tasks such as generating a PDF invoice for a particular job. Finally, users can add and modify their profile information in their managed profile area.

Brief & Timeframe:
------
* Build a full-stack application by making backend and front-end
* Use a Python Django API using Django REST Framework to serve data from a PostgreSQL database
* Consume the API with a separate front-end built with React
* Be a complete product with multiple relationships and CRUD functionality
* Implement thoughtful user stories/wireframes
* Have a visually impressive design
* Be deployed and publicly accessible online
* Write DRY code and build RESTful APIs
Timeframe: 8 days

Languages/tools Used:
------
* Django
* Django REST Framework
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

App and user journey walkthrough:
------

### New user
#### Homepage
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.41.16_ivx7xx.png "Homepage")

#### Registration
Upon registering, and logging in (reg form transitions to log in form), the user is required to add their profile information in a 3 step process:
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647883007/Habit_tracker_app/Screenshot_2022-03-21_at_17.05.34_efrqhe.png "Reg/login form")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647882582/Habit_tracker_app/Screenshot_2022-03-21_at_17.07.50_ddqphh.png "Step 1")
Moving between steps is only possible once all essential fields are complete:
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647882582/Habit_tracker_app/Screenshot_2022-03-21_at_17.08.04_ubugx2.png "Step 1 complete")
Step 2 has skippable fields:
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647875209/Habit_tracker_app/Screenshot_2022-03-21_at_15.03.45_yxwj2o.png "Step 2 complete")
Step 3 allows form submission:
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647875210/Habit_tracker_app/Screenshot_2022-03-21_at_15.05.25_pyovyf.png "Step 3 complete")
#### Profile
User is then navigated to their profile
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647875210/Habit_tracker_app/Screenshot_2022-03-21_at_15.05.49_kjdxce.png "New profile")
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
After logging in, the user returns to their profile "About me section"
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.44.37_vqz15q.png "About me")

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.10_virzzq.png "Edit about me")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.27_vtyjym.png "Delete skills")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874131/Habit_tracker_app/Screenshot_2022-03-21_at_14.43.55_yp4iwl.png "Add skills")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.44.45_esjmmx.png "Add experience")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.11_shqrok.png "Current jobs")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.19_y8evqi.png "Calendar feature")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.33_f5zpbh.png "Complete job")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.45.50_zghyht.png "Generate PDF")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647877280/Habit_tracker_app/Screenshot_2022-03-21_at_14.46.07_ezjn7j.png "No job history")
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1647874132/Habit_tracker_app/Screenshot_2022-03-21_at_14.46.21_zsyhcf.png "Complete job history")




