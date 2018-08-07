import employeeController from '../controller/employeeController';

module.exports = function(app)
{
    app.route('/api/employee/create').post(employeeController.createEmployee);

    app.route('/api/employee/list').get(employeeController.listEmployee);

    app.route('/api/employee/search').post(employeeController.searchEmployee);
    
    app.route('/api/employee/delete/:id').get(employeeController.deleteEmployee);

    app.route('/api/employee/update').post(employeeController.updateEmployee);
    
}
