const mongoose = require('mongoose');
const Topic = require('./models/Topic');
require('dotenv').config();

const topicsToSeed = [
    // Web App Development
    { title: 'React', description: 'React JS library' },
    { title: 'Web API', description: 'Web APIs and integration' },
    { title: 'Frontend', description: 'General frontend development' },

    // Android App Development
    { title: 'Android', description: 'Android native development' },
    { title: 'Offline Sync', description: 'Offline data synchronization' },
    { title: 'Mobile App', description: 'General mobile app questions' },

    // Data & Analytics
    { title: 'Data Visualizer', description: 'DHIS2 Data Visualizer' },
    { title: 'SQL', description: 'Database queries' },
    { title: 'Analytics', description: 'Analytics engine' },

    // Health Information Systems
    { title: 'DHIS2', description: 'DHIS2 platform' },
    { title: 'Tracker', description: 'Tracker capture' },
    { title: 'Aggregate', description: 'Aggregate data' }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hisp_qa', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Connected to MongoDB');

        // Clear existing topics first to avoid duplicates/conflicts
        await Topic.deleteMany({});
        console.log('Cleared existing topics');

        const mainTopics = [
            { title: 'Web App Development', icon: 'Layout', subs: ['React', 'Web API', 'Frontend', 'JavaScript', 'CSS'] },
            { title: 'Android App Development', icon: 'Smartphone', subs: ['Android', 'Offline Sync', 'Mobile App', 'Kotlin'] },
            { title: 'Data & Analytics', icon: 'Database', subs: ['Data Visualizer', 'SQL', 'Analytics', 'Dashboard'] },
            { title: 'Health Information Systems', icon: 'Activity', subs: ['DHIS2', 'Tracker', 'Aggregate', 'Program'] },
            { title: 'Others', icon: 'MoreHorizontal', subs: ['General', 'Community'] }
        ];

        for (const main of mainTopics) {
            try {
                const mainTopic = await Topic.create({
                    title: main.title,
                    description: `${main.title} Category`,
                    icon: main.icon
                });
                console.log(`Created Main Topic: ${main.title}`);

                for (const subTitle of main.subs) {
                    await Topic.create({
                        title: subTitle,
                        description: `${subTitle} related questions`,
                        parent: mainTopic._id
                    });
                    console.log(`  - Created Subtopic: ${subTitle}`);
                }
            } catch (e) {
                console.log(`Error creating ${main.title}: ${e.message}`);
            }
        }

        console.log('Seeding complete');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
