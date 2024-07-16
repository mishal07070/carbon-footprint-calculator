const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require('dotenv').config();

const db_url = process.env.MONGODB_URI;
const PORTNO = process.env.PORT || 3000 ;

mongoose.connect(db_url)


const User = require("./models/user");
const Stats = require("./models/stats");
const Talk = require("./models/talks");
const Project = require("./models/projects");
const Paper = require("./models/papers");
const Activity = require("./models/activity");
Stats.createIndexes();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/api/getStats", async(req, res)=>{
    try{
        await Stats.find()
        stats => res.json(stats)
    }
    catch(err){
        err => res.json(err);
    }
})

app.post('/api/delete', async(req, res) => {
  try {
    const deleteId = req.body.id;
    const selectedTab = req.body.tab;
    let deletedTalk;
    if(selectedTab === 'Talks')
      deletedTalk = await Talk.findByIdAndDelete(deleteId);
    else if(selectedTab === 'Projects')
      deletedTalk = await Project.findByIdAndDelete(deleteId);
    else if(selectedTab === 'Papers')
      deletedTalk = await Paper.findByIdAndDelete(deleteId);
    else if(selectedTab === 'Activities')
      deletedTalk = await Activity.findByIdAndDelete(deleteId);

    if (!deletedTalk) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } 
  catch(err){
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/getActivities', async (req, res) => {
    try {
      const activities = await Activity.find(); // Fetch all talks from the MongoDB collection
      res.status(200).json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/saveActivity', async (req, res) => {
    try {
      const newActivity = new Activity(req.body);
      await newActivity.save();
      res.status(200).json({ message: 'Activity saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/api/getPapers', async (req, res) => {
    try {
      const papers = await Paper.find(); // Fetch all talks from the MongoDB collection
      res.status(200).json(papers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/savePaper', async (req, res) => {
    try {
      const newPaper = new Paper(req.body);
      await newPaper.save();
      res.status(200).json({ message: 'Paper saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/api/getTalks', async (req, res) => {
    try {
      const talks = await Talk.find(); // Fetch all talks from the MongoDB collection
      res.status(200).json(talks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/saveTalk', async (req, res) => {
    try {
      const newTalk = new Talk(req.body);
      await newTalk.save();
      res.status(200).json({ message: 'Talk saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/api/getProjects', async (req, res) => {
    try {
      const projects = await Project.find(); // Fetch all talks from the MongoDB collection
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/saveProject', async (req, res) => {
    try {
      const newProject = new Project(req.body);
      await newProject.save();
      res.status(200).json({ message: 'Project saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/api/register", async (req, resp) => {
    try {
        await Stats.deleteMany({})
        await Stats.create(
            {name:req.body.name,
            linkedinPosts:req.body.newLinkedinPosts, 
            twitterArticles:req.body.newTwitterArticles,
            newsPaperArticles:req.body.newNewsPaperArticles,
            projects:req.body.newProjects,
            papers:req.body.newPapers,
            netZeroIITKStatus:req.body.newNetZeroIITKStatus,
            netZeroArmyCanttStatus: req.body.newNetZeroArmyCanttStatus,
            outreachActivities:req.body.newOutreachActivities,
            funding1: req.body.newFunding1,
            funding2: req.body.newFunding2,
            funding3: req.body.newFunding3,
            talks: req.body.newTalks,
            linkedinFollowers: req.body.newLinkedinFollowers,
            twitterFollowers: req.body.newTwitterFollowers
            })
 
    } catch (e) {
        resp.send(e);
    }
});

app.post("/signup", async (req, res) => {
    try{
        const { email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
        encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedUserPassword,
          });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        user.token = token;
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
      }
})
app.post("/signin", async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );
        user.token = token;
        return res.status(200).json(user);
            }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORTNO, () => {
    console.log("Listening on port: " + PORTNO);
});
