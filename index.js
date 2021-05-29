import express from "express"
const PORT = 3000
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
res.json({message:'hello word!'})
})
app.listen(PORT,()=>{
    console.log(`Server running!`)
})