import express  from "express";
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT=3001;

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r= await axios.put("https://api.chatengine.io/users/",{
       username:username, secret:username ,first_name:username },
       {headers:{
            "private-key":"9b7b59fb-4b29-433e-8225-971ef7be1220",
       }}
       )
       return res.status(r.status).json(r.data)

  } catch (e) {
    return res.status(e.response.status).json(e.response.data)
  }
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(PORT,()=>{
    console.log(`server working on port ${PORT}`)
});