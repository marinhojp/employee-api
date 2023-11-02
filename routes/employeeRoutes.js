const router = require('express').Router()

const { route } = require('express/lib/application')
const Employee = require('../models/Employee')

//Criação de um Funcionário

router.post('/', async (req, res) =>{
    
    const {name, age, role, salary, active} = req.body

    const employee = {
        name,
        age,
        role,
        salary,
        active
    }

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
        return
    }

    try {

        await Employee.create(employee)

        res.status(201).json({message: 'Funcionário cadastrado com sucesso!'})
        
    } catch (error) {
        res.status(500).json({error:error})
    }

})

//Consulta de Funcionários
router.get('/', async (req,res) =>{
    
    try {

        const employees = await Employee.find()

        res.status(200).json(employees)
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})


//Consulta de Funcionários por ID
router.get('/:id', async (req, res) =>{
    
    const id = req.params.id

    try {

        const employee = await Employee.findOne({_id: id})

        if(!employee){
            res.status(422).json({message: 'O Funcionário não foi encontrado ou não existe!'})
            return
        }

        res.status(200).json(employee)
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//Atualização de um Funcionário
router.patch('/:id', async (req, res)=>{

    const id = req.params.id

    const {name, age, role, salary, active} = req.body

    const employee = {
        name,
        age,
        role,
        salary,
        active
    }
    
    try {
        
        const updatedEmployee = await Employee.updateOne({_id: id}, employee)

        res.status(200).json(employee)

    } catch (error) {
        res.status(500).json({error:error})        
    }
})

//Deleção de um Cadastro de Funcionário
router.delete('/:id', async (req, res)=>{

    const id = req.params.id

    const employee = await Employee.findOne({_id: id})

    if(!employee){
        res.status(422).json({message: 'O Funcionário não foi encontrado ou não existe!'})
        return
    }

    try {

        await Employee.deleteOne({_id: id})

        res.status(200).json({message: 'Cadastro deletado com sucesso!'})
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})


module.exports = router