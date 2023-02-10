// require("babel-register");
// require("./server");
let express = require('express');
const db = require("./models/index");
let Config =require('./config/dev.json');
let app = express();
app.use(express.json());
let cors = require('cors');
const bp = require('body-parser')

let leads = require('./routes/leadRoutes');
let cnd = require('./routes/cndRoutes');
let faircent = require('./routes/faircentRoutes');
let userManagement = require('./routes/userManagementRoutes');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

/* import routes here */
app.use('/v0',leads);
app.use('/v0',cnd);
app.use('/v0',faircent);
app.use('/v0',userManagement);
/* connect with db now */
db.sequelize.sync({force:false})
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message); 
    });
app.listen(Config.port,()=>{
    console.log(`app is running on the port ${Config.port}`);
});

