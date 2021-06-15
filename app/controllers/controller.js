const Emp = require('../models/model');

// Create and Save a new employee payroll
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name cannot be empty"
        });
    }

    // Create an employee
    const employee = new Emp({
        name: req.body.name, 
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date
    });

    // Save employee in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the employee payroll."
        });
    });
};

// Retrieve and return all employees from the database.
exports.getAll = (req, res) => {
    Emp.find()
    .then(emp => {
        res.send(emp);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving details."
        });
    });
};

// Find a single employee with a empId
exports.getById = (req, res) => {
    Emp.findById(req.params.empId)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "details not found with id " + req.params.empId
            });            
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "details not found with id " + req.params.empId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving details with id " + req.params.empId
        });
    });
};

// Update an employee identified by the empId in the request
exports.updateById = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "email cannot be empty"
        });
    }

    // Find employee and update it with the request body
    Emp.findByIdAndUpdate(req.params.empId, {
        name: req.body.name || "Untitled name",
        gender: req.body.gender,
        salary: req.body.salary,
        department: req.body.department,   
        email: req.body.email,
        phone: req.body.phone,
        // date: req.body.date,
    }, {new: true})
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "employee found with id " + req.params.empId
            });
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.empId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.empId
        });
    });
};

// Delete an employee with the specified empId in the request
exports.deleteById = (req, res) => {
    Emp.findByIdAndRemove(req.params.empId)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.empId
            });
        }
        res.send({message: "Details deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.empId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.empId
        });
    });
};