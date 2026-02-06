require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

// Admin route imports
const adminToolsRoutes = require('./routes/admin_tools');
const adminCertRoutes = require('./routes/admin_certifications');
const adminContactRoutes = require('./routes/admin_contact');
const adminSocialRoutes = require('./routes/admin_social');
const adminRoutes = require('./routes/admin'); 
const adminResumeRoutes = require('./routes/admin_resume'); 
const sendContactEmail = require('./routes/sendContactEmail'); // <-- new route
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// Auth middleware
function authRequired(req, res, next) {
  if (req.session && req.session.loggedIn) next();
  else res.redirect('/login');
}

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// API routes (JSON for frontend)
app.use('/api', apiRoutes);
app.use('/api/send-contact', sendContactEmail); 

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// Auth routes (login/logout)
app.use('/', authRoutes);

// Admin routes (protected)
app.use('/admin/tools', authRequired, adminToolsRoutes);
app.use('/admin/certifications', authRequired, adminCertRoutes);
app.use('/admin/contact', authRequired, adminContactRoutes);
app.use('/admin/social', authRequired, adminSocialRoutes);
app.use('/admin/resume', authRequired, adminResumeRoutes);
app.use('/admin', authRequired, adminRoutes); 

// Default admin dashboard
app.get('/admin', authRequired, async (req, res) => {
  const Project = require('./models/Project');
  const Skill = require('./models/Skill');
  const Tool = require('./models/Tool');
  const Certification = require('./models/Certification');

  const projectCount = await Project.countDocuments();
  const skillCount = await Skill.countDocuments();
  const toolCount = await Tool.countDocuments();
  const certCount = await Certification.countDocuments();

  res.render('admin_home', { 
    projectCount, 
    skillCount, 
    toolCount, 
    certCount 
  });
});

// Root redirect
app.get('/', (req, res) => res.redirect('/login'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
