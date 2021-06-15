module.exports = (app) => {
    const emp = require('../controllers/controller');

    // Create a new employee
    app.post('/emp', emp.create);

    // Retrieve all employees
    app.get('/emp', emp.getAll);

    // Retrieve a single employee from empId
    app.get('/emp/:empId', emp.getById);

    // Update an employee with empId
    app.put('/emp/:empId', emp.updateById);
    
    // Delete an employee with empId
    app.delete('/emp/:empId', emp.deleteById);
}