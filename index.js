import express from "express"
import sum from "./sum.js"
const PORT = 3000
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    const a = sum(1,2)
    res.json({
        message:'hello word!',
        Jenkins:'hello im Jenkins! :D',
        value: (a+a+a)
    })
})
app.listen(PORT,()=>{
    console.log(`Server running!`)
})